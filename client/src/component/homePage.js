import { Link } from 'react-router-dom'
import dashboard from './img/dashboard.jpg'
import vista from './img/chatbot.svg'
import wellness from './img/wellness.jpg'
import './homePage.css'

const homePage=()=>{
    return(
      <div>
        <section class="block block--dark hero">
        <div class="block__header conainer">
          <header class="hero__container">
            <h1 class="block__heading">Welcome to HealthVista</h1>
            <p class="hero__tagline">Unlock Your Wellness Journey with HealthVISTA: Your Ultimate Health Companion.</p>
            <div className='logins'>
                <Link to="/signup"><button class="btn btn-light me-2">Signup</button></Link>
                <Link to="/"><button class="btn btn-outline-success">Learn More</button></Link>
            </div>
          </header>
        </div>
        </section>

    <div class="conainer feature">
		<div class="conainer">
			<div class="row">
				<div class="heading">
					<h2>Explore Our Features</h2>
					<h6>Discover how HealthVISTA can help you improve your health and well-being</h6>
					<div class="separator"></div>
				</div>
				<div class="col-md-4 col-xs-12 col-sm-4 col-lg-4">
					<div class="feature-main">
						<div class="feature-box">
							<img src={dashboard} class="img-responsive mb-3" alt=""></img>
							<div class="cover"></div>
						</div>
						<div class="feature-head">
							<h3>Medical Dashboard</h3>
							<p>Manage Your Health: Effortlessly track your medical records in one secure location. Stay organized and proactive about your health.</p>
							<Link to="/"><button class="btn btn-outline-success">Learn More</button></Link>
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
							<h3>Vista</h3>
							<p>Personalized AI Therapist: Get instant answers to your health queries and receive guidance whenever you need it with our interactive AI-powered therapist.</p>
							<Link to="/"><button class="btn btn-outline-success">Learn More</button></Link>
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
							<h3 className=''>Wellness Hub</h3>
							<p>Your Path to Balance: Achieve wellness goals with guided meditation and exercise/yoga clips. Join us for a healthier, happier you!</p>
							<Link to="/wellnesspage"><button class="btn btn-outline-success">Learn More</button></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
    <div class="block conainer block-plans">
    <div class="row">
    <div class="heading">
					<h1>Subscription Plans</h1>
					<h6>Flexible Options to Suit Your Needs</h6>
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
                    <li class="list__item">Limited access to wellness videos</li>
                    <li class="list__item">Basic chatbot support</li>
                  </ul>
                  <Link to="/"><button class="btn btn-outline-primary">Buy Now</button></Link>
                </div>
              </div>
            </div>
            <div>
              <div class="plan plan--popular">
                <div class="card card--primary">
                  <header class="card__header">
                    <h3 class="plan__name">Pro Tier</h3>
                    <span class="plan__price">$5</span>
                    <span class="plan__billing-cycle">/month</span>
              
                    <span class="plan__description">Premium</span>
                  </header>
                  <div class="card__body">
                    <ul class="list list--tick">
                      <li class="list__item">Unlimited medical records</li>
                      <li class="list__item">Healthcare provider integration</li>
                      <li class="list__item">Personalized wellness recommendations</li>
                      <li class="list__item">Virutal Therapist</li>
                    </ul>
                    <Link to="/"><button class="btn btn-outline-primary">Buy Now</button></Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="plan">
                <div class="card card--secondary">
                  <header class="card__header">
                    <h3 class="plan__name">Basic Teir</h3>
                    <span class="plan__price">$15</span>
                    <span class="plan__billing-cycle">/month</span>

                    <span class="plan__description">Essential</span>
                  </header>
                  <div class="card__body">
                    <ul class="list list--tick">
                    <li class="list__item">Unlimited medical records</li>
                      <li class="list__item">Customizable medication reminders</li>
                      <li class="list__item">Full access to wellness videos</li>
                      <li class="list__item">Expanded tracker options</li>
                    </ul>
                    <Link to="/"><button class="btn btn-outline-primary">Buy Now</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
	</div>

  )
}

export default homePage