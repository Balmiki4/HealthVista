# login_python/login_models.py
import os
import bcrypt
from pymongo import MongoClient


uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']

class User:
    def find_username(self, username):
        return users_collection.find_one({'username': username})

    # authenticate the user
    def authenticate(self, username, password):
        user = self.find_username(username)
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return user
        else:
            return None

    # update the user's password
    def update_password(self, username, new_password):
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        users_collection.update_one(
            {'username': username},
            {'$set': {'password': hashed_password}}
        )
