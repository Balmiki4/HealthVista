import os
import bcrypt
from flask import Blueprint
from flask import request, jsonify
from signup_python.signup_models import User
from pymongo import MongoClient

profile_bp = Blueprint('profile',__name__)

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

@profile_bp.route('/createProfile', methods=['OPTIONS', 'POST'])
def create_profile():
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
        firstName = request.json.get('firstName')
        lastName = request.json.get('lastName')
        gender = request.json.get('gender')
        dob = request.json.get('dob')
        phoneNumber = request.json.get('phoneNumber')
        zipCode = request.json.get('zipCode')

        # Find the user with the given customer_id
        user = users_collection.find_one({'customer_id': customer_id})
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        # Create new profile data and store it in the user's record
        profile_data = {
            'firstName': firstName,
            'lastName': lastName,
            'gender': gender,
            'dob': dob,
            'phoneNumber': phoneNumber,
            'zipCode': zipCode,
        }
        users_collection.update_one(
            {'customer_id': customer_id},
            {'$set': {'profile': profile_data}}
        )

        return jsonify({'message': 'Profile created successfully'}), 200
