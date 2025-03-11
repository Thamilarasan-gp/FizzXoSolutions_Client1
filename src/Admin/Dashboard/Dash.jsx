import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Dash.css"; // Import CSS

import AddBooks from "../AddBooks";
import AddAchievementForm from "../AddAchievmentForm";
import AddEventForm from "../AddEventForm";
import HeroForm from "../HeroForm";
import HeroSection from "../../User/HeroSection";
import AddPathippagamBooks from "../AddPathippagamBooks";
import AddPathipagamEventForm from "../AddPathipagamEventForm";

export default function Dash() {
  const [activeTab, setActiveTab] = useState("CREATE");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {isAuthenticated ? (
        <>
          {/* Left Sidebar */}
          <nav className="admin-sidebar">
            <div className="profile-section">
              <img src="https://th.bing.com/th/id/OIP.zuj7kANit3527OCU_UP2YAHaFm?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Profile" className="profile-image" />
              <p className="profile-name">John Doe</p>
            </div>

            {["CREATE", "BOOKS", "EVENTS", "ACHIEVEMENTS", "BANNERS", "PATHIPPAGAMBOOKS", "PATHIPPAGAMEVENTS"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`admin-nav-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </nav>

          {/* Right Content Section */}
          <div className="content-section">
            {activeTab === "BOOKS" && <AddBooks />}
            {activeTab === "ACHIEVEMENTS" && <AddAchievementForm />}
            {activeTab === "EVENTS" && <AddEventForm />}
            {activeTab === "PATHIPPAGAMBOOKS" && <AddPathippagamBooks />}
            {activeTab === "PATHIPPAGAMEVENTS" && <AddPathipagamEventForm />}
            {activeTab === "BANNERS" && (
              <div className="banners-section">
                <h2>Manage Banners</h2>
                <HeroForm />
                <HeroSection />
              </div>
            )}
            {activeTab === "CREATE" && (
              <div className="create-section">
                <button className="small-button">Create</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="login-message">
          <p>Please log in to view content.</p>
          <button onClick={() => navigate("/login")} className="login-button">
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}
