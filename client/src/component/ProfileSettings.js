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

  