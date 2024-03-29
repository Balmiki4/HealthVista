import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./map.css";

const Map = () => {
  const [location, setLocation] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key={apiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
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

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFacilityNameChange = (event) => {
    setFacilityName(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for hospitals near:", location);
    console.log("Facility name or type:", facilityName);
    // Implement search functionality using Google Maps Places API if needed
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
                placeholder="MY LOCATION *"
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

      {/* Render map container */}
      <div id="map" className="map"></div>
    </div>
  );
};

export default Map;
