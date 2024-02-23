import React from "react";
import "./signup.css";
const signup = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">SIGN UP</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src="" alt="" />
          <label htmlFor="username">USERNAME</label>
          <input type="text" placeholder="Enter your username here" />
        </div>
        <div className="input">
          <img src="" alt="" />
          <label htmlFor="username">EMAIL</label>
          <input type="email" placeholder="Enter a valid email" />
        </div>
        <div className="input">
          <img src="" alt="" />
          <label htmlFor="username">PASSWORD</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className="input">
          <img src="" alt="" />
          <label htmlFor="username">CONFIRM PASSWORD</label>
          <input type="password" placeholder="Enter your password again" />
        </div>
      </div>
      <div className="submitContainer">
        <div className="submit">SIGN UP</div>
        {/* <div className="submit">Go To Login</div> */}
      </div>
    </div>
  );
};

export default signup;
