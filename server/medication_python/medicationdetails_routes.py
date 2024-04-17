import os
import logging
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from bson import ObjectId
from pymongo import MongoClient

medicine_details_bp = Blueprint('medicine_details', __name__)

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

@medicine_details_bp.route('/medicine_details', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
def medicine_details():
    medicine_record = []

    user_id = ObjectId(request.headers.get('UserId'))

    if user_id:
            # Query database for user's medicine record
            user = users_collection.find_one({'_id': user_id})

            if user:
                user_name = user.get('username')
                medicine_record = user.get('medicine record', [])
                for medicine in medicine_record:
                    medicine['user_name'] = user_name
                return jsonify(medicine_record), 200
            else:
                return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'User_id not provided in request headers'}), 400
