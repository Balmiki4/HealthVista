import { Link ,useHistory } from "react-router-dom";
import dashboard from "../img/dashboard.jpg";
import vista from "../img/chatbot.svg";
import wellness from "../img/wellness.jpg";
import React, { useEffect } from "react";

const Dashboard = () => {
  const user_id = sessionStorage.getItem('user_id');
  const access_token = sessionStorage.getItem('access_token'); 
  const history = useHistory(); 

  useEffect(() => {
    if (!sessionStorage.getItem('user_id') ) {
      history.push("/login");
    } 
  }, [history]);

  return (
    <div class="conainer feature">
    <div class="conainer">
    <div class="row">
      <div class="heading">
        <h1 className="text-center mb-5 display-5">Welcome to Health Vista</h1>
      </div>
      <div class="col-md-4 col-xs-12 col-sm-4 col-lg-4 mb-4">
        <div class="feature-main">
          <div class="feature-box">
            <img src={dashboard} class="img-responsive mb-3" alt=""></img>
            <div class="cover"></div>
          </div>
          <div class="feature-head">
            <h3 className="secondary-heading">Medication Tracker</h3>
            <p>
            Stay on Top of Your Medications: Track Dosages with Ease.
            </p>
            <Link to="/medication">
              <button class="btn btn-outline-success feature-learn-now-btn ">
                  Medication Tracker
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
            Your Personalized Therapist Chatbot for Support and Guidance.
            </p>
            <Link to="/vista">
              <button class="btn btn-outline-success feature-learn-now-btn ">
                Vista
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
            <h3 className="secondary-heading">Nutrition Tracker</h3>
            <p>
            Easily Monitor Your Daily Nutrition and Calorie Intake for a Healthier You.
            </p>
            <Link to="/Nutrition">
              <button class="btn btn-outline-success feature-learn-now-btn ">
              Nutrition Tracker
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
            <h3 className="secondary-heading">Hospital Tracker</h3>
            <p>
            Locate the Nearest Hospital for All Medical Needs, Emergency or Not.
            </p>
            <Link to="/map">
              <button class="btn btn-outline-success feature-learn-now-btn ">
              Hospital Tracker
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
            <h3 className="secondary-heading">Health Articles</h3>
            <p>
            Unlock Insights to Wellness: Dive into Engaging Health Articles for Your Journey.
            </p>
            <Link to="/article">
              <button class="btn btn-outline-success feature-learn-now-btn ">
              Health article
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
            <h3 className="secondary-heading">Exercise Videos</h3>
            <p>
            Elevate Your Fitness: Access a Variety of Engaging Exercise Videos for Every Goal.
            </p>
            <Link to="/wellnesspage">
              <button class="btn btn-outline-success feature-learn-now-btn ">
              Exercise Videos
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
            <h3 className="secondary-heading">Insurance Recommender</h3>
            <p>
            Discover Tailored Coverage: Our Insurance Recommender Finds the Perfect Plan.
            </p>
            <Link to="/insurancepage">
              <button class="btn btn-outline-success feature-learn-now-btn ">
              Insurance Recommender
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
            <h3 className="secondary-heading">Settings</h3>
            <p>
            Customize Your Experience: Fine-tune Your Settings with Ease.
            </p>
            <Link to="/Settings">
              <button class="btn btn-outline-success feature-learn-now-btn ">
              Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  </div>
    
  );
};

export default Dashboard;