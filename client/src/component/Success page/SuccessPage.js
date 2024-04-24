/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./SuccessPage.css";

function SuccessPage() {
  const history = useHistory();
  const [showLink, setShowLink] = useState(true);
  const [countdown, setCountdown] = useState(6);
  const customerId = localStorage.getItem('customerId');


  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      redirectToProfilePage();
    }

    return () => {
      clearInterval(intervalId);    };
  }, [countdown]);

  const redirectToProfilePage = () => {
    const profilePageUrl = `/createProfile?customerId=${customerId}`;
    history.push(profilePageUrl);
  };

  return (
    <div className="conainer feature success-page">
      <div class="heading">
        <h1 className="secondary-heading">Payment Successful!</h1>
        <h3 className="font-only-heading">
          Your subscription has been updated. Thank you!
        </h3>
        <div class="separator"></div>
        {countdown > 0 ? (
          <p>Redirecting to login in {countdown}...</p>
        ) : (
          <p>Redirecting in </p>
        )}

        {showLink && (
          <p>
            Click <Link to={`/createProfile?customerId=${customerId}`}>here</Link> if you are not
            redirected automatically.
          </p>
        )}
      </div>
    </div>
  );
}

export default SuccessPage;
