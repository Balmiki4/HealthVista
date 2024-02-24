import React, { useState } from "react";
import './wellnesspage.css';

function WellnessPage() {
  const [activities, setActivities] = useState([
    { id: 1, type: 'Exercise Clip', title: 'The Benefits of Meditation', category: 'Mindfulness', link: "https://www.youtube.com/watch?v=mKxu_dyzrj4&list=RDmKxu_dyzrj4&start_radio=1" },
    { id: 2, type: 'article', title: 'The Benefits of Exercise', category: 'Exercise', link: 'https://www.youtube.com/watch?v=JogJf_8MuN8' },
    { id: 3, type: 'article', title: 'The Benefits of Meditation', category: 'Health Benefits', link: '' },
    { id: 4, type: 'article', title: 'The Benefits of Meditation', category: 'Health Benefits', link: '' },
  ]);

  // State for filtering
  const [filter, setFilter] = useState('All');

  // Filtered activities based on selected filter
  const filteredActivities = filter === 'All' ? activities : activities.filter(activity => activity.category === filter);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
        </select>
      </div>

      <div className="activity-container">
        {filteredActivities.map(activity => (
          <div key={activity.id} className="activity-card">
            <h2>{activity.title}</h2>
            <p><strong>Category:</strong> {activity.category}</p>
            <a href={activity.link} className="activity-link" target="_blank" rel="noopener noreferrer">
              {activity.type === 'article' ? 'Read Article' : 'Watch Video'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WellnessPage;
