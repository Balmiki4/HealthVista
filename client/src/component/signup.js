import React, {useState} from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import user_icon from './img/person.png';
import email_icon from './img/email.png';
import password_icon from './img/password.png';
const Signup=()=>{
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }else if (!/^[a-zA-Z]/.test(formData.username)) {
      errors.username = 'Username must start with a letter';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email you entered is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password entered must be at least 6 characters long';
    }
    else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one letter and one number';
    }

    if (formData.password !== formData.confirmpassword) {
      errors.confirmpassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('User registered successfully!');
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
          }
          );

          const customerId = responseData.customerId;
          history.push(`/PaymentPlan?customerId=${encodeURIComponent(customerId)}`);

        } else {
          const responseData = await response.json();
          console.error('Error:', responseData.error);
          alert(responseData.error);
          setErrors({ backend: responseData.error });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ backend: 'An error occurred. Please try again later.' });
      }
    } else {
      setErrors(errors);
    }
  };


    return(
        <div className='container'>
            <div className="header">
                <div className='text'>
                <h1 className='font-only-heading'>REGISTER</h1>
                </div>
                <div className='underline'></div>
            </div>
                <div className="inputs">
                    <div className='input'>
                        <label htmlFor="username"><img src={user_icon} alt="user name" /></label>
                        <input type = "text" id="username" placeholder='Enter your username here' value={formData.username} onChange={handleChange}/>
                        {errors.username && <div className='error'>{errors.username}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor="email"><img src={email_icon} alt="email id" /></label>
                        <input type = "email" id="email" placeholder='Enter a valid email' value={formData.email} onChange={handleChange}/>
                        {errors.email && <div className='error'>{errors.email}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor="password"><img src={password_icon} alt="password" /></label>
                        <input type = "password" id="password" placeholder='Enter your password' value={formData.password} onChange={handleChange}/>
                        {errors.password && <div className='error'>{errors.password}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor="confirmpassword"><img src={password_icon} alt="password" /></label>
                        <input type = "password" id="confirmpassword" placeholder='Confirm your password' value={formData.confirmpassword} onChange={handleChange}/>
                        {errors.confirmpassword && <div className='error'>{errors.confirmpassword}</div>}
                    </div>
            </div>
            <div className="submitContainer">
                <button className="btn btn-outline-light" onClick={handleSubmit}>SIGN UP</button>
            </div>
            <div className="login">Already a user? {' '}<span>{' '} <Link className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" to="/login">Click here to login</Link></span></div>
        </div>
    )
}





export default Signup;
