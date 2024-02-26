import os
from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from signup_python.signup_routes import signup_bp
from bson.objectid import ObjectId
from flask_cors import CORS  

app = Flask(__name__)

app.register_blueprint(signup_bp)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
