import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ForgotPassword = ({ onForgotPassword, onResetPassword }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestToken = async () => {
    onForgotPassword({ username });
    setStep(2);
  };

  const handleResetPassword = async () => {
    onResetPassword({ username, token, newPassword });
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
          <p>{message}</p>
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
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
