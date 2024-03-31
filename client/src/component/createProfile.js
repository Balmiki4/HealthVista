import React, {useState} from 'react';
import './createProfile.css';
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const customerId = searchParams.get("customerId");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        phoneNumber:'',
        zipCode:'',
    });

    const handleChange = (e) => {
        const {id, value} = e.target
        setFormData({ ...formData, [id]: value });
    };

    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Client-side validation
        const errors = {};
        if (!formData.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
        } 
        
        if (!formData.gender) {
            errors.gender = 'Gender is required';
        } 

        if (!formData.dob) {
            errors.dob = 'Date of Birth is required';
        } 

        if (!formData.gender) {
            errors.zipCode = 'Zip code is required';
        } 
    
        if (Object.keys(errors).length === 0) {
            // Send a POST request to the server with the form data and customerId
            const response = await fetch('http://localhost:5000/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...formData, customerId }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Profile successfully created!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    dob: '',
                    phoneNumber:'',
                    zipCode: '',
                });
                const customerId = responseData.customerId;
                setErrors({});
            } else {
                console.log('Error creating profile');
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className="profile-container">
        <h2 className="font-only-heading">Create Profile</h2>
        <div className="underline"></div>
        <form className="profile-form">
            <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name:</label>
            <input
                type="text"
                id="firstName"
                className="form-input"
                placeholder='Enter your First name here'
                value={formData.firstName}
                onChange={handleChange}
            />
            {errors.firstName && <div className='error'>{errors.firstName}</div>}
            </div>
            <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name:</label>
            <input
                type="text"
                id="lastName"
                className="form-input"
                placeholder='Enter your Last name here'
                value={formData.lastName}
                onChange={handleChange}
            />
            {errors.lastName && <div className='error'>{errors.lastName}</div>}
            </div>
            <div className="form-group">
            <label htmlFor="gender" className="form-label">Gender:</label>
            <select id="gender" className="form-input " value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.gender && <div className='error'>{errors.gender}</div>}
            </div>
            <div className="form-group">
            <label htmlFor="dob" className="form-label">Date of Birth:</label>
            <input
                type="date"
                id="dob"
                className="form-input"
                value={formData.dob}
                onChange={handleChange}
            />
            {errors.dob && <div className='error'>{errors.dob}</div>}
            </div>
            <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            <input
                type="tel"
                id="phoneNumber"
                className="form-input"
                placeholder='Enter your phone number here'
                value={formData.phoneNumber}
                onChange={handleChange}
            />
            {errors.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
            </div>
            <div className="form-group">
            <label htmlFor="zipCode" className="form-label">Zip Code:</label>
            <input
                type="text"
                id="zipCode"
                className="form-input"
                placeholder='Enter your zip code name here'
                value={formData.zipCode}
                onChange={handleChange}
            />
            {errors.zipCode && <div className='error'>{errors.zipCode}</div>}
            </div>
            <div className="profile-btn">
            <button type="submit" className="btn btn-outline-light" onClick={handleSubmit}>Save Changes</button>
            </div>
        </form>
        </div>
    );
};

export default ProfilePage;
