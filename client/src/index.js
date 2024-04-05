import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
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
import article from "./component/article"
import medic from "./component/medication"
import Nutrition from "./component/Nutrition/Nutrition"
import TermsAndConditions from "./component/termsandcondition";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PopupForm from "./component/PopupFrom";


const App = () => {
  return (
    <Router>
      <div className="">
        <NavBar />
        <Switch>
          <Route path="/Nutrition" exact component={Nutrition}></Route>
          <Route path="/Vista" exact component={Vista}></Route>
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
          <Route path="/medication" exact component = {medic}></Route>
          <Route path="/article" exact component={article}></Route>
          <Route path="/termsandcondition" exact component={TermsAndConditions}></Route>
          <Route path="/PopupFrom" exact component={PopupForm}></Route>
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
