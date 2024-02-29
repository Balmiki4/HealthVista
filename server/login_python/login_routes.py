from login_models import User
from flask import jsonify, request
from flask import Blueprint
import datetime
from jose import jwt

login_bp = Blueprint('login', __name__)
@login_bp.route('/login', methods=['OPTIONS', 'POST'])
def login():
    
    if request.method == 'OPTIONS':
        # handle prflight requests
        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, response_headers)
    elif request.method == 'POST':
        # Get data from request
        username = request.json.get('username')
        password = request.json.get('password')
        remember_me = request.json.get('remember_me', False)
        
        #Athunticate user
        user = User.authenticate(username, password)
        
        if user:  
            # details for the user's session
            user_data = {
                'user_id': str(user['id']),
                'username': user['username']
            } 
            
            # if the user wants to remember this login details
            if remember_me:
                expiration_time = datetime.datetime.utcnow() + datetime.timedelta(days =30)
            else:
                expiration_time = datetime.datetime.utcnow() + datetime.timedelta(minutes =15)
                
             # create the acces token    
            access_token = jwt.encode({"user_id": user_data['user_id'], "username": user_data['username'], "exp": expiration_time}, "SECRET_KEY", algorithm="HS256")
            
            return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
            
        else: 
            return jsonify({'error': 'Invalid usrname or password'}), 401
        

     