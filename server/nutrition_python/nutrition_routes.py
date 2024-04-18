import os
from flask import Blueprint, Flask, jsonify, request
import requests
from flask_cors import cross_origin
from jose import jwt
from pymongo import MongoClient
from bson import ObjectId
from functools import wraps
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)

nutrition_bp = Blueprint('nutrition_routes', __name__, url_prefix='/api')

api_key = os.environ.get("NUT_API_KEY")

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']


#requires_auth decorator to check if the user is authenticated or not

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


@nutrition_bp.route('/foods', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def get_foods():
    user_id = ObjectId(request.headers.get('User-Id'))
    user_data = users_collection.find_one({'_id': user_id})
    if user_data:
        foods = user_data.get('food_data', [])
        return jsonify(foods)
    else:
        return jsonify({'foods': []}), 200

@nutrition_bp.route('/foods', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def add_food():
    food_data = request.json
    user_id = ObjectId(request.headers.get('User-Id'))
    food_data['timestamp'] = datetime.utcnow()
    result = users_collection.update_one(
        {'_id': user_id},
        {'$push': {'food_data': food_data}}
    )
    return jsonify({'message': 'Food added successfully'}), 200

@nutrition_bp.route('/foods/<food_name>', methods=['DELETE'])
@requires_auth
def delete_food_by_id(food_name):
    user_id = ObjectId(request.headers.get('User-Id'))
    result = users_collection.update_one(
        {'_id': user_id},
        {'$pull': {'food_data': {'name': food_name}}}
    )
    return jsonify({'message': 'Food deleted successfully'}), 200

# Route to get nutrition data from api
@nutrition_bp.route('/nutrition', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def get_nutrition_data():
    query = request.get_json().get('query')
    api_url = f'https://api.api-ninjas.com/v1/nutrition?query={query}'
    response = requests.get(api_url, headers={'X-Api-Key': api_key})

    if response.status_code == requests.codes.ok:
        return jsonify(response.json())
    else:
        return jsonify({'error': f'Error: {response.status_code} - {response.text}'}), response.status_code

@nutrition_bp.route('/past_foods', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'], supports_credentials=True)
@requires_auth
def get_past_foods():
    user_id = ObjectId(request.headers.get('User-Id'))

    past_foods = users_collection.aggregate([
        {'$match': {'_id': user_id}},
        {'$unwind': '$past_food_data'},
        {'$group': {'_id': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$past_food_data.timestamp'}}, 'foods': {'$push': '$past_food_data'}}},
        {'$sort': {'_id': -1}} 
    ])

    past_food_logs = [{'date': doc['_id'], 'foods': doc['foods']} for doc in past_foods]

    return jsonify(past_food_logs)

@nutrition_bp.route('/move_to_past_log', methods=['POST'])
@requires_auth
def move_to_past_log():
    user_id = ObjectId(request.headers.get('User-Id'))
    current_log = users_collection.find_one({'_id': user_id}, {'food_data': 1})
    foods_to_move = current_log.get('food_data', [])
    users_collection.update_one({'_id': user_id}, {'$set': {'food_data': []}})
    users_collection.update_one({'_id': user_id}, {'$push': {'past_food_data': {'$each': foods_to_move}}})
    return jsonify({'message': 'Food items moved to past log successfully'}), 200
