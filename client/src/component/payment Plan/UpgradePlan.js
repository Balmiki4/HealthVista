import React from "react";
import { handlePayment } from "./payment";
import { useHistory, useLocation } from "react-router-dom";

function UpgradePlan() {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const customerId = searchParams.get("customerId");

  const handleUpgrade = () => {
    handlePayment("Pro tier", customerId, history);
  };

  return (
    <div>
      <button className=" btn btn-success p-2" onClick={handleUpgrade}>
        Upgrade to Pro
      </button>
    </div>
  );
}

export default UpgradePlan;
