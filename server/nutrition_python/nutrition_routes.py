import os
from flask import Blueprint, Flask, jsonify, request
import requests

app = Flask(__name__)

nutrition_bp = Blueprint('nutrition_routes', __name__, url_prefix='/api')

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
