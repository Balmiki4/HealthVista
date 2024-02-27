import os
import bcrypt
from pymongo import MongoClient


uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
db = client['healtVista']
users_collection = db['usersdata']

