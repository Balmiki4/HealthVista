import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const ForgotPassword = ({ onForgotPassword, onResetPassword }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
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
        // Redirect to the login page after successful password reset
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000); // Redirect after 3 seconds (adjust as needed)
      } else {
        setErrorMessage(responseData.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1>Step 1: Request Token</h1>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleRequestToken}>
              Request Token
            </Button>
          </Form>
          <Alert variant="success" show={successMessage !== ""}>
            {successMessage}
          </Alert>
          <Alert variant="danger" show={errorMessage !== ""}>
            {errorMessage}
          </Alert>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1>Step 2: Reset Password</h1>
          <Form>
            <Form.Group controlId="token">
              <Form.Label>Token:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the token you received"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </Form>
          <Alert variant="success" show={successMessage !== ""}>
            {successMessage}
          </Alert>
          <Alert variant="danger" show={errorMessage !== ""}>
            {errorMessage}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
