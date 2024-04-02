import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./map.css";

const Map = () => {
  const [zipCode, setZipCode] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const apiKey = "AIzaSyDmzZS6T8pgdF5jod7uARNGsVq1WP70fDA";

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&crossorigin=anonymous`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        initializeMap();
        getGeolocation();
      };
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

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: mapCenter || { lat: 0, lng: 0 }, // Use the mapCenter state or default center
        zoom: 10, // Default zoom level
      }
    );
    setMap(mapInstance);

    if (userLocation) {
      fetchNearbyHospitals(userLocation);
    }
  };

  const sortHospitalsByDistance = (hospitals, searchLocation) => {
    return hospitals.sort((a, b) => {
      const distanceA =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          searchLocation,
          a.geometry.location
        );
      const distanceB =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          searchLocation,
          b.geometry.location
        );
      return distanceA - distanceB;
    });
  };

  const fetchNearbyHospitals = async (searchLocation) => {
    try {
      // Perform search for hospitals based on latitude and longitude coordinates
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        location: searchLocation,
        radius: 5000, // Search radius in meters
        type: "hospital", // Search type
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const sortedHospitals = sortHospitalsByDistance(
            results,
            searchLocation
          );
          setHospitals(sortedHospitals);
          if (map) {
            map.setCenter(searchLocation); // Center the map on the search location
            addMarkers(sortedHospitals, map); // Add markers to the map
          }
        }
      });
    } catch (error) {
      console.error("Error searching for hospitals:", error);
      alert(
        "An error occurred while searching for hospitals. Please try again later."
      );
    }
  };

  const addMarkers = (hospitals, map) => {
    // Remove any existing markers
    markers.forEach((marker) => marker.setMap(null));

    // Create a new marker for each hospital
    const newMarkers = hospitals.map((hospital) => {
      const marker = new window.google.maps.Marker({
        position: hospital.geometry.location,
        map: map,
        title: hospital.name,
      });
      return marker;
    });

    setMarkers(newMarkers);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSearch = () => {
    if (zipCode) {
      // Fetch latitude and longitude coordinates for the provided zip code
      fetchZipCodeCoordinates(zipCode);
    } else {
      fetchNearbyHospitals(userLocation);
    }
  };

  const fetchZipCodeCoordinates = async (zipCode) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        alert("No results found for the provided ZIP code.");
        return;
      }

      const { lat, lng } = data.results[0].geometry.location;
      const searchLocation = { lat, lng };
      setMapCenter({ lat, lng }); // Update the mapCenter state with the new coordinates
      fetchNearbyHospitals(searchLocation);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert(
        "An error occurred while fetching coordinates. Please try again later."
      );
    }
  };

  return (
    <div className="map-container">
      <div className="search-container">
        <h2>Find hospitals near you</h2>
        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter ZIP code (optional)"
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
        <div className="hospital-list">
          <h3>Nearby Hospitals</h3>
          <ul>
            {hospitals.map((hospital, index) => (
              <li key={index}>
                <strong>{hospital.name}</strong>
                <p>
                  Distance:{" "}
                  {hospital.geometry && userLocation
                    ? `${(
                        window.google.maps.geometry.spherical.computeDistanceBetween(
                          userLocation,
                          hospital.geometry.location
                        ) / 1609.34
                      ).toFixed(2)} mi`
                    : "N/A"}
                </p>
                <p>Address: {hospital.vicinity}</p>
                {hospital.formatted_phone_number && (
                  <p>Phone: {hospital.formatted_phone_number}</p>
                )}
                {hospital.website && (
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div id="map" className="map"></div>
      </div>
    </div>
  );
};

export default Map;
