import React from 'react';

const PlanDetails = ({ planData }) => {
  if (!planData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {planData.map((plan, index) => (
        <div key={index}>
          <h2>{plan.name}</h2>
          <p>Premium: ${plan.premium.toFixed(2)}</p>
          <p>Medical Deductible: ${plan.deductibles[0].amount}</p>
          <p>Drug Deductible: ${plan.deductibles[1].amount}</p>
        </div>
      ))}
    </div>
  );
};

export default PlanDetails;