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