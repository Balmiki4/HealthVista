import React, { useState } from 'react';

const ProfileSettings = ({ user }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [showDropdown, setShowDropdown] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : '');
  const [subscription, setSubscription] = useState(user ? user.subscription : 'free');
  const [logoutMessage, setLogoutMessage] = useState('');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setLogoutMessage('You have been logged out successfully.');
    setShowDropdown(false); 
    console.log('Logging out...');
  };
 
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    console.log('Password updated successfully');
  };

  
  const handleAccountUpdate = (e) => {
    e.preventDefault();
    console.log('Account details updated successfully');
  };

  const handleSubscriptionUpdate = (e) => {
    e.preventDefault();
    console.log('Subscription updated successfully');
  };
  return (
    <div className="profile-container">
      <h1 className="h3 mb-3">Settings</h1>
      <div className="row">
        <div className="col-md-5 col-xl-4">
          <div className="card profile-card">
            <div className="card-header">
              <h5 className="card-title mb-0">Profile Settings</h5>
            </div>
 
 
            <div className="list-group list-group-flush" role="tablist">
              {user && (
                <div className="dropdown">
                  <button className="list-group-item list-group-item-action" type="button" onClick={toggleDropdown}>
                    {user.name} 
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Profile</a>
                      <a className="dropdown-item" href="#">Update Password</a>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button> 
                    </div>
                  )}
                </div>
              )}
 
 
              <a className={`list-group-item list-group-item-action ${activeTab === 'account' ? 'active' : ''}`} data-toggle="list" href="#account" role="tab" onClick={() => setActiveTab('account')}>
                Account
              </a>
              <a className={`list-group-item list-group-item-action ${activeTab === 'password' ? 'active' : ''}`} data-toggle="list" href="#password" role="tab" onClick={() => setActiveTab('password')}>
                Change Password
              </a>
              <a className={`list-group-item list-group-item-action ${activeTab === 'subscription' ? 'active' : ''}`} data-toggle="list" href="#subscription" role="tab" onClick={() => setActiveTab('subscription')}>
                Subscription
              </a>
              <a className={`list-group-item list-group-item-action ${activeTab === 'logout' ? 'active' : ''}`} onClick={() => { setActiveTab('logout'); setLogoutMessage(''); setShowDropdown(false); }}>
                Logout
              </a>
            </div>
          </div>
        </div>
 
 
        <div className="col-md-7 col-xl-8">
          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === 'account' ? 'show active' : ''}`} id="account" role="tabpanel">
              <div className="card profile-card">
                <div className="card-body">
                  <h5 className="card-title profile-card-title">Account</h5>
 
 
                  <form onSubmit={handleAccountUpdate}>
                    <div className="form-group profile-form-group">
                      <label htmlFor="inputName">Name</label>
                      <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group profile-form-group">
                      <label htmlFor="inputEmail">Email</label>
                      <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group profile-form-group">
                      <label htmlFor="inputPhoneNumber">Phone Number</label>
                      <input type="tel" className="form-control" id="inputPhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary profile-btn-primary">Save changes</button>
                  </form>
                </div>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'password' ? 'show active' : ''}`} id="password" role="tabpanel">
              <div className="card profile-card">
                <div className="card-body">
                  <h5 className="card-title profile-card-title">Password</h5>
 
 
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="form-group profile-form-group">
                      <label htmlFor="inputPasswordCurrent">Current password</label>
                      <input type="password" className="form-control" id="inputPasswordCurrent" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="form-group profile-form-group">
                      <label htmlFor="inputPasswordNew">New password</label>
                      <input type="password" className="form-control" id="inputPasswordNew" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="form-group profile-form-group">
                      <label htmlFor="inputPasswordNew2">Confirm new password</label>
                      <input type="password" className="form-control" id="inputPasswordNew2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary profile-btn-primary">Save changes</button>
                  </form>
                </div>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'subscription' ? 'show active' : ''}`} id="subscription" role="tabpanel">
              <div className="card profile-card">
                <div className="card-body">
                  <h5 className="card-title profile-card-title">Subscription</h5>
                  <form onSubmit={handleSubscriptionUpdate}>
                    <div className="form-group profile-form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="free"
                          id="freeSubscription"
                          checked={subscription === 'free'}
                          onChange={() => setSubscription('free')}
                        />
                        <label className="form-check-label" htmlFor="freeSubscription">
                          Free Tier
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="pro"
                          id="proSubscription"
                          checked={subscription === 'pro'}
                          onChange={() => setSubscription('pro')}
                        />
                        <label className="form-check-label" htmlFor="proSubscription">
                          Pro Tier
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary profile-btn-primary">Save changes</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {logoutMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {logoutMessage}
        </div>
      )}
    </div>
  );
 };
 
 
 export default ProfileSettings;
 

  