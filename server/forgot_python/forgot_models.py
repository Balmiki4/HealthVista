# forgot_python/forgot_models.py
import os
import secrets
from pymongo import MongoClient
from flask_mail import Message
from app import mail  # Importing mail directly from app
from mail_config import configure_mail  # Importing configure_mail

uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']
tokens_collection = db['tokens']

class Forgot:
    def generate_token(self):
        return secrets.token_hex(3)  # Adjust the length of the OTP as needed

    def save_token(self, username, token):
        tokens_collection.insert_one({'username': username, 'token': token})

    def send_otp_email(self, email, token):
        subject = 'Password Reset OTP'
        body = f'Hello,\n\n'
        body += 'We received a request to reset your password. Please use the OTP below to reset your password.\n\n'
        body += f'OTP: {token}\n\n'
        body += 'If you did not make this request, please ignore this email.\n\n'
        body += 'Thank you!\nHealthVista Team'

        message = Message(subject=subject, recipients=[email], body=body)
        mail.send(message)
