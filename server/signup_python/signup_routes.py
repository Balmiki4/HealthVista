import os
import bcrypt
from flask import Blueprint
from signup_python.signup_models import User
from flask import request, jsonify,session,current_app
from pymongo import MongoClient
import datetime
import stripe

signup_bp = Blueprint('signup', __name__)

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

@signup_bp.route('/signup', methods=['OPTIONS', 'POST'])
def signup():
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
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Check if username or email or password already exists
        existing_user = users_collection.find_one({'$or': [{'username': username}, {'email': email}]})
        if existing_user:
            if existing_user.get('username') == username:
                return jsonify({'error': 'Username already taken'}), 400
            if existing_user.get('email') == email:
                return jsonify({'error': 'Email already taken'}), 400
            

        stripe_customer = stripe.Customer.create(
              name=username,
              email=email,
            )
        customer_id = stripe_customer.id
        print("Stripe Customer ID (during signup):", customer_id) 
        
        # Create new user object and store username, email, and hashed password
        new_user = User(username, email, hashed_password, customer_id=customer_id)


        # Insert new user into MongoDB
        inserted_user = users_collection.insert_one(new_user.__dict__)

        session['user_id'] = str(inserted_user.inserted_id)
        session['username'] = username
        session.permanent = True
        current_app.permanent_session_lifetime = datetime.timedelta(days=30)

        return jsonify({'message': 'User registered successfully', 'customerId' : customer_id}), 200
