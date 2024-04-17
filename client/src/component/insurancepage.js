import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./insurancepage.css";
import age_icon from "./img/icons/age.png";
import gender_icon from "./img/icons/gender.png";
import zipCode_icon from "./img/icons/mail.png";
import income_icon from "./img/icons/dollar.png";
import city_icon from "./img/icons/city.png";
import state_icon from "./img/icons/state.png";
import year_icon from "./img/icons/calendar.png";
import PlanDetails from './PlanDetails';

const statesList = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
  "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const InsurancePage = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [income, setIncome] = useState("");
  const [year, setYear] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [incomeError, setIncomeError] = useState(null);
  const [ageError, setAgeError] = useState(null);
  const [zipCodeError, setZipCodeError] = useState(null);
  const [yearError, setYearError] = useState(null);
  const [error, setError] = useState(null);
  const [planData, setPlanData] = useState(null);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      if (!income || !age || !zipCode || !year || !city || !state) {
        throw new Error("Please fill in all required fields");
      }
  
      // Validate input data
      if (isNaN(parseInt(income))) {
        setIncomeError("Income must be valid");
        return;
      }
      if (isNaN(parseInt(age))) {
        setAgeError("Age must be valid");
        return;
      }
      if (isNaN(parseInt(zipCode))) {
        setZipCodeError("Zip code must be valid");
        return;
      }
      if (isNaN(parseInt(year))) {
        setYearError("Year must be valid");
        return;
      }
  
      // Send form data to server
      const response = await fetch(
        "http://localhost:5000/get_recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            income: parseFloat(income),
            age: parseInt(age),
            gender,
            city,
            state,
            zipCode,
            year: parseInt(year),
          }),
        }
      );
  
      // Handle server response
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      if (response.ok) {
        // Set planData state with fetched data
        setPlanData(data.recommendations);
        setError(null);
        
        // Redirect to PlanDetails page and pass the planData
        history.push({
          pathname: "/PlanDetails",
          state: { planData: data.recommendations }
        });
      } else {
        setError(
          data.error ||
            "An error occurred while fetching insurance recommendations"
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          <h1 className="font-only-heading">Insurance Recommender</h1>
        </div>
        <div className="underline mb-0"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <label htmlFor="income">
            <img src={income_icon} alt="income" />
          </label>
          <input
            type="text"
            id="income"
            placeholder="Enter your income"
            value={income}
            onChange={(e) => {
              setIncome(e.target.value);
              setIncomeError(null);
            }}
          />
          {incomeError && <div className="error">{incomeError}</div>}
        </div>
        <div className="input">
          <label htmlFor="age">
            <img src={age_icon} alt="age" />
          </label>
          <input
            type="text"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setAgeError(null);
            }}
          />
          {ageError && <div className="error">{ageError}</div>}
        </div>
        <div className="input">
          <label htmlFor="gender">
            <img src={gender_icon} alt="gender" />
          </label>
          <select
            className="form-select form-select-sm w-75"
            aria-label="Default select example"
            style={{ backgroundColor: "#eaeaea", border: "none" }}
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="city">
            <img src={city_icon} alt="city" />
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="state">
            <img src={state_icon} alt="state" />
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select your state</option>
            {statesList.map((stateAbbr) => (
              <option key={stateAbbr} value={stateAbbr}>{stateAbbr}</option>
            ))}
          </select>
        </div>
        <div className="input">
          <label htmlFor="zipCode">
            <img src={zipCode_icon} alt="zip code" />
          </label>
          <input
            type="text"
            id="zipCode"
            placeholder="Enter your zip code"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
              setZipCodeError(null);
            }}
          />
          {zipCodeError && <div className="error">{zipCodeError}</div>}
        </div>
        <div className="input">
          <label htmlFor="year">
            <img src={year_icon} alt="year" />
          </label>
          <input
            type="text"
            id="year"
            placeholder="Enter the year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setYearError(null);
            }}
          />
          {yearError && <div className="error">{yearError}</div>}
        </div>
      </div>
      <div className="submitContainer">
        <button className="btn btn-outline-light" onClick={handleSubmit}>
          GET RECOMMENDATIONS
        </button>
      </div>
      {error && <p className="error text-center mt-0">{error}</p>}
    </div>
  );
};

export default InsurancePage;
