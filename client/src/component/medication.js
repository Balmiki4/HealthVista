import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { gapi } from 'gapi-script';
import { useHistory } from "react-router-dom";
import "./medication.css";

const MedicationTracker = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const history = useHistory();
  const [newEvent, setNewEvent] = useState({ summary: '', date: '', time: '' });
  const apiKey = '';
  const clientId = '';
  const calendarId = '';
  const scope = 'https://www.googleapis.com/auth/calendar';
  const access_token = sessionStorage.getItem('access_token');
  const user_id = sessionStorage.getItem('user_id')

  useEffect(() => {
    if (!sessionStorage.getItem('user_id') ) {
      history.push("/login");
    }
  }, [history]);

  const [medicine, setMedicine] = useState({ name: '', dosage: '', frequency: '', instructions: '' });
  const handleChange = (e) => {
    const {id, value} = e.target;
    setMedicine({...medicine, [id]: value});
  };
  const [errors,setErrors] = useState({})
  const handleAddMedicine = async (e) => {
    console.log(user_id)
    const medicationData = {
      name: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      instructions: medicine.instructions
    };
    e.preventDefault();
    const errors = {};
    if (!medicine.name) {
      errors.name = 'Medicine name is required';
    }
    if(Object.keys(errors).length === 0){
      const response = await fetch('http://localhost:5000/medication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                    'Userid': user_id,
                },
                body: JSON.stringify({medications: medicationData }),
            });
    if(response.ok){
      const responseData = await response.json();
      console.log('Medicine successfully added!');
      setMedicine({ name: '', dosage: '', frequency: '', instructions: '' });
      const customerId = responseData.customerId;
      setErrors({});
    }else{
      console.log("Error adding medicine");
    }
    }else{
      setErrors(errors);
    }
  };

  return (
    <div className="medication-tracker">
      <div className="form">
      <h2>💊Medication Tracker💊</h2>
        <label >Enter Medicine Name</label>
        <input
          type="text"
          id="name"
          placeholder="Medication Name"
          // value={newEvent.summary}
          value={medicine.name}
          onChange={handleChange}
          //onChange={(e) => setNewEvent({...newEvent, summary: e.target.value })}
        />
        {errors.name && <div className="error-medic">{errors.name}</div>}

        <label >Enter Dosage</label>
        <input
          id = "dosage"
          type="number"
          min={0}
          placeholder="Dosage"
          value={medicine.dosage}
          onChange={handleChange}
        />

        <label >Enter Frequency</label>
        <input
          id = "frequency"
          type="number"
          min={0}
          placeholder="Frequency"
          value={medicine.frequency}
          onChange={handleChange}
        />

        <textarea
          id="instructions"
          placeholder="Any instructions you want to add"
          value={medicine.instructions}
          onChange={handleChange}
        />
        <button onClick={handleAddMedicine}>
          Save My Medicine
        </button>

        <Link to="/medicationDetails">View My Medications</Link>

        <h2>Set Medication Reminder</h2>

        <label >Enter Date</label>
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({...newEvent, date: e.target.value })}
        />
        <label >Enter Time</label>
        <input
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({...newEvent, time: e.target.value })}
        />
        <button>
          Add Medication Reminder
        </button>
      </div>
      <div className="events">
        {events.map((event, index) => (
          <div className="event" key={index}>
            <p>
              {event.summary} - {event.start.dateTime} to {event.end.dateTime}
            </p>
          </div>
        ))}
      </div>
      <div className="calendar-container">
        <iframe src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=America%2FNew_York`} style={{border: 1}} width="600" height="400" frameborder="0" scrolling="no"></iframe>
      </div>
    </div>
  );
};

export default MedicationTracker;