import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './medicationDetails.css';

const MedicationDetails = () => {
  const [medications, setMedications] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const user_id = sessionStorage.getItem('user_id');
      if (!user_id) {
        setError('User_id not found in session storage');
        return;
      }

      const response = await axios.get('http://localhost:5000/medicine_details', {
        headers: {
          'UserId': user_id,
        },
      });

      if (response.status === 200) {
        setMedications(response.data);
        setUserName(response.data[0]?.user_name || '');
      } else {
        throw new Error('Failed to fetch medications');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/medications/${id}`);
  //     setMedications((prevMedications) => prevMedications.filter((medication) => medication.id !== id));
  //     console.log('Medication deleted successfully!');
  //   } catch (error) {
  //     console.error('Error deleting medication:', error);
  //   }
  // };

  return (
    <div className="medication-details">
      <h1>Showing Medications For {userName}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table className="medication-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage (in mg)</th>
              <th>Frequency (times)</th>
              <th>Instructions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <tr key={medication.id}>
                <td>{medication.name}</td>
                <td>{medication.dosage}</td>
                <td>{medication.frequency}</td>
                <td>{medication.instructions}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MedicationDetails;