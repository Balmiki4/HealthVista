from flask import Blueprint, Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = " "  

insurance_bp = Blueprint('insurance_routes', __name__)
@insurance_bp.route('/get_recommendations', methods=['OPTIONS', 'POST'])
def get_recommendations():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
        }
        return ('', 204, response_headers)