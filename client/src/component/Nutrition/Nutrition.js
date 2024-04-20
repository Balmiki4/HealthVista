import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Nutrition.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Upgrade from "../upgrade.js"; // Import the Upgrade component
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
    midnight.setHours(17, 56, 0, 0); // Set time to midnight
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

  return (
    <div className="Nutritioncontainer ">
      {showUpgradeModal ? (
        <Upgrade onCancel={handleUpgradeCancel} />
      ) : (
        <div>{/* Your existing JSX for the nutrition tracker */}</div>
      )}
    </div>
  );
};

export default Nutrition;
