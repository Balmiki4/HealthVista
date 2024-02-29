import React, {useState} from 'react';
import './createProfile.css';


const ProfilePage = () => {
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

    return (
        <div className="profile-container">
        <h2 className="profile-heading">Create Profile</h2>
        <form className="profile-form">
            <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name:</label>
            <input
                type="text"
                id="firstName"
                className="form-input"
                value={formData.firstName}
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name:</label>
            <input
                type="text"
                id="lastName"
                className="form-input"
                value={formData.lastName}
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="gender" className="form-label">Gender:</label>
            <select id="gender" className="form-input" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
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
            </div>
            <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            <input
                type="tel"
                id="phoneNumber"
                className="form-input"
                value={formData.phoneNumber}
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="zipCode" className="form-label">Zip Code:</label>
            <input
                type="zip"
                id="zipCode"
                className="form-input"
                value={formData.zipCode}
                onChange={handleChange}
            />
            </div>
            <button type="submit" className="submit-button">Save Changes</button>
        </form>
        </div>
    );
};

export default ProfilePage;
