import os
import bcrypt
from flask import Blueprint
from flask import request, jsonify
from signup_python.signup_models import User
from pymongo import MongoClient
from bson import ObjectId;
from jose import jwt
from functools import wraps
from flask_cors import cross_origin


medication_bp = Blueprint('medication',__name__)

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_id = request.headers.get('Userid')
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

@medication_bp.route('/medicine', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def get_medications():
    userid = ObjectId(request.headers.get('Userid'))
    user = users_collection.find_one({'_id': userid})
    email = user.get('email',None)
    if user is None:
        return jsonify({'error': f'User not found for user_id: {userid}'}), 404
    if 'medicine record' not in user or not isinstance(user['medicine record'], list):
        return jsonify({'medicineData': [], 'email':email}), 200
    return jsonify({'medicineData': user['medicine record'], 'email':email}), 200

@medication_bp.route('/medication', methods=['OPTIONS', 'POST'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def create_medication():
        
        userid = ObjectId(request.headers.get('Userid'))
        medication_data = request.json.get('medications')
        

        # Find the user with the given customer_id
        user = users_collection.find_one({'_id': userid})
        if user is None:
            return jsonify({'error': f'User not found for user_id: {userid}'}), 404
        
        if 'medicine record' not in user or not isinstance(user['medicine record'], list):
            users_collection.update_one(
                {'_id': userid},
                {'$set': {'medicine record': []}}
            )

        # Add new medication data to the user's 'medicine record' field
        users_collection.update_one(
            {'_id': userid},
            {'$push': {'medicine record': medication_data}}
        )

        return jsonify({'message': 'Medicine Record saved successfully'}), 200
