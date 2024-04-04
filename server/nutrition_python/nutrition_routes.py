import os
from flask import Blueprint, Flask, jsonify, request
import requests

app = Flask(__name__)

nutrition_bp = Blueprint('nutrition_routes', __name__, url_prefix='/api')

api_key = os.environ.get("NUT_API_KEY")

# In-memory list to store added foods will change once i implement mongodb
foods = []

# Route to get food will upadte once i implement mongodb
@nutrition_bp.route('/foods', methods=['GET'])
def get_foods():
    return jsonify(foods)

# Route to add food will update once i implement mongodb
@nutrition_bp.route('/foods', methods=['POST'])
def add_food():
    food_data = request.get_json()
    foods.append(food_data)
    return jsonify({'message': 'Food added successfully'})

# Route to delete food will update once i implement mongodb
@nutrition_bp.route('/foods/<food_name>', methods=['DELETE'])
def delete_food(food_name):
    for food in foods:
        if food['name'] == food_name:
            foods.remove(food)
            return jsonify({'message': f'{food_name} deleted'})
    return jsonify({'error': f'{food_name} not found'}), 404

# Route to get nutrition data from api
@nutrition_bp.route('/nutrition', methods=['POST'])
def get_nutrition_data():
    query = request.get_json().get('query')
    api_url = f'https://api.api-ninjas.com/v1/nutrition?query={query}'
    response = requests.get(api_url, headers={'X-Api-Key': api_key})

    if response.status_code == requests.codes.ok:
        return jsonify(response.json())
    else:
        return jsonify({'error': f'Error: {response.status_code} - {response.text}'}), response.status_code
