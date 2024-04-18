import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Nutrition.css";

const Nutrition = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const user_id = sessionStorage.getItem('user_id');
  const access_token = sessionStorage.getItem('access_token');

  useEffect(() => {
    fetchFoods();
  }, []);
  
  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/foods', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'User-Id': user_id
        }
      });
      setFoods(response.data);
      console.log("Foods:", response.data); // Add this line to log fetched foods
    } catch (error) {
      console.error('Error fetching foods:', error);
      if (error.response && error.response.data.error) {
        if (error.response.data.error === 'Missing user_id or access_token' || error.response.data.error === 'Invalid access token') {
          // Redirect to login page if there's an authentication issue
          window.location.href = '/login';
        }
      }
    }
  };
  
  const addFood = async (newFood) => {
    try {
      await axios.post('http://localhost:5000/api/foods', newFood, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'User-Id': user_id
        }
      });
      fetchFoods();
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };
  const removeFood = async (foodName) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${foodName}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'User-Id': user_id
        }
      });
      fetchFoods();
    } catch (error) {
      console.error('Error removing food:', error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/nutrition', { query: searchTerm }, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'User-Id': user_id
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for foods:', error);
    }
  };
  const addNewFood = (food) => {
    addFood(food);
    setSearchTerm('');
    setSearchResults([]);
  };
  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };
{/* Nutrition Analysis */}
  const totalCalories = foods.reduce((acc, food) => acc + (food.calories || 0), 0);
  const totalProtein = foods.reduce((acc, food) => acc + (food.protein_g || 0), 0);
  const totalCarbs = foods.reduce((acc, food) => acc + (food.carbohydrates_total_g || 0), 0);
  const totalFat = foods.reduce((acc, food) => acc + (food.fat_total_g || 0), 0);
  const totalSugar = foods.reduce((acc, food) => acc + (food.sugar_g || 0), 0);

  return (
    <div className="Nutritioncontainer ">
      <div className="header">
        <div className="text">
          <h1 className="font-only-heading">Nutrition Tracker</h1>
        </div>
        <div className="underline"></div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header">Today's Food Log</div>
            <ul className="list-group list-group-flush">
              {foods.map((food, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {food.name}
                  <button className="btn btn-danger btn-sm" onClick={() => removeFood(food.name)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header">Add Food</div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a food..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-success mt-2" onClick={handleSearch}>
                  Search
                </button>
              </div>
              {searchResults.length > 0 && (
                <ul className="list-group">
                  {searchResults.map((food, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                      onClick={() => addNewFood(food)}
                      style={{ cursor: 'pointer' }}
                    >
                      {food.name}
                      <span className="badge bg-success rounded-pill ">{food.calories} cal</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header">Nutrition Analysis</div>
            <div className="card-body">
              <p>Total Calories: {totalCalories.toFixed(2)}</p>
              <p>Total Protein: {totalProtein.toFixed(2)}</p>
              <p>Total Carbs: {totalCarbs.toFixed(2)}</p>  
              <p>Total Fat: {totalFat.toFixed(2)}</p>
              <p>Total Sugar: {totalSugar.toFixed(2)}</p>

            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header d-flex justify-content-between align-items-center">
              Past Logs
              <button className="btn btn-success btn-sm" onClick={toggleLogs}>
                {showLogs ? 'Hide' : 'Show'}
              </button>
            </div>
            {showLogs && (
              <div className="card-body">
                {/* Render past logs from MongoDB here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
