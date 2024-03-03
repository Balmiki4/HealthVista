import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./login.css";
import user_icon from "./img/person.png";
import password_icon from "./img/password.png";
import { Alert } from "react-bootstrap";

const LoginPage = () => {
  const [formData, setData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success"); // Default to success

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const displayAlert = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if username or password is empty
    const loginErrors = {};
    if (!formData.username) {
      loginErrors.username = "Username or email is required";
    }
    if (!formData.password) {
      loginErrors.password = "Password is required";
    }
    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      return;
    }

    // console.log("formData:", formData);
    // console.log("rememberMe:", rememberMe);
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        remember_me: rememberMe,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login successful");

      // Clear the form fields upon successful login
      setData({ username: "", password: "" });

      // Show success alert
      displayAlert("success", "Login successful");
    } else if (response.status === 401) {
      console.log("Invalid username or password");

      // Reset the form fields
      setData({ username: "", password: "" });
      displayAlert("danger", "Login failed. Invalid username or password");
    } else {
      console.log("Login failed", data.error());
      setData({ username: "", password: "" });
      displayAlert("danger", "Login failed. Invalid username or password");
    }
  };
  return (
    <div className="container ct">
      <div className="login-form">
        <div className="text">
          <h1 className="font-only-heading">Welcome back.</h1>
        </div>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <label htmlFor="username">
                <img src={user_icon} alt="user name" />
              </label>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Username or Email"
                  value={formData.username}
                  onChange={(e) => {
                    setData({ ...formData, username: e.target.value });
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
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    setData({ ...formData, password: e.target.value });
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
          <div className="login-button submitContainer">
            <Form.Group>
              <Button
                type="submit"
                variant="btn btn-outline-light"
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
              label="Remember me &nbsp; &nbsp;"
              onChange={() => setRememberMe(!rememberMe)} //change the checkbox to true
              checked={rememberMe}
            />
          </Form.Group>
          <Link
            className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
            to="/forgot"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="signup-link">
          <span>Don't have an account?&nbsp; &nbsp; </span>
          <Link
            className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
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
