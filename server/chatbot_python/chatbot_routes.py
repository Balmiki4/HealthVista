from flask import Blueprint, request, jsonify
import openai
from openai import OpenAI, OpenAIError
import os

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

@chatbot_bp.route('/save_chat', methods=['OPTIONS','POST'])
def save_chat():
    if request.method == 'OPTIONS':
    # Handle preflight request
        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
        }
        return ('', 204, response_headers)
    
    elif request.method == 'POST':
        customer_id = request.json.get('customer_id')
        messages = request.json.get('messages')

        if not customer_id:
            return jsonify({'error': 'Missing customer_id'}), 400

        # Create a new user with an associated customer ID if they don't exist
        user_exists = users_collection.find_one({'customer_id': customer_id})
        if not user_exists :
            result = users_collection.insert_one({'customer_id': customer_id, 'messages': []})

        # Update the existing user's messages
        result = users_collection.update_one(
            {'customer_id': customer_id},
            {'$set': {'messages': messages}}
        )
        return jsonify({'message': 'Chat messages saved successfully'}), 200
    

@chatbot_bp.route('/get_chat_history/<customer_id>', methods=['GET'])
def get_chat_history(customer_id):
    print(f"customer_id: {customer_id}")
    # Retrieve the chat history from MongoDB for the given user_id
    chat_history = users_collection.find_one({'customer_id': customer_id})

    if chat_history:
        messages = chat_history.get('messages', [])
        return jsonify({'messages': messages}), 200
    else:
        return jsonify({'messages': []}), 200
