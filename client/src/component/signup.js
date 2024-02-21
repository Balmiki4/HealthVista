import React from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import user_icon from './img/person.png';
import email_icon from './img/email.png';
import password_icon from './img/password.png';
const signup=()=>{
    return(
        <div className='container'>
            <div className="header">
                <div className='text'>
                    SIGN UP
                </div>
                <div className='underline'></div>
            </div>
                <div className="inputs">
                    <div className='input'>
                        <label htmlFor="username"><img src={user_icon} alt="user name" /></label>
                        <input type = "text" id="username" placeholder='Enter your username here' />
                    </div>
                    <div className='input'>
                        <label htmlFor="email"><img src={email_icon} alt="email id" /></label>
                        <input type = "email" id="email" placeholder='Enter a valid email'/>
                    </div>
                    <div className='input'>
                        <label htmlFor="password"><img src={password_icon} alt="password" /></label>
                        <input type = "password" id="password" placeholder='Enter your password' />
                    </div>
                    <div className='input'>
                        <label htmlFor="confirmpassword"><img src={password_icon} alt="password" /></label>
                        <input type = "password" id="confirmpassword" placeholder='Confirm your password' />
                    </div>
            </div>
            <div className="submitContainer">
                <div className="submit">SIGN UP</div>
            </div>
            <div className="login">Already a user? <span> <Link to="/login">Click here to login</Link></span></div>
        </div>
    )
}





export default signup;