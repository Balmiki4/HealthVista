import logging
from login_python.login_models import User
from flask import jsonify, request, session,current_app
from flask import Blueprint
import datetime
from jose import jwt

login_bp = Blueprint('login', __name__)
@login_bp.route('/login', methods=['OPTIONS', 'POST'])
def login():
    if request.method == 'OPTIONS':
        # handle preflight requests
        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, response_headers)
    elif request.method == 'POST':
        # Get data from request
        data = request.json
        username = data.get('username')
        password = data.get('password')
        remember_me = data.get('remember_me', False)

        # Authenticate user
        user = User().authenticate(username, password)

        if user:
            # Store user-related data in the session
            session['user_id'] = str(user['_id'])
            session['username'] = user['username']
            session['user_plan'] = user['plan']

            # Set session expiration time
            if remember_me:
                session.permanent = True
                current_app.permanent_session_lifetime = datetime.timedelta(days=30)
            else:
                session.permanent = False
            # create the access token
            expiration_time = datetime.datetime.utcnow() + datetime.timedelta(days=1)
            access_token = jwt.encode({"user_id": session['user_id'], "username": session['username'], "exp": expiration_time}, "SECRET_KEY", algorithm="HS256")

            # Store the access token in the session
            session['access_token'] = access_token

            return jsonify({'message': 'Login successful', 'access_token': access_token , 'user_id' : session['user_id'] , 'username' : session['username'], 'user_plan' : session['user_plan']}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401