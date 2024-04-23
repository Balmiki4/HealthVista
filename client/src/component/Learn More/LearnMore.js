import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LearnMore.css';

const FeatureCard = ({ title, description }) => (
  <div className="col-md-4 mb-4">
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const LearnMorePage = () => {
  const features = [
    {
      title: 'Nutrition Tracker',
      description: 'Track your daily nutrient intake and stay on top of your dietary goals.',
    },
    {
      title: 'Medication Tracker',
      description: 'Never miss a dose with our medication tracking and reminder system.',
    },
    {
      title: 'Insurance Recommender',
      description: 'Find the best insurance plan tailored to your specific needs.',
    },
    {
      title: 'AI Therapist',
      description: 'Get personalized mental health support from our AI-powered therapist.',
    },
    {
      title: 'Exercise Videos',
      description: 'Access a library of guided exercise videos for all fitness levels.',
    },
    {
      title: 'Health Articles',
      description: 'Stay informed with our curated collection of health-related articles.',
    },
    {
        title: 'Hospital Tracker',
        description: 'Locate the Nearest Hospital for All Medical Needs, Emergencyor Not.',
      },
  ];

  return (
    <div className="conainer" style ={{marginTop: "10em"}}>
      <h1 className="secondary-heading text-center mb-4">Health Vista Features</h1>
      <div className="learnMore row ">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
};

export default LearnMorePage;