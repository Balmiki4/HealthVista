import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NavBar from "./component/nav bar/NavBar";
import homePage from "./component/homepage/homePage";
import login from "./component/login page/login";
import forgot from "./component/forgot page/forgot";
import signup from "./component/Sign up page/signup";
import wellnesspage from "./component/wellness page/wellnesspage";
import PaymentPlan from "./component/payment Plan/PaymentPlan";
import SuccessPage from "./component/Success page/SuccessPage";
import ProfilePage from "./component/Create Profile page/createProfile";
import Footer from "./component/footer/Footer";
import Vista from "./component/vista/Vista";
import insurancepage from "./component/insurance page/insurancepage";
import Map from "./component/map page/map";
import article from "./component/article page/article"
import medic from "./component/medication page/medication"
import Nutrition from "./component/Nutrition/Nutrition"
import PlanDetails from "./component/insurance page/PlanDetails";
import Privacy from "./component/legal pages/Privacy";
import TermsOfService from "./component/legal pages/TermsOfService";
import ProfileSettings from "./component/profile settings/ProfileSettings";
import CancelPage from "./component/cancel page/CancelPage";
import Dashboard from "./component/dashboard/Dashboard";
import medication from "./component/medication page/medicationDetails"
import UpgradePlan from "./component/payment Plan/UpgradePlan";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LearnMorePage from "./component/Learn More/LearnMore";


const App = () => {
  return (
    <Router>
      <div className="">
        <NavBar />
        <Switch>
          <Route path="/cancel" exact component={CancelPage}></Route>
          <Route path="/LearnMore" exact component={LearnMorePage}></Route>
          <Route path="/UpgradePlan" exact component={UpgradePlan}></Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/Nutrition" exact component={Nutrition}></Route>
          <Route path="/Vista" exact component={Vista}></Route>
          <Route path="/SuccessPage" exact component={SuccessPage}></Route>
          <Route path="/PaymentPlan" exact component={PaymentPlan}></Route>
          <Route path="/signup" exact component={signup}></Route>
          <Route path="/login" exact component={login}></Route>
          <Route path="/forgot" exact component={forgot}></Route>
          <Route path="/" exact component={homePage}></Route>
          <Route path="/wellnesspage" exact component={wellnesspage}></Route>
          <Route path="/insurancepage" exact component={insurancepage}></Route>
          <Route path="/createProfile" exact component={ProfilePage}></Route>
          <Route path="/map" exact component={Map}></Route>
          <Route path="/medication" exact component={medic}></Route>
          <Route path="/medicationDetails" exact component = {medication}></Route>
          <Route path="/article" exact component={article}></Route>
          <Route path="/PlanDetails" exact component={PlanDetails}></Route>
          <Route path="/Privacy" exact component={Privacy}></Route>
          <Route path="/ProfileSettings" exact component={ProfileSettings}></Route>
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
