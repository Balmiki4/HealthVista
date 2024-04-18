
import React from "react";
import { useLocation } from "react-router-dom";
import "./planDetails.css"; 

const PlanDetails = () => {
  const location = useLocation();
  const { planData } = location.state || {};

  if (!planData || planData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {planData.map((plan, index) => (
        <div key={index} className="plan-details-card">
          <h3 className="secondary-heading">{plan.name}</h3>
          <p className="plan-price">Premium: ${plan.premium.toFixed(2)}</p>
          <p>Medical Deductible: ${plan.deductibles[0].amount}</p>
          {plan.deductibles.length > 1 && (
            <p>Drug Deductible: ${plan.deductibles[1].amount}</p>
          )}
          <p>Maximum Out-of-Pocket Costs (MOOPs): ${plan.moops[0].amount}</p>
          <p className="quality-ratings-heading">Quality Ratings:</p>
          <ul className="quality-ratings-list">
            <li>
              Global Rating:{" "}
              {plan.quality_rating.global_rating > 0
                ? plan.quality_rating.global_rating
                : "Rating not available"}
            </li>
          </ul>
          <div className="url-links">
            <p>
              <a
                href={plan.benefits_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Benefits URL
              </a>
            </p>
            <p>
              <a
                href={plan.brochure_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Brochure URL
              </a>
            </p>
            <p>
              <a
                href={plan.formulary_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Formulary URL
              </a>
            </p>
            <p>
              <a
                href={plan.network_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Network URL
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanDetails;
