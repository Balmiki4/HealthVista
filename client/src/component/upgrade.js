import React from "react";
import { useHistory } from "react-router-dom";
import "./upgrade.css";

function Upgrade() {
  const history = useHistory();

  const handleUpgrade = () => {
    history.push("/PaymentPlan");
  };

  const handleCancel = () => {
    // Handle cancel action, e.g., close the upgrade modal
  };

  return (
    <div className="upgrade-modal">
      <div className="upgrade-modal-content">
        <h2>Advanced features</h2>
        <div className="feature-list">
          <div className="feature">
            <img src="ai-therapist-icon.png" alt="AI Therapist Icon" />
            <p>
              Use this feature when you want to use the Vista (AI Therapist)
            </p>
          </div>
          <div className="feature">
            <img src="nutrition-icon.png" alt="Nutrition Icon" />
            <p>Nutrition Tracker</p>
          </div>
          <div className="feature">
            <img src="insurance-icon.png" alt="Insurance Icon" />
            <p>Insurance Recommender</p>
          </div>
          <div className="feature">
            <img src="customer-service-icon.png" alt="Customer Service Icon" />
            <p>24/7 Customer Service</p>
          </div>
        </div>
        <button className="upgrade-btn" onClick={handleUpgrade}>
          Upgrade to get these features
          <span className="star-icon">⭐</span>
        </button>
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
  );
}

export default Upgrade;
