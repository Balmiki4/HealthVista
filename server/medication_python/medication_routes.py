import os
import bcrypt
from flask import Blueprint
from flask import request, jsonify
from signup_python.signup_models import User
from pymongo import MongoClient

medication_bp = Blueprint('medication',__name__)

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

@medication_bp.route('/medication', methods=['OPTIONS', 'POST'])
def create_medication():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
        }
        return ('', 204, response_headers)
    elif request.method == 'POST':
        # Get form data from request
        customer_id = request.json.get('customerId')
        name = request.json.get('name')
        dosage = request.json.get('dosage')
        frequency = request.json.get('frequency')
        instructions = request.json.get('instructions')
        

        # Find the user with the given customer_id
        user = users_collection.find_one({'customer_id': customer_id})
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        # Create new profile data and store it in the user's record
        medication_data = {
            'name': name,
            'dosage': dosage,
            'frequency': frequency,
            'instructions': instructions,
        }
        users_collection.update_one(
            {'customer_id': customer_id},
            {'$set': {'medicine record': medication_data}}
        )

        return jsonify({'message': 'Medicine Record saved successfully'}), 200
