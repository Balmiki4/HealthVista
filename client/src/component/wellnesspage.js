import React, { useState, useEffect } from "react";

//api=os.getenv('youtubeAPI')
function WellnessPage() {
 const [videos, setVideos] = useState([]);
 const [filteredVideos, setFilteredVideos] = useState([]);
 const [filter, setFilter] = useState('All');


 useEffect(() => {
   const fetchVideos = async () => {
     try {
       let apiUrl = 'https://www.googleapis.com/youtube/v3/search?key=YouTubeAPI&part=snippet';
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
           apiUrl += '&q=wellness'; // Default to 'wellness' if 'All' or unknown filter selected
           break;
       }
       // Fetch video details from YouTube API
       const response = await fetch(apiUrl);
       const data = await response.json();
       // Extract relevant video information
       const videosData = data.items.map(item => ({
         id: item.id.videoId,
         title: item.snippet.title,
         thumbnail: item.snippet.thumbnails.default.url,
         category: filter // Store filter category in video data
       }));
       // Update state with video data
       setVideos(videosData);
       setFilteredVideos(videosData); // Set filtered videos initially
     } catch (error) {
       console.error("Error fetching videos:", error);
     }
   };


   fetchVideos();
 }, [filter]);


 // Function to handle filter change
 const handleFilterChange = (e) => {
   setFilter(e.target.value);
 };


 return (
   <div className="WellnessPage">
     <h1>Wellness</h1>
     {/* Filter dropdown */}
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


     {/* Video container */}
     <div className="activity-container">
       {filteredVideos.map(video => (
         <div key={video.id} className="video-card">
           <div className="video-wrapper">
             <h2 className="video-title">{video.title}</h2>
             <div className="video-container">
               <iframe
                 src={`https://www.youtube.com/embed/${video.id}`}
                 title={video.title}
                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               ></iframe>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}


export default WellnessPage;
