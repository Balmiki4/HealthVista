import { Link } from 'react-router-dom';
import "./homePage.css";


function paymentPlan(){

    return(
        <div class="conainer feature" >
        <div class="block conainer block-plans" style={{ paddingTop: '0px' }} >
        <div class="row">
          <div class="heading">
            <h1 className="secondary-heading">Thank you for registering</h1>
            <h3 className="font-only-heading">
              Please choose a plan
            </h3>
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
                  <Link to="/">
                        <button class="btn btn-outline-success plan-buy-now-btn">
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
                  <Link to="/">
                        <button class="btn btn-outline-success plan-buy-now-btn">
                          Buy Now
                        </button>
                      </Link>
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
                      <li class="list__item">
                        Full access to wellness videos
                      </li>
                      <li class="list__item">Expanded tracker options</li>
                    </ul>
                    <div className="plan-btn">
                  <Link to="/">
                        <button class="btn btn-outline-success plan-buy-now-btn">
                          Buy Now
                        </button>
                      </Link>
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

export default paymentPlan;