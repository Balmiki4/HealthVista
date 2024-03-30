import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./map.css";

const Map = () => {
  const [location, setLocation] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const apiKey = process.env.MAP_API;

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
    if (!location) {
      alert("Please enter a location (zip code).");
      return;
    }

    try {
      // Fetch latitude and longitude coordinates for the provided zip code
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        alert("No results found for the provided location.");
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

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFacilityNameChange = (event) => {
    setFacilityName(event.target.value);
  };

  const handleSearch = async () => {
    await fetchNearbyHospitals();
  };

  return (
    <div className="map-container">
      <div className="map header">
        <h1>Find & compare providers near you.</h1>
      </div>
      <div className="provider-types">
        <div className="provider-type">
          <span>Welcome</span>
        </div>
        <div className="provider-type">
          <span>Doctors & clinicians</span>
        </div>
        <div className="provider-type">
          <span>Hospitals</span>
        </div>
      </div>

      <div className="search-container">
        <h2>Find hospitals near me</h2>
        <p>
          Find and compare information about the quality of care at over 4,000
          Medicare-certified hospitals, including over 130 Veterans
          Administration (VA) medical centers and over 50 military hospitals,
          across the country.
        </p>
        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="ZIP CODE *"
                value={location}
                onChange={handleLocationChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="NAME & TYPE (optional)"
                value={facilityName}
                onChange={handleFacilityNameChange}
              />
            </InputGroup>
          </Form.Group>

          <Button variant="success" onClick={handleSearch}>
            Search
          </Button>
        </Form>

        <a href="#">Show past search results</a>
      </div>

      <div className="map-results">
        <div className="hospital-list">
          <h3>Nearby Hospitals</h3>
          <ul>
            {hospitals.map((hospital, index) => (
              <li key={index}>{hospital.name}</li>
            ))}
          </ul>
        </div>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

export default Map;
