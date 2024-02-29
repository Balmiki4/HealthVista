import React, { useState,useEffect } from "react";
import './wellnesspage.css';

function WellnessPage() {
  // State for filtering
  const [filter, setFilter] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [videos, setVideos] = useState([]);

  

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    // Function to fetch video details for activities of type 'video'
    const fetchVideoDetails = async () => {
    

   const fetchVideos = async () => {
    try {
      let apiUrl = 'https://www.googleapis.com/youtube/v3/search?key=&type=video&part=snippet';
      // Adjust API URL based on selected filter
      switch (filter) {
        case 'Meditation':
          apiUrl += '&q=meditation';
          break;
        case 'Exercise':
          apiUrl += '&q=exercise';
          break;
        case 'Mindfulness':
          apiUrl += '&q=mindfulness';
          break;
        case 'Health':
          apiUrl += '&q=healthbenefits';
          break;
        default:
          apiUrl += '&q=wellness'; 
          // Default to 'wellness' if 'All' or unknown filter selected
          break;
      }

  
    // Invoke the fetchVideoDetails function when the activities array changes
    fetchVideoDetails();
  }, [activities]); // Re-run effect when activities array changes
   



  return (
    <div className="WellnessPage">
      <h1>Wellness</h1>
      <div className="filter-container">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" onChange={handleFilterChange} value={filter}>
          <option value="All">All</option>
          <option value="Meditation">Meditation</option>
          <option value="Exercise">Exercise</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className="activity-container">
        {filteredActivities.map(activity => (
          <div key={activity.id} className="activity-card">
            <h2>{activity.title}</h2>
            
            {activity.type === 'video' && (
              <div className="video-container">
                {/* Embedded YouTube video */}
                <iframe
                  title={activity.title}
                  src={`https://www.youtube.com/embed/${activity.link}`}
                  allowFullScreen
                ></iframe>
          </div>
        )}
      </div>
        ))}
    </div>
    </div>
  );
}

export default WellnessPage;
