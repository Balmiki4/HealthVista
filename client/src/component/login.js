import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./login.css";
import user_icon from "./img/person.png";
import password_icon from "./img/password.png";

const LoginPage = () => {
  const [formData, setData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
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

    const response = await fetch("/login", {
      method: "POST",
      headers: { "content-type": "application/JSON" },
      body: JSON.stringify({ formData, remember_me: rememberMe }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log("Login successful");
    } else {
      console.log("Login failed", data.console.error());
    }
  };
  return (
    <div className="container">
      <div className="login-form">
        <div className="text">
          <h1>Welcome back.</h1>
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
                  isInvalid={!!errors.username}
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
                class="btn"
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
              onChange={() => setRememberMe(!rememberMe)} //change the checkbox to true
              checked={rememberMe}
            />
          </Form.Group>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
