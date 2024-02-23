import React,{useState} from "react";
import './wellnesspage.css';


function wellnesspage(){
    const[activities, setActivities]=useState([
        {id:1, type:'article',title:'The Benefits of Meditation',category:'Health Benefits',link:''},
        {id:1, type:'article',title:'The Benefits of Meditation',category:'Health Benefits',link:''},
        {id:1, type:'article',title:'The Benefits of Meditation',category:'Health Benefits',link:''},
        {id:1, type:'article',title:'The Benefits of Meditation',category:'Health Benefits',link:''},
    ]);

    return (
        <div className="WellnessPage">
          <h1>Wellness</h1>
    
          <div className="activity-container">
            {activities.map(activity => (
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
export default wellnesspage;
