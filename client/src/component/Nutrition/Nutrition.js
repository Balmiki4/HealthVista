import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Nutrition.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Upgrade from "../payment Plan/upgrade.js"; // Import the Upgrade component
import { useHistory } from "react-router-dom";

const Nutrition = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [pastLogs, setPastLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDateFoods, setSelectedDateFoods] = useState([]);
  const user_id = sessionStorage.getItem("user_id");
  const access_token = sessionStorage.getItem("access_token");
  const userPlan = sessionStorage.getItem("user_plan");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // State to control the visibility of the upgrade modal
  const history = useHistory();

  useEffect(() => {
    fetchFoods();
    fetchPastLogs();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to midnight
    const timeUntilMidnight = midnight.getTime() - Date.now();
    setTimeout(moveToPastLog, timeUntilMidnight); // Move items at midnight

    if (!sessionStorage.getItem("user_id")) {
      history.push("/login");
    } else {
      if (userPlan !== "Pro tier") {
        setShowUpgradeModal(true);
      }
    }
  }, []);

  const fetchPastLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/past_foods", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Id": user_id,
        },
      });
      setPastLogs(response.data);
    } catch (error) {
      console.error("Error fetching past logs:", error);
    }
  };

  const moveToPastLog = async () => {
    try {
      await axios.post("http://localhost:5000/api/move_to_past_log", null, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Id": user_id,
        },
      });
      fetchFoods();
      fetchPastLogs();
    } catch (error) {
      console.error("Error moving food items to past log:", error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foods", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Id": user_id,
        },
      });
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      if (error.response && error.response.data.error) {
        if (
          error.response.data.error === "Missing user_id or access_token" ||
          error.response.data.error === "Invalid access token"
        ) {
          // Redirect to login page if there's an authentication issue
          window.location.href = "/login";
        }
      }
    }
  };

  const addFood = async (newFood) => {
    try {
      await axios.post("http://localhost:5000/api/foods", newFood, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Id": user_id,
        },
      });
      fetchFoods();
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const removeFood = async (foodName) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${foodName}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Id": user_id,
        },
      });
      fetchFoods();
    } catch (error) {
      console.error("Error removing food:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/nutrition",
        { query: searchTerm },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "User-Id": user_id,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for foods:", error);
    }
  };

  const addNewFood = (food) => {
    addFood(food);
    setSearchTerm("");
    setSearchResults([]);
  };

  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  const handleDateClick = (date) => {
    // Find the past log entry corresponding to the selected date
    const selectedLog = pastLogs.find((log) => log.date === date);
    // Set the detailed food information for the selected date
    setSelectedDateFoods(selectedLog.foods);
    setSelectedDate(date);
    // Show the popup/modal
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Handle cancellation of the upgrade modal
  const handleUpgradeCancel = () => {
    setShowUpgradeModal(false);
  };

  // Calculate total nutrient values
  const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);
  const totalProtein = foods.reduce((acc, food) => acc + food.protein_g, 0);
  const totalCarbs = foods.reduce(
    (acc, food) => acc + food.carbohydrates_total_g,
    0
  );
  const totalFat = foods.reduce((acc, food) => acc + food.fat_total_g, 0);
  const totalSugar = foods.reduce((acc, food) => acc + food.sugar_g, 0);

  return (
    <div className="Nutritioncontainer ">
      {showUpgradeModal ? (
        <Upgrade onCancel={handleUpgradeCancel} />
      ) : (
        <div>
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
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {food.name}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFood(food.name)}
                      >
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
                    <button
                      className="btn btn-success mt-2"
                      onClick={handleSearch}
                    >
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
                          style={{ cursor: "pointer" }}
                        >
                          {food.name}
                          <span className="badge bg-success rounded-pill ">
                            {food.calories} cal
                          </span>
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
                  <button
                    className="btn btn-success btn-sm"
                    onClick={toggleLogs}
                  >
                    {showLogs ? "Hide" : "Show"}
                  </button>
                </div>
                {showLogs && (
                  <div className="card-body">
                    {/* Render past logs from MongoDB here */}
                    {pastLogs.map((log, index) => (
                      <div key={index} className="log-row">
                        <button
                          className="btn btn-outline-success m-2"
                          onClick={() => handleDateClick(log.date)}
                        >
                          {log.date}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {showPopup && (
                  <Modal show={showPopup} onHide={handleClosePopup} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h4 className="secondary-heading m-0">
                          Detailed Food for {selectedDate}
                        </h4>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <h4 className="secondary-heading">Food Items:</h4>
                      </div>
                      <ul className="list-group list-group-flush">
                        {selectedDateFoods.map((food, index) => (
                          <li key={index} className="list-group-item">
                            <strong>{food.name}</strong> -{" "}
                            {food.calories.toFixed(1)} cal -{" "}
                            {(food.protein_g || 0).toFixed(1)}g protein -{" "}
                            {(food.carbohydrates_total_g || 0).toFixed(1)}g
                            carbs - {(food.sugar_g || 0).toFixed(1)}g sugar
                          </li>
                        ))}
                      </ul>
                      <div>
                        <h4 className="secondary-heading mt-4">
                          Total Nutrients for the Day:
                        </h4>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Total Calories:{" "}
                            {selectedDateFoods
                              .reduce(
                                (acc, food) => acc + (food.calories || 0),
                                0
                              )
                              .toFixed(2)}
                          </li>
                          <li className="list-group-item">
                            Total Protein:{" "}
                            {selectedDateFoods
                              .reduce(
                                (acc, food) => acc + (food.protein_g || 0),
                                0
                              )
                              .toFixed(2)}{" "}
                            g
                          </li>
                          <li className="list-group-item">
                            Total Carbs:{" "}
                            {selectedDateFoods
                              .reduce(
                                (acc, food) =>
                                  acc + (food.carbohydrates_total_g || 0),
                                0
                              )
                              .toFixed(2)}{" "}
                            g
                          </li>
                          <li className="list-group-item">
                            Total Sugar:{" "}
                            {selectedDateFoods
                              .reduce(
                                (acc, food) => acc + (food.sugar_g || 0),
                                0
                              )
                              .toFixed(2)}{" "}
                            g
                          </li>
                        </ul>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" onClick={handleClosePopup}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div> // Added closing parenthesis for the inner div
      )}
    </div>
  );
};

export default Nutrition;
