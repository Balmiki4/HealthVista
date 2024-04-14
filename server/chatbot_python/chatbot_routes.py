from flask import Blueprint, request, jsonify, session
import openai
from openai import OpenAI, OpenAIError
import os
from functools import wraps
from flask_cors import cross_origin
from jose import jwt
from bson import ObjectId

from pymongo import MongoClient

chatbot_bp = Blueprint('chat_routes', __name__)

openai.api_key = os.environ.get("OPENAI_API_KEY")

@chatbot_bp.route('/chatbot', methods=['POST'])
def chatbot():
    #print("Received request in the chatbot route") logging

    prompt = request.json.get('prompt')
    role = request.json.get('role', "You are a helpful assistant.")

    #print(f"Received prompt: {prompt}")  logging
    #print(f"Received role: {role}")      logging


    #error handling if API key is not found or is incorrect
    if not openai.api_key:
        return jsonify({'error': 'OpenAI API Key not found'}), 500


    try:
        client = OpenAI()
        moderation_response = client.moderations.create(input=prompt)

        # Check the moderation response
        if moderation_response.results[0].flagged:
            response_message = {
                'response': """I am concerned to hear that you are struggling with self-harm. 
                      It's important to remember that there are people who care about you and want to help. 
                      If you are in immediate danger or need someone to talk to, please reach out to a trusted friend, family member, 
                      or a helpline like the National Suicide Prevention Lifeline at 1-800-273-TALK (1-800-273-8255). 
                      You are not alone, and there is hope."""
            }
            return jsonify(response_message), 200

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": role},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
        )

        response_text = response.choices[0].message.content

        response = jsonify({'response': response_text})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

        return response
    except OpenAIError as e:
        return jsonify({'error': str(e)}), 500
    

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_id = request.headers.get('User-Id')
        access_token = request.headers.get('Authorization')

        if not user_id or not access_token:
            return jsonify({'error': 'Missing user_id or access_token'}), 401

        try:
            decoded_token = jwt.decode(access_token.replace('Bearer ', ''), "SECRET_KEY", algorithms=["HS256"])
            if decoded_token['user_id'] != user_id:
                return jsonify({'error': 'Invalid access token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Access token expired'}), 401
        except jwt.JWTError:
            return jsonify({'error': 'Invalid access token'}), 401

        return f(*args, **kwargs)
    return decorated


@chatbot_bp.route('/save_chat', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def save_chat():
    messages = request.json.get('messages')
    user_id = ObjectId(request.headers.get('User-Id'))
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400
    # Create a new user with an associated user ID if they don't exist
    user_exists = users_collection.find_one({'_id': user_id})
    if not user_exists :
        result = users_collection.insert_one({'_id': user_id, 'messages': []})
    # Update the existing user's messages
    result = users_collection.update_one(
        {'_id': user_id},
        {'$set': {'messages': messages}}
    )
    return jsonify({'message': 'Chat messages saved successfully'}), 200
    

@chatbot_bp.route('/get_chat_history', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def get_chat_history():
    user_id = ObjectId(request.headers.get('User-Id'))
    # Retrieve the chat history from MongoDB for the given user_id
    chat_history = users_collection.find_one({'_id': user_id})

    if chat_history:
        messages = chat_history.get('messages', [])
        return jsonify({'messages': messages}), 200
    else:
        return jsonify({'messages': []}), 200
