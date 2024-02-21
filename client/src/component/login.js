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
  };
  return (
    <div className="container">
      <div className="login-form">
        <h1>login Page</h1>
        <form></form>
      </div>
    </div>
  );
};

export default login;
