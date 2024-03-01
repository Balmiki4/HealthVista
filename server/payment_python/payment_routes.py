from functools import wraps
import os
from bson import ObjectId
from flask import Blueprint, request, jsonify, session
from payment_python.payment_processing import get_stripe_price_id
import logging
import jwt
from flask import Flask, request, jsonify
from datetime import datetime, timedelta

payment_bp = Blueprint('payment', __name__)
    
@payment_bp.route('/get-stripe-price-id', methods=['POST'])
def get_price_id():
    try:
        selected_plan = request.get_json()['selectedPlan']
        price_id = get_stripe_price_id(selected_plan)  
        print("Retrieved Price ID:", price_id) # Add this logging
        response = jsonify({'priceId': price_id})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response
    except Exception as e:
        print(f"Error in get_price_id: {e}") # Log exceptions
        return jsonify({"error": "Error retrieving price id"}), 500 
    
