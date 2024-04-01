import React, { useState } from 'react';
import './insurancepage.css';


const InsurancePage = () => {
  const [Gender, setGender] = useState('');
  const [Age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [income, setIncome] = useState('');
  const [year, setYear] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [incomeError, setIncomeError] = useState(null);
  const [ageError, setAgeError] = useState(null);
  const [zipCodeError, setZipCodeError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation checks
      if (!income || !Age || !zipCode || !year|| !city || !state) {
        throw new Error('Please fill in all required fields');
      }
      if (isNaN(parseInt(income))) {
        setIncomeError('Income must be valid ');
        return;
      }
      if (isNaN(parseInt(Age))) {
        setAgeError('Age must be valid');
        return;
      }
      if (isNaN(parseInt(zipCode))) {
        setZipCodeError('Zip code must be valid');
        return;
      }
      if (isNaN(parseInt(year))) {
        setYearError('Year must be valid');
        return;
      } 
      const response = await fetch('/get_recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income: parseFloat(income), 
          age: parseInt(Age), 
          gender: Gender,
          city: city,
          state: state,
          zipCode: zipCode,
          year: year
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Set error state to display validation error
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        <h1>Insurance Recommendation</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Income:
            <br />
            <input
              type="text"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
                setIncomeError(null); // Clear error when input changes
              }}
            />
            {incomeError && <span className="error">{incomeError}</span>} 
          </label>
          <br />
          <label>
            Age:
            <br />
            <input
              type="text"
              value={Age}
              onChange={(e) => {
                setAge(e.target.value);
                setAgeError(null); // Clear error when input changes
              }}
            />
            {ageError && <span className="error">{ageError}</span>} 
          </label>
          <br />
          <label>
            Gender:
            <br />
            <input
              type="radio"
              name="gender"
              value="male"
              checked={Gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
            />{' '}
            Male
            <br />
            <input
              type="radio"
              name="gender"
              value="female"
              checked={Gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
            />{' '}
            Female
          </label>
          <br />
          <label>
            City:
            <br />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <br />
          <label>
            State:
            <br />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <br />
          <label>
            ZipCode:
            <br />
            <input
              type="text"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                setZipCodeError(null); // Clear error when input changes
              }}
            />
            {zipCodeError && <span className="error">{zipCodeError}</span>} 
          </label>
          <br />
          <label>
            Year:
            <br />
            <input
              type="text"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setYearError(null); // Clear error when input changes
              }}
            />
            {yearError && <span className="error">{yearError}</span>} 
          </label>
          <br />
          <button type="submit">Get Recommendations</button>
        </form>
        {error && <p className="error">{error}</p>} 
      </div>
    </div>
  );
};

export default InsurancePage;
