import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./map.css";

const Map = () => {
  const [zipCode, setZipCode] = useState("");
  const [hospitals, setHospitals] = useState([]);
  let apiKey = "AIzaSyDmzZS6T8pgdF5jod7uARNGsVq1WP70fDA";
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = fetchNearbyHospitals;
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    // Clean up function to remove the script when the component unmounts
    return () => {
      const googleMapsScript = document.querySelector(
        'script[src^="https://maps.googleapis.com"]'
      );
      if (googleMapsScript) {
        googleMapsScript.remove();
      }
    };
  }, [apiKey]);

  const fetchNearbyHospitals = async () => {
    if (!zipCode) {
      alert("Please enter a ZIP code.");
      return;
    }

    try {
      // Fetch latitude and longitude coordinates for the provided zip code
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        alert("No results found for the provided ZIP code.");
        return;
      }

      const { lat, lng } = data.results[0].geometry.location;

      // Perform search for hospitals based on latitude and longitude coordinates
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        location: { lat, lng },
        radius: 5000, // Search radius in meters
        type: "hospital", // Search type
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Sort hospitals by distance from the entered ZIP code
          results.sort((a, b) => {
            return a.distance - b.distance;
          });
          setHospitals(results);
        }
      });
    } catch (error) {
      console.error("Error searching for hospitals:", error);
      alert(
        "An error occurred while searching for hospitals. Please try again later."
      );
    }
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSearch = async () => {
    await fetchNearbyHospitals();
  };

  return (
    <div className="map-container">
      <div className="search-container">
        <h2>Find hospitals near me</h2>
        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter ZIP code"
                value={zipCode}
                onChange={handleZipCodeChange}
              />
            </InputGroup>
          </Form.Group>
          <Button variant="success" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
      <div className="map-results">
        {/* Display the list of nearby hospitals */}
        <div className="hospital-list">
          <h3>Nearby Hospitals</h3>
          <ul>
            {hospitals.map((hospital, index) => (
              <li key={index}>
                <strong>{hospital.name}</strong>
                <p>Distance: {hospital.distance} meters</p>
                <p>Address: {hospital.vicinity}</p>
                <p>Phone: {hospital.formatted_phone_number}</p>
                {hospital.website && <a href={hospital.website}>Website</a>}
              </li>
            ))}
          </ul>
        </div>
        {/* Display the map showing the locations of nearby hospitals */}
        <div id="map" className="map">
          {/* Render Google Map here */}
        </div>
      </div>
    </div>
  );
};

export default Map;
