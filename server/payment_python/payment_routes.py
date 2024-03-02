from functools import wraps
import os
from bson import ObjectId
from flask import Blueprint, request, jsonify, session
from payment_python.payment_processing import get_stripe_price_id
import logging
import jwt
from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import stripe
from pymongo import MongoClient


payment_bp = Blueprint('payment', __name__)

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)
db = client['healthvista']
users_collection = db['userdata']
    
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
    
@payment_bp.route('/stripe-webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv('STRIPE_WEBHOOK_SECRET')
        )
    except ValueError as e:
        return jsonify(error=str(e)), 400
    except stripe.error.SignatureVerificationError as e:
        return jsonify(error=str(e)), 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_id = session['client_reference_id']
        selected_plan = session['metadata'].get('selected_plan')

        print(f"Received event: {event}")
        print(f"Customer ID: {customer_id}")
        print(f"Selected Plan: {selected_plan}")

        user = users_collection.find_one({'customer_id': customer_id})

        if user:
            print(f"User found: {user}")
            # Update the user's plan in the database
            result = users_collection.update_one(
                {'_id': user['_id']},
                {'$set': {'plan': selected_plan}}
            )
            print(f"Update result: {result.raw_result}")
        else:
            print(f"User not found for customer ID: {customer_id}")


    return jsonify(success=True), 200

@payment_bp.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.get_json()
        price_id = data['priceId']
        customer_id = data['customerId']
        selected_plan = data['selectedPlan']

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            line_items=[{"price": price_id,"quantity": 1,}],
            success_url="http://localhost:3000/SuccessPage",
            cancel_url="http://localhost:3000/cancel",
            metadata={
                "selected_plan": selected_plan,
            },
            client_reference_id=customer_id,
        )

        return jsonify({"sessionId": checkout_session.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
