import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import user_icon from "./img/person.png";
import password_icon from "./img/password.png";
import "./forgot.css";

const ForgotPassword = ({ onForgotPassword, onResetPassword }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRequestToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/forgot-password/request-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message);
        setErrorMessage("");
        setStep(2);
      } else {
        setErrorMessage(responseData.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/forgot-password/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            token: token,
            new_password: newPassword,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message);
        setErrorMessage("");
        // Redirect to the login page after a successful password reset
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage(responseData.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container">
      {/* First page of forgot password */}
      {step === 1 && (
        <div>
          <h1>Step 1: Request Token</h1>
          <Form className="forgot-form">
            <div className="inputs">
              <div className="input">
                <label htmlFor="username">
                  <img src={user_icon} alt="user name" />
                </label>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </div>
            </div>
            <Button
              variant="primary"
              className="reset-button"
              onClick={handleRequestToken}
            >
              Request Token
            </Button>
          </Form>
          <Alert variant="success" show={successMessage !== ""}>
            {successMessage}
          </Alert>
        </div>
      )}
      {/* Second page of forgot password */}
      {step === 2 && (
        <div>
          <h1>Step 2: Reset Password</h1>
          <Form className="forgot-form">
            <div className="inputs">
              <div className="input">
                <label htmlFor="token">
                  <img src={password_icon} alt="token" />
                </label>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="token"
                    placeholder="Enter the token you received"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </Form.Group>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </div>
              <div className="input">
                <label htmlFor="newPassword">
                  <img src={password_icon} alt="new password" />
                </label>
                <Form.Group>
                  <Form.Control
                    type="password"
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </div>
            </div>
            <Button
              variant="primary"
              className="reset-button"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </Form>
          <Alert variant="success" show={successMessage !== ""}>
            {successMessage}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
