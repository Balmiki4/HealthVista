import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import ForgotPassword from "./forgot";
import user_icon from "./img/person.png";
import password_icon from "./img/password.png";
import "./login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          rememberMe: rememberMe,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        displayAlert("success", responseData.message || "Login successful");
      } else {
        setErrors(responseData.errors || {});
        displayAlert("danger", responseData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      displayAlert("danger", "An error occurred while processing your request");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          <h1>Welcome back.</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  setErrors({ ...errors, username: "" });
                }}
                isInvalid={!!errors.username}
              />
            </Form.Group>
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>
          <div className="input">
            <label htmlFor="password">
              <img src={password_icon} alt="password" />
            </label>
            <Form.Group>
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors({ ...errors, password: "" });
                }}
                isInvalid={!!errors.password}
              />
            </Form.Group>
            {errors.username && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
        </div>
        <div className="login-button">
          <Form.Group>
            <Button
              className="btn"
              type="submit"
              variant="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form.Group>
        </div>
      </form>

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

      {/* Forgot Password Form */}
      {showForgotPassword && (
        <ForgotPassword
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
