import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


const stripePromise = loadStripe(
  "pk_test_51OoPbHB45mq7hp813JIWoPpJikuO9iKzVOB9mpOGHdQqXneTDqBfQkoiXUvXfUUamBMLpPpbo5MgKeOGUfBwzFmE00ktXQjloo"
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
      <div class="block conainer block-plans" style={{ paddingTop: "0px" }}>
        <div class="row">
          <div class="heading">
            <h1 className="secondary-heading">Thank you for registering</h1>
            <h3 className="font-only-heading">Please choose a plan</h3>
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
                    <li class="list__item">Medical record tracking</li>
                    <li class="list__item">Appointment reminders</li>
                    <li class="list__item">
                      Limited access to wellness videos
                    </li>
                    <li class="list__item">Basic chatbot support</li>
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
                    <span class="plan__price">$15</span>
                    <span class="plan__billing-cycle">/month</span>

                    <span class="plan__description">Premium</span>
                  </header>
                  <div class="card__body">
                    <ul class="list list--tick">
                      <li class="list__item">Unlimited medical records</li>
                      <li class="list__item">
                        Healthcare provider integration
                      </li>
                      <li class="list__item">
                        Personalized wellness recommendations
                      </li>
                      <li class="list__item">Virutal Therapist</li>
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
              <div class="plan">
                <div class="card card--secondary">
                  <header class="card__header">
                    <h3 class="plan__name">Basic Teir</h3>
                    <span class="plan__price">$5</span>
                    <span class="plan__billing-cycle">/month</span>

                    <span class="plan__description">Essential</span>
                  </header>
                  <div class="card__body">
                    <ul class="list list--tick">
                      <li class="list__item">Unlimited medical records</li>
                      <li class="list__item">
                        Customizable medication reminders
                      </li>
                      <li class="list__item">Full access to wellness videos</li>
                      <li class="list__item">Expanded tracker options</li>
                    </ul>
                    <div className="plan-btn">
                      <button
                        class="btn btn-outline-success plan-buy-now-btn"
                        onClick={() => handlePayment("Basic tier")}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPlan;
