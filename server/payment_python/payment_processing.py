import os
import stripe
import pymongo
from flask import session 


def get_stripe_price_id(selected_plan):
    price_mapping = {
        'Free tier': os.getenv('STRIPE_PRICE_ID_FREE'),  
        'Basic tier': os.getenv('STRIPE_PRICE_ID_BASIC'),
        'Pro tier': os.getenv('STRIPE_PRICE_ID_PREMIUM')
    }
    return price_mapping.get(selected_plan) 
    if not price_id:
        return None, 400  
    return price_id, 200

def calculate_amount(selected_plan):
    price_id = get_stripe_price_id(selected_plan) 

    try:
        price = stripe.Price.retrieve(price_id)
        return price['unit_amount']  

    except stripe.error.StripeError as e:
        print(f"Error fetching price: {e.message}")
        return 0  
    

