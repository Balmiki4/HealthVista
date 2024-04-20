import { Link } from "react-router-dom";
import { handlePayment } from "./payment";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";



function PaymentPlan() {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    if (customerId) {
      localStorage.setItem("customerId", customerId);
    }
  }, [customerId]);

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
                    <li class="list__item">Exercise Videos</li>
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
                      <li class="list__item">Nutrition Tracker</li>
                      <li class="list__item">Insurance Recommender</li>
                      <li class="list__item">24/7 Customer Service</li>
                    </ul>
                    <div className="plan-btn">
                      <button
                        class="btn btn-outline-success plan-buy-now-btn"
                        onClick={() => handlePayment("Pro tier", customerId, history)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPlan;
