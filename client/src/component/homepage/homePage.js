import { Link } from "react-router-dom";
import "./homePage.css";
import PopupForm from "../PopupFrom";
import insurance from "../img/dashboard_img/insurance.jpg";
import wellness from "../img/dashboard_img/wellness.jpg";
import dashboard from "../img/dashboard.jpg";
import vista from "../img/chatbot.svg";


const homePage = () => {
  return (
    <div>
      <section class="block block--dark hero">
        <div class="block__header conainer">
          <header class="hero__container">
            <h1 class="font-only-heading block__heading">
              Welcome to HealthVista
            </h1>
            <p class="hero__tagline">
              Unlock Your Wellness Journey with HealthVISTA: Your Ultimate
              Health Companion.
            </p>
            <div className="logins">
              <Link to="/">
                <button class="btn btn-outline-light hero-learn-btn">
                  Learn More
                </button>
              </Link>
            </div>
          </header>
        </div>
      </section>

      <div class="conainer feature">
        <div class="conainer">
          <div class="row">
            <div class="heading">
              <h1 className="secondary-heading">Explore Our Features</h1>
              <h5 className="font-only-heading">
                Discover how HealthVISTA can help you improve your health and
                well-being
              </h5>
              <div class="separator"></div>
            </div>
            <div class="col-md-4 col-xs-12 col-sm-4 col-lg-4">
              <div class="feature-main">
                <div class="feature-box">
                  <img src={insurance} class="img-responsive mb-3" alt=""></img>
                  <div class="cover"></div>
                </div>
                <div class="feature-head">
                  <h3 className="secondary-heading">Insurance Recommender</h3>
                  <p>
                  Discover Tailored Coverage: Our Insurance Recommender helps you Finds the Perfect Plan.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12 col-sm-4 col-lg-4">
              <div class="feature-main">
                <div class="feature-box">
                  <img src={vista} class="img-responsive mb-3" alt=""></img>
                  <div class="cover"></div>
                </div>
                <div class="feature-head">
                  <h3 className="secondary-heading">Vista</h3>
                  <p>
                    Vista: Your Personalized Therapist Chatbot for Support and guidance whenever you need it.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12 col-sm-4 col-lg-4">
              <div class="feature-main">
                <div class="feature-box">
                  <img src={wellness} class="img-responsive mb-3" alt=""></img>
                  <div class="cover"></div>
                </div>
                <div class="feature-head">
                  <h3 className="secondary-heading">Exercise Videos</h3>
                  <p>
                    Your Path to Balance: Elevate Your Fitness: Access a Variety of Engaging Exercise Videos for Every Goal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block conainer block-plans">
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


      <div className="faq">
        <div class="conainer">
          <div class="row">
            <div class="col-md-3">
              <div class="mb-3">
                <span class="text-muted text-uppercase">FAQ</span>
                <h2 class=" secondary-heading">Common questions</h2>
                <p>Here are some of the most common questions that we get.</p>
              </div>
            </div>
            <div class="col-md-9">
              <div class="card mb-4">
                <div class="card-body">
                  <h4 class="secondary-heading">What is HealthVISTA?</h4>
                  <p>
                    HealthVISTA is a website that provides various health
                    tracking tools and resources to help individuals monitor and
                    improve their overall well-being.
                  </p>
                  <h4 class="secondary-heading">
                    How can I track my health using HealthVISTA?
                  </h4>
                  <p>
                    HealthVISTA offers a Tracker feature where you can input and
                    monitor various health metrics such as weight, blood
                    pressure, exercise, and more.
                  </p>
                  <h4 class="secondary-heading">
                    What is the purpose of the AI thearpist feature?
                  </h4>
                  <p>
                    The AI thearpist feature on HealthVISTA allows users to ask
                    questions, share thoughts and receive personalized responses
                    related to health and wellness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="conainer">
        <div class="callout callout--primary callout--signup">
          <div class="grid grid--1x2">
            <div class="callout__content">
              <h2 class="font-only-heading callout__heading">
                A safe space to heal and grow
              </h2>
              <p>Your health matters. We're here for you.</p>
            </div>
            <div className="callout-btn">
              <Link to="/signup">
                <button class="btn btn-outline-light buy-now-btn">
                  Get Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <PopupForm />
      </div>
    </div>
  );
};

export default homePage;
