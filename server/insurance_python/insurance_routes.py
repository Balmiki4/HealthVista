from flask import Blueprint, Flask, request, jsonify
import requests
import os
import random


app = Flask(__name__)

API_KEY = os.environ.get("HEALTHCARE_API_KEY") 

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
    elif request.method == 'POST':
        data = request.get_json()
        income = data['income']
        age = data['age']
        gender = data.get('gender', 'Unknown')  # Set gender to 'Unknown' if not provided or in an invalid format
        if gender not in ['Male', 'Female', 'Unknown']:
            gender = 'Unknown'  # Ensure the gender is in a valid format
        city = data['city']
        state = data['state']
        zipcode = data['zipCode']
        year = data['year']

        # Look up the county FIPS code
        county_response = requests.get(f"https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/{zipcode}?apikey={API_KEY}")
        county_data = county_response.json()
        county_fips = county_data['counties'][0]['fips']

        # Build the request data
        request_data = {
            "household": {
                "income": income,
                "people": [
                    {
                        "age": age,
                        "aptc_eligible": True,
                        "gender": gender,
                        "uses_tobacco": False
                    }
                ]
            },
            "market": "Individual",
            "place": {
                "countyfips": county_fips,
                "state": state,
                "zipcode": zipcode
            },
            "year": year
        }
        # Make the API call to get the recommendations
        response = requests.post(f"https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey={API_KEY}", json=request_data)
        data = response.json()
        # print("API response:", data)

        if response.status_code != 200:
            return jsonify({"error": "Error fetching insurance recommendations"}), response.status_code
        plan_ids = [plan['id'] for plan in data['plans']]
        selected_plan_ids = random.sample(plan_ids, 8)
        selected_plans = [plan for plan in data['plans'] if plan['id'] in selected_plan_ids]

        return jsonify({"recommendations": selected_plans})