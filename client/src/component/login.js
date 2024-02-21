import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../auth";
import { useHistory } from "react-router-dom";
import "./App.css";

const login = () => {
  const [formData, setData] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://localhost:3000/login", {
      method: "POST",
      headers: { "content-type": "application/JSON" },
      body: JSON.stringify(formData),
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
        <h1>Login Page</h1>
        <form>
          {" "}
          onSubmit = {handleSubmit}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username or email"
              value={formData.username}
              onChange={(e) =>
                setData({ ...formData, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) =>
                setData({ ...formData, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary"></Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default login;
