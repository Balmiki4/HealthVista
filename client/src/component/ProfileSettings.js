import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  return (
    <div className="profile-container">
      <h1 className="h3 mb-3">Settings</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card profile-card">
            <div className="card-header">
              <h5 className="card-title mb-0">Profile Settings</h5>
            </div>

            <div className="list-group list-group-flush">
              <Link to="/forgot" className="list-group-item list-group-item-action">
                Password Reset
              </Link>
              <Link to="/PaymentPlan" className="list-group-item list-group-item-action">
                Subscription
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
