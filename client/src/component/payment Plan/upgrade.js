import React from "react";
import { useHistory } from "react-router-dom";
import UpgradePlan from "./UpgradePlan"; // Import UpgradePlan component
import {
  FaBrain,
  FaUtensils,
  FaMoneyCheckAlt,
  FaHeadset,
} from "react-icons/fa"; // Import icons from Font Awesome
import "./upgrade.css";

function Upgrade() {
  const history = useHistory();

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="popup-overlay">
      <div className="upgrade-modal">
        <div className="upgrade-modal-content">
          <h3>Advanced Features</h3>
          <div className="underline"></div>
          <div className="upgrade-btn">
            <span className="star-icon">⭐ </span>
            Upgrade To Premium To Get These Features
          </div>
          <div className="feature-list">
            <div className="feature">
              <span className="featureIcon">
                <FaBrain />
              </span>
              <p>Vista (AI Therapist)</p>
            </div>
            <div className="feature">
              <span className="featureIcon">
                <FaUtensils />
              </span>
              <p>Nutrition Tracker</p>
            </div>
            <div className="feature">
              <span className="featureIcon">
                <FaMoneyCheckAlt />
              </span>
              <p>Insurance Recommender</p>
            </div>
            <div className="feature">
              <span className="featureIcon">
                <FaHeadset />
              </span>
              <p>24/7 Customer Service</p>
            </div>
          </div>

          <div className="bottom-buttons">
            <button className="btn btn-secondary p-2" onClick={handleCancel}>
              Cancel
            </button>
            <UpgradePlan />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
