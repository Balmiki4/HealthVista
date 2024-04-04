import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { gapi } from 'gapi-script';
import "./medication.css";

const MedicationTracker = () => {
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

  return (
    <div className="medication-tracker">
      <div className="form">
      <h2>Medication Tracker</h2>
        <label >Enter Medicine Name</label>
        <input
          type="text"
          placeholder="Medication Name"
          value={newEvent.summary}
          onChange={(e) => setNewEvent({...newEvent, summary: e.target.value })}
        />
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
          Add Medication
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