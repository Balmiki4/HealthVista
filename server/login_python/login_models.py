import os
import bcrypt
from pymongo import MongoClient


uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
db = client['healtVista']
users_collection = db['usersdata']

class User:
    # look up the user in database
    def find_username(self, username):
        return users_collection.find_one({'username': username})
    
    def authenticate(self,username, password):
        user = self.find_username(username)
        
        # check if the user's password is correct
        if user and bcrypt.checkpw(password.encode('utf-8'), user[password]):
            return user
        else:
            return None