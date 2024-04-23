import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpgradePlan from "./payment Plan/UpgradePlan";
import "./ProfileSettings.css";
import { useHistory } from "react-router-dom";

const ProfileSettings = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  const userPlan = sessionStorage.getItem("user_plan");
  const history = useHistory();

  useEffect(() => {
     if (!sessionStorage.getItem('user_id') ) {
       history.push("/login");
     }
   }, [history]);

  useEffect(() => {
    // Fetch the user's current plan from the server or local storage
    const fetchCurrentPlan = async () => {
      try {
        const plan = userPlan;
        setCurrentPlan(plan);
      } catch (error) {
        console.error("Error fetching current plan:", error);
      }
    };

    fetchCurrentPlan();
  }, []);

  return (
    <div className="body-ps">
      <div className="pscontainer mx-auto w-50">
        <div className="header">
          <div className="text">
            <h1 className="font-only-heading">SETTINGS</h1>
          </div>
          <div className="underline"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card  w-50 mx-auto shadow-none mb-5 ">

              <div className="list-group list-group-flush">
                <Link
                  to="/forgot"
                  className="list-group-item pt-2 pb-2 list-group-item-action text-center"
                >
                  <button className="btn btn-outline-success">Password Reset</button>
                </Link>
                {currentPlan === "free" ? (
                  <div className="m-3 mx-auto">
                    <UpgradePlan />
                  </div>
                ) : (
                  <div className="list-group-item text-center">
                    <p>You are currently on Premium Plan.</p>
                    <p>To downgrade or cancel, contact Us</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
