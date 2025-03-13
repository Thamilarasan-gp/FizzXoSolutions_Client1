import React from "react";
import "./Dashboard.css"; // Import CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-admin-container">
      <div className="dashboard-admin-content">
        <div className="dashboard-admin-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
            alt="Content"
            className="dashboard-admin-icon"
          />
        </div>
        <h2 className="dashboard-admin-title">Create content on any device</h2>
        <p className="dashboard-admin-description">
          Upload and record at home or on the go.
          <br />
          Everything you make public will appear here.
        </p>
        <button className="dashboard-admin-button">Create</button>
      </div>
    </div>
  );
};

export default Dashboard;
