import { Link } from "react-router-dom";
import dashboard from "./img/dashboard.jpg";
import vista from "./img/chatbot.svg";
import wellness from "./img/wellness.jpg";
import "./homePage.css";
import PopupForm from "./PopupFrom";

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
              <Link to="/signup">
                <button class="btn btn-light hero-signup-btn me-2">Signup</button>
              </Link>
              <Link to="/">
                <button class="btn btn-outline-success hero-learn-btn">Learn More</button>
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
                  <img src={dashboard} class="img-responsive mb-3" alt=""></img>
                  <div class="cover"></div>
                </div>
                <div class="feature-head">
                  <h3 className="secondary-heading">Medical Dashboard</h3>
                  <p>
                    Manage Your Health: Effortlessly track your medical records
                    in one secure location. Stay organized and proactive about
                    your health proactive about your health.
                  </p>
                  <Link to="/">
                    <button class="btn btn-outline-success feature-learn-now-btn ">
                      Learn More
                    </button>
                  </Link>
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
                    Personalized AI Therapist: Get instant answers to your
                    health queries and receive guidance whenever you need it
                    with our interactive AI-powered therapist.
                  </p>
                  <Link to="/">
                    <button class="btn btn-outline-success feature-learn-now-btn ">
                      Learn More
                    </button>
                  </Link>
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
                  <h3 className="secondary-heading">Wellness Hub</h3>
                  <p>
                    Your Path to Balance: Achieve wellness goals with guided
                    meditation and exercise/yoga clips. Join us for a healthier,
                    happier you!
                  </p>
                  <Link to="/wellnesspage">
                    <button class="btn btn-outline-success feature-learn-now-btn ">
                      Learn More
                    </button>
                  </Link>
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
                      <li class="list__item">Medical record tracking</li>
                      <li class="list__item">Appointment reminders</li>
                      <li class="list__item">
                        Limited access to wellness videos
                      </li>
                      <li class="list__item">Basic chatbot support</li>
                    </ul>

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
                    </div>
                  </div>
                </div>
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
                <h2 class=" font-only-heading">Common questions</h2>
                <p>Here are some of the most common questions that we get.</p>
              </div>
            </div>
            <div class="col-md-9">
              <div class="card mb-4">
                <div class="card-body">
                  <h4 class="secondary-heading">
                    What is HealthVISTA?
                  </h4>
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
              <Link to="/">
                <button class="btn btn-outline-light buy-now-btn">
                  Get Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer text-black">
        <div class="conainer">
          <div class="col-md-12 mt-4 text-center">
            <p class="footer__copyright">HealthVISTA &#169; 2024</p>
          </div>
        </div>
      </footer>

      <div>
        <PopupForm />
      </div>
    </div>
  );
};

export default homePage;
