# forgot_python/forgot_routes.py
import os
from flask import Blueprint, request, jsonify
from flask_mail import Message
from login_python.login_models import User
from forgot_python.forgot_models import Forgot
import pyotp

forgot_bp = Blueprint('forgot', __name__)

sender_email = os.getenv('GMAIL_USER_NAME')

@forgot_bp.route('/forgot-password/request-token', methods=['POST'])
def request_token():
    data = request.json
    username = data.get('username')

    user = User().find_username(username)

    if user:
        # Generate and send OTP token
        token = Forgot.generate_token()
        Forgot.save_token(username, token)
        Forgot().send_otp_email(user['email'], token)

        return jsonify({'message': 'Token sent successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@forgot_bp.route('/forgot-password/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    username = data.get('username')
    token = data.get('token')
    new_password = data.get('new_password')

    # Validate the token
    if Forgot.validate_token(token, username):
        user = User().find_username(username)

        if user:
            # Update the user's password
            User().update_password(username, new_password)

            return jsonify({'message': 'Password reset successful'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'Invalid token'}), 401

def send_otp_email(email, token):
    msg = Message('Password Reset OTP', sender='sender_email', recipients=[email])
    msg.body = f'Your password reset OTP is: {token}'
    mail.send(msg)
