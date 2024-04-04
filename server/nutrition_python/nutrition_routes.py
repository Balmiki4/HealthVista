import os
from flask import Blueprint, Flask, jsonify, request
import requests

app = Flask(__name__)

nutrition_bp = Blueprint('nutrition_routes', __name__, url_prefix='/api')

# In-memory list to store added foods will change once i implement mongodb
foods = []

# Route to add food will upadte once i implement mongodb
@nutrition_bp.route('/foods', methods=['GET'])
def get_foods():
    return jsonify(foods)
