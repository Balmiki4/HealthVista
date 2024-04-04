import React from "react";
import "./Nutrition.css";

const Nutrition = () => {
  return (
    <div className="Nutritioncontainer ">
      <div className="header">
        <div className="text">
          <h1 className="font-only-heading">Nutrition Tracker</h1>
        </div>
        <div className="underline"></div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header">Today's Food Log</div>
            <ul className="list-group list-group-flush">
              {/* Food log items will show up here*/}
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header">Add Food</div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a food..."
                />
                <button className="btn btn-success mt-2">Search</button>
              </div>
              {/* Search results will show up here*/}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header">Nutrition Analysis</div>
            <div className="card-body">
              <p>Total Calories: </p>
              <p>Total Protein: </p>
              <p>Total Carbs: </p>
              <p>Total Fats: </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-none">
            <div className="card-header d-flex justify-content-between align-items-center">
              Past Logs
              <button className="btn btn-success btn-sm">Show</button>
            </div>
            {/* Past logs will up here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
