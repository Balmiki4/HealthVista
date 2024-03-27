from flask import Blueprint, request, jsonify
import openai
from openai import OpenAI
import os

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

    client = OpenAI()
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