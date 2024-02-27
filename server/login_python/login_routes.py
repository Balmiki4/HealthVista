from login_models import User
from flask import jsonify, request

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
        
        #Athunticate user
        user = User.authenticate(username, password)
        
   