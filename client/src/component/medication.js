import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { gapi } from 'gapi-script';
import "./medication.css";

const MedicationTracker = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ summary: '', start: '', end: '' });
  const apiKey = '';
  const clientId = '';
  const calendarId = '';
  const scope = 'https://www.googleapis.com/auth/calendar';

//   const initClient = async () => {
//     await gapi.client.init({ apiKey, clientId, scope });
//     const isSignedIn = await gapi.auth2.getAuthInstance().isSignedIn.get();
//     if (isSignedIn) {
//       loadEvents();
//     }
//   };

//   const loadEvents = async () => {
//     const response = await gapi.client.calendar.events.list({ calendarId });
//     setEvents(response.result.items);
//   };

  const handleAddEvent = async () => {
    // const event = {
    //   summary: newEvent.summary,
    //   start: { dateTime: newEvent.start },
    //   end: { dateTime: newEvent.end },
    // };
    // await gapi.client.calendar.events.insert({ calendarId, resource: event });
    // setNewEvent({ summary: '', start: '', end: '' });
    // loadEvents();
  };

  useEffect(() => {
    // gapi.load('client:auth2', initClient);
  }, []);


  const [medicine, setMedicine] = useState({ name: '', dosage: '', frequency: '', instructions: '' });
  const handleChange = (e) => {
    const {id, value} = e.target;
    setMedicine({...medicine, [id]: value});
  };

  const [errors,setErrors] = useState({})
  const handleAddMedicine = async (e) => {
    const customerId = localStorage.getItem('customerId');
    e.preventDefault();
    if(Object.keys(errors).length === 0){
      const response = await fetch('http://localhost:5000/medication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...medicine, customerId }),
            });
    if(response.ok){
      const responseData = await response.json();
      console.log('Medicine successfully added!');
      setMedicine({ name: '', dosage: '', frequency: '', instructions: '' });
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
          id="medicationName"
          placeholder="Medication Name"
          // value={newEvent.summary}
          value={medicine.medicationName}
          onChange={(e) => setNewEvent({...newEvent, summary: e.target.value })}
        />

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
          Save Medicine Details To Database
        </button>

        <label >Enter Start Date & Time</label>
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({...newEvent, start: e.target.value })}
        />
        <label >Enter End Date & Time</label>
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({...newEvent, end: e.target.value })}
        />
        <button onClick={handleAddEvent}>
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