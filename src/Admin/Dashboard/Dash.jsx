import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddBooks from "../AddBooks";
import AddAchievementForm from "../AddAchievmentForm";
import AddEventForm from "../AddEventForm";
import HeroForm from "../HeroForm";
import HeroSection from "../../User/HeroSection";
import "./Dash.css";

export default function YouTubeDashboard() {
  const [activeTab, setActiveTab] = useState("CREATE");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleAnalyze = () => {
    Swal.fire({
      title: "Dashboard Overview",
      html: `
        <div style="text-align: left;">
          <p><strong>📚 Total Books:</strong> 13</p>
          <p><strong>🎉 Total Events:</strong> 23</p>
          <p><strong>🏆 Total Achievements:</strong> 35</p>
        </div>`,
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div className="dashboard-container">
      {isAuthenticated ? (
        <>
          {/* Banner Section */}
          <div className="banner">
            <img
              src="https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg"
              alt="Banner"
              className="banner-img"
            />
          </div>

          {/* Profile Section */}
          <div className="profile">
            <div className="profile-info">
              <img
                src="https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg"
                alt="Profile"
                className="profile-img"
              />
              <h1 className="name">Pongodi</h1>
              <button className="small-button" onClick={handleAnalyze}>
                Analyze
              </button>
            </div>
            <div className="right-section">
              <FaBell className="icon" />
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="admin-nav-bar">
            {["CREATE", "BOOKS", "EVENTS", "ACHIEVEMENTS", "BANNERS"].map(
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

          {/* Content Section */}
          <div className="content-section">
            {activeTab === "BOOKS" && <AddBooks />}
            {activeTab === "ACHIEVEMENTS" && <AddAchievementForm />}
            {activeTab === "EVENTS" && <AddEventForm />}
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