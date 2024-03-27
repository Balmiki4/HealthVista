import os
import bcrypt
from flask import Blueprint
from flask import request, jsonify
from pymongo import MongoClient

profile_bp = Blueprint('profile',__name__)

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']