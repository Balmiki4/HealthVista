import React from "react";
import { useHistory } from "react-router-dom";
import "./upgrade.css";

function Upgrade() {
  const history = useHistory();

  const handleUpgrade = () => {
    history.push("/PaymentPlan");
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="popup-overlay">
      <div className="upgrade-modal">
        <div className="upgrade-modal-content">
          <h2>Advanced features</h2>
          <button className="upgrade-btn" onClick={handleUpgrade}>
            Upgrade to get these features
            <span className="star-icon">⭐</span>
          </button>
          <div className="feature-list">
            <div className="feature">
              <span class="featureIcon">$</span>
              <p>Vista (AI Therapist)</p>
            </div>
            <div className="feature">
              <span class="featureIcon">$</span>
              <p>Nutrition Tracker</p>
            </div>
            <div className="feature">
              <span class="featureIcon">$</span>
              <p>Insurance Recommender</p>
            </div>
            <div className="feature">
              {/* <img src="customer-service-icon.png" alt="Customer Service Icon" /> */}
              <span class="featureIcon">$</span>
              <p>24/7 Customer Service</p>
            </div>
          </div>

          <div className="bottom-buttons">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="upgrade-now-btn" onClick={handleUpgrade}>
              Upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
