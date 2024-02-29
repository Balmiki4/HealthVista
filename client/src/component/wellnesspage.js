import React, { useState,useEffect } from "react";
import './wellnesspage.css';

function WellnessPage() {
  const [activities, setActivities] = useState([
    { id: 1, type: 'video', title: 'The Benefits of Meditation', category: 'Meditation', link: "JogJf_8MuN8" },
    { id: 2, type: 'video', title: 'The Benefits of Exercise', category: 'Exercise', link: '9o0UPuDBM8M' },
    { id: 3, type: 'video', title: 'The Benefits of Cultivating Calm', category: 'Mindfulness', link: 'TLKxdTmk-zc' },
    { id: 4, type: 'video', title: 'The Benefits of Exercise', category: 'Exercise', link: 'LHFnS-7zKwI' },
    { id: 5, type: 'video', title: 'The Benefits of Healthy Habits', category: 'Health', link: 'Y8HIFRPU6pM' },
  ]);

  // State for filtering
  const [filter, setFilter] = useState('All');

  // Filtered activities based on selected filter
  const filteredActivities = filter === 'All' ? activities : activities.filter(activity => activity.category === filter);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    // Function to fetch video details for activities of type 'video'
    const fetchVideoDetails = async () => {
      // Map through activities array and update video activities with their details
      const updatedActivities = await Promise.all(
        activities.map(async activity => {
          // Check if activity type is 'video'
          if (activity.type === 'video') {
            const videoId = activity.link; // Extract video ID
            try {
              // Fetch video details from YouTube API
              const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=youtubeAPI`);
              const data = await response.json(); 
              // If video details are available
              if (data.items && data.items.length > 0) {
                const { title, thumbnails } = data.items[0].snippet; 
                // Return updated activity object with title and thumbnail
                return { ...activity, title, thumbnail: thumbnails.default.url };
              }
            } catch (error) {
              console.error('Error fetching video details:', error); // Log any errors
            }
          }
          // Return the activity unchanged if it's not a video
          return activity;
        })
      );
      // Update state with the updated activities array
      setActivities(updatedActivities);
    };
  
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
