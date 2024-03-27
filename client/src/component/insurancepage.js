import React, { useState } from 'react';

const InsurancePage = () => {
 const [premium, setPremium] = useState('');
 const [coverage, setCoverage] = useState('');
 const [doctor, setDoctor] = useState('');
 const [city, setCity] = useState('');
 const [state, setState] = useState('');
 const [zipCode, setzipCode] = useState('');
 const [hospital, setHospital] = useState('');
 const [recommendations, setRecommendations] = useState([]);

 const handleSubmit = async (e) => {
    e.preventDefault();
 
 
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ premium, coverage, doctor, city,state,zipCode, hospital }),
      });
 
 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
 
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <h1>Insurance Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Premium:
          <input type="text" value={premium} onChange={(e) => setPremium(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Coverage:
          <input type="text" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Doctor:
          <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Hospital:
          <input type="text" value={hospital} onChange={(e) => setHospital(e.target.value)} />
        </label>
        <br />
        <br />
        
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          State:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          zipCode:
          <input type="text" value={zipCode} onChange={(e) => setzipCode(e.target.value)} />
        </label>
        <br />
        <br />

        <button type="submit">Get Recommendations</button>
      </form>
      <h2>Recommendations:</h2>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>
            <strong>Policy:</strong> {recommendation.policy}, <strong>Premium:</strong> {recommendation.premium}, <strong>Coverage:</strong> {recommendation.coverage}
          </li>
        ))}
      </ul>
    </div>
  );
 };
 
 
 export default InsurancePage;
 
 
