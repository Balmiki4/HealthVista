import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const LoginPage = () => {
  const [formData, setData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const displayAlert = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPassword = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/forgot-password/request-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setStatusMessage(responseData.message);
      } else {
        setStatusMessage(responseData.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleResetPassword = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/forgot-password/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            token: data.token,
            new_password: data.newPassword,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setStatusMessage(responseData.message);
      } else {
        setStatusMessage(responseData.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        {/* ... (existing code) */}

        <div className="remember-forgot">
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Remember me"
              onChange={() => setRememberMe(!rememberMe)}
              checked={rememberMe}
            />
          </Form.Group>
          <Link to="/forgot" onClick={handleForgotPasswordClick}>
            Forgot Password?
          </Link>
        </div>
        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>

      {/* Forgot Password Form */}
      {showForgotPassword && (
        <ForgotPasswordForm
          onForgotPassword={handleForgotPassword}
          onResetPassword={handleResetPassword}
        />
      )}

      {/* Alert */}
      <Alert
        variant={alertVariant}
        show={showAlert}
        onClose={handleAlertClose}
        dismissible
      >
        {alertMessage}
      </Alert>
    </div>
  );
};

export default LoginPage;
