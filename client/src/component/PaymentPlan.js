import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


const stripePromise = loadStripe(
  "pk_test_51P7RZFCUIRJhmuXG0JS7L77N6TEJcxZjzAkZeGnswlardQNfrbftOkI99lNy9mKNrC8HunsKLTKYcuxb2ppsak2D00AxDtz6PB"
);

function PaymentPlan() {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    if (customerId) {
      localStorage.setItem('customerId', customerId);
    }
  }, [customerId]);

  const handlePayment = async (selectedPlan) => {
    try {
      const response = await fetch(
        "http://localhost:5000/get-stripe-price-id",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedPlan }),
        }
      );
      const { priceId } = await response.json();

      const sessionResponse = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId, customerId, selectedPlan }),
        }
      );
      const { sessionId } = await sessionResponse.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error:", error);
        // Display error message to the user here
      }
      else{
        history.push('/success');
      } 
    } catch (error) {
      console.error("Error in payment process:", error);
      // Display error message to the user here
    }
  };
  return (
    <div class="conainer feature">
              <div class="block conainer block-plans pt-0 pb-0">
          <div class="row">
            <div class="heading">
              <h1 className="secondary-heading">Subscription Plans</h1>
              <h5 className="font-only-heading">
                Flexible Options to Suit Your Needs
              </h5>
              <div class="separator"></div>
            </div>
            <div class="grid grid--1x3">
              <div class="plan">
                <div class="card card--secondary">
                  <header class="card__header">
                    <h3 class="plan__name">Free Tier</h3>
                    <span class="plan__price">$0</span>
                    <span class="plan__billing-cycle">/month</span>

                    <span class="plan__description">Discovery</span>
                  </header>
                  <div class="card__body">
                    <ul class="list list--tick">
                      <li class="list__item">Medication Tracker</li>
                      <li class="list__item">Hospital Tracker</li>
                      <li class="list__item">
                      Exercise Videos
                      </li>
                      <li class="list__item">Health Articles</li>
                    </ul>
                    <div className="plan-btn">
                    <Link to={`/createProfile?customerId=${customerId}`}>
                      <button
                        class="btn btn-outline-success plan-buy-now-btn"
                        //onClick={()=>handlePayment('Free tier')}
                      >
                        Buy Now
                      </button>
                    </Link>
                  </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="plan plan--popular">
                  <div class="card card--primary">
                    <header class="card__header">
                      <h3 class="plan__name">Pro Tier</h3>
                      <span class="plan__price">$2.99</span>
                      <span class="plan__billing-cycle">/month</span>

                      <span class="plan__description">Premium</span>
                    </header>
                    <div class="card__body">
                      <ul class="list list--tick">
                        <li class="list__item">Vista (AI Therapist)</li>
                        <li class="list__item">
                        Nutrition Tracker
                        </li>
                        <li class="list__item">
                          Insurance Recommender
                        </li>
                        <li class="list__item">24/7 Customer Service</li>
                      </ul>
                      <div className="plan-btn">
                      <button
                        class="btn btn-outline-success plan-buy-now-btn"
                        onClick={() => handlePayment("Pro tier")}
                      >
                        Buy Now
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PaymentPlan;
