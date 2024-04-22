import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./medication.css";
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const MedicationTracker = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const history = useHistory();
  const access_token = sessionStorage.getItem('access_token');
  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    if (!sessionStorage.getItem('user_id')) {
      history.push("/login");
    } else {
      fetchMedicineData();
    }
  }, [history]);

  const fetchMedicineData = async () => {
    const response = await fetch('http://localhost:5000/medicine', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'Userid': user_id,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const medicines = data.medicineData.map((medicine) => ({
        id: medicine._id,
        summary: `Take ${medicine.name}`,
        date: new Date(medicine.date),
        time: medicine.time,
        days: medicine.days,
        repeat: medicine.repeat,
      }));
      setEvents(medicines);
    } else {
      console.log('Error fetching medicine data');
    }
  };

  const [medicine, setMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
    date: '',
    time: '',
    days: [],
    repeat: false,
  });

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'days') {
      if (checked) {
        setMedicine({ ...medicine, days: [...medicine.days, value] });
      } else {
        setMedicine({ ...medicine, days: medicine.days.filter((day) => day !== value) });
      }
    } else {
      setMedicine({ ...medicine, [id]: value });
    }
  };

  const [errors, setErrors] = useState({});
  const handleAddMedicine = async (e) => {
    console.log(user_id);
    const medicationData = {
      name: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      instructions: medicine.instructions,
      date: medicine.date,
      time: medicine.time,
      days: medicine.days,
      repeat: medicine.repeat,
    };
    e.preventDefault();
    const errors = {};
    if (!medicine.name) {
      errors.name = 'Medicine name is required';
    }
    if (Object.keys(errors).length === 0) {
      const response = await fetch('http://localhost:5000/medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
          'Userid': user_id,
        },
        body: JSON.stringify({
          medications: medicationData,
          date: medicine.date,
          time: medicine.time,
          days: medicine.days,
          repeat: medicine.repeat,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Medicine successfully added!');
        setMedicine({
          name: '',
          dosage: '',
          frequency: '',
          instructions: '',
          date: '',
          time: '',
          days: [],
          repeat: false,
        });
        const customerId = responseData.customerId;
        setErrors({});
        fetchMedicineData(); 
      } else {
        console.log("Error adding medicine");
      }
    } else {
      setErrors(errors);
    }
  };

  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="medication-tracker">
      <div className="form">
        <h2>Medication Tracker</h2>
        <label htmlFor='name'>Enter Medicine Name</label>
        <input
          type="text"
          id="name"
          placeholder="Medication Name"
          value={medicine.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error-medic">{errors.name}</div>}

        <label htmlFor='dosage'>Enter Dosage</label>
        <input
          id="dosage"
          type="number"
          min={0}
          placeholder="Dosage in mg"
          value={medicine.dosage}
          onChange={handleChange}
        />

        <label htmlFor='frequency'>Enter Frequency</label>
        <input
          id="frequency"
          type="number"
          min={0}
          placeholder="how many times a day"
          value={medicine.frequency}
          onChange={handleChange}
        />

        <textarea
          id="instructions"
          placeholder="Any instructions you want to add"
          value={medicine.instructions}
          onChange={handleChange}
        />

        <label htmlFor='date'>Enter Date</label>
        <input
          type="date"
          id="date"
          value={medicine.date}
          onChange={handleChange}
        />

        <label htmlFor='time'>Enter Time</label>
        <input
          type="time"
          id="time"
          value={medicine.time}
          onChange={handleChange}
        />

        <label>Select Days (if date not selected)</label>
        <div>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Sunday"
              checked={medicine.days.includes('Sunday')}
              onChange={handleChange}
            />
            Sun
          </label>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Monday"
              checked={medicine.days.includes('Monday')}
              onChange={handleChange}
            />
            Mon
          </label>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Tuesday"
              checked={medicine.days.includes('Tuesday')}
              onChange={handleChange}
            />
            Tue
          </label>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Wednesday"
              checked={medicine.days.includes('Wednesday')}
              onChange={handleChange}
            />
            Wed
          </label>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Thursday"
              checked={medicine.days.includes('Thursday')}
              onChange={handleChange}
            />
            Thu
          </label>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Friday"
              checked={medicine.days.includes('Friday')}
              onChange={handleChange}
            />
            Fri
          </label>
          <label>
            <input
              type="checkbox"
              id="days"
              value="Saturday"
              checked={medicine.days.includes('Saturday')}
              onChange={handleChange}
            />
            Sat
          </label>
        </div>

        <label>
          <input
            type="checkbox"
            id="repeat"
            checked={medicine.repeat}
            onChange={(e) => setMedicine({ ...medicine, repeat: e.target.checked })}
          />
          Take this medicine every day
        </label>

        <button onClick={handleAddMedicine}>
          Add Medicine
        </button>

        <Link to="/medicationDetails" className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">View My Medications</Link>
      </div>

      <div className="calendar-container">
      <Calendar
    onChange={onChange}
    value={date}
    tileContent={({ date, view }) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const weekDay = date.toLocaleDateString('en-US', { weekday: 'long' });

      return view === 'month' && (
        <div>
          {events
            .filter((event) => {
              // Convert event date to local timezone
              const eventDate = new Date(event.date);
              const eventLocalDate = new Date(
                eventDate.getUTCFullYear(),
                eventDate.getUTCMonth(),
                eventDate.getUTCDate()
              );

              // Check if event occurs on the selected day or if it repeats weekly
              const repeatsWeekly = event.repeat || (event.days && event.days.length > 0);
              const occursOnSelectedDay = repeatsWeekly ? true : (eventLocalDate.getFullYear() === year && eventLocalDate.getMonth() === month && eventLocalDate.getDate() === day);

              return occursOnSelectedDay;
            })
            .map((event, index) => (
              <div key={index} className="reminder-info">
                <div className="reminder-title">{event.time}: {event.summary}</div>
              </div>
            ))}
        </div>
      );
    }}
    className="custom-calendar"
  />
  </div>
</div>
  );
};

export default MedicationTracker;