import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NavBar from "./component/NavBar";
import homePage from "./component/homePage";
import login from "./component/login";
import forgot from "./component/forgot";
import signup from "./component/signup";
import wellnesspage from "./component/wellnesspage";
import PaymentPlan from "./component/PaymentPlan";
import SuccessPage from "./component/SuccessPage";
import ProfilePage from "./component/createProfile";
import Footer from "./component/Footer";
import Vista from "./component/vista/Vista";
import insurancepage from "./component/insurancepage";
import Map from "./component/map";
import article from "./component/article";
import Privacy from "./component/Privacy";
import TermsOfService from "./component/TermsOfService";
import medic from "./component/medication";
import Nutrition from "./component/Nutrition/Nutrition";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

// Importing dotenv
// import dotenv from "dotenv";
// dotenv.config();

// Route guard component to restrict access to Vista based on user's plan
function VistaGuardedRoute({ component: Component, ...rest }) {
  const [userPlan, setUserPlan] = useState("");
  const isAuthenticated = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchUserPlan() {
      try {
        // Fetch user's plan from the backend
        const response = await axios.get("/get-plan");
        const userPlanData = response.data.plan;
        setUserPlan(userPlanData);
      } catch (error) {
        console.error("Error fetching user plan:", error);
      }
    }

    fetchUserPlan();
  }, []);

  // If user is authenticated and has a pro plan, render the component
  if (isAuthenticated && userPlan === "pro") {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    // Redirect to login or upgrade page if not authenticated or doesn't have a pro plan
    return <Redirect to={isAuthenticated ? "/upgrade-plan" : "/login"} />;
  }
}

const App = () => {
  return (
    <Router>
      <div className="">
        <NavBar />
        <Switch>
          <Route path="/Nutrition" exact component={Nutrition}></Route>
          <VistaGuardedRoute
            path="/Vista"
            exact
            component={Vista}
          ></VistaGuardedRoute>
          <Route path="/SuccessPage" exact component={SuccessPage}></Route>
          <Route path="/PaymentPlan" exact component={PaymentPlan}></Route>
          <Route path="/signup" exact component={signup}></Route>
          <Route path="/login" exact component={login}></Route>
          <Route path="/forgot" exact component={forgot}></Route>
          <Route path="/" exact component={homePage}></Route>
          <Route path="/insurancepage" exact component={insurancepage}></Route>
          <Route path="/wellnesspage" exact component={wellnesspage}></Route>
          <Route path="/insurancepage" exact component={insurancepage}></Route>
          <Route path="/createProfile" exact component={ProfilePage}></Route>
          <Route path="/map" exact component={Map}></Route>
          <Route path="/medication" exact component={medic}></Route>
          <Route path="/article" exact component={article}></Route>
          <Route path="/Privacy" exact component={Privacy}></Route>
          <Route
            path="/TermsOfService"
            exact
            component={TermsOfService}
          ></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<App />, document.getElementById("root"));
