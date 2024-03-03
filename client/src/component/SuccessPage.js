/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

function SuccessPage() {
  const history = useHistory();
  const [showLink, setShowLink] = useState(true);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      history.push("/createProfile");
    }

    return () => {
      clearInterval(intervalId);    };
  }, [history, countdown]);

  return (
    <div className="conainer feature ct1">
      <div class="heading">
        <h1 className="secondary-heading">Payment Successful!</h1>
        <h3 className="font-only-heading">
          Your subscription has been updated. Thank you!
        </h3>
        <div class="separator"></div>
        {countdown > 0 ? (
          <p>Redirecting in {countdown}...</p>
        ) : (
          <p>Redirecting in </p>
        )}

        {showLink && (
          <p>
            Click <Link to="/createProfile">here</Link> if you are not
            redirected automatically.
          </p>
        )}
      </div>
    </div>
  );
}

export default SuccessPage;
