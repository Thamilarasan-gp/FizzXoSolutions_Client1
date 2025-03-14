import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./DashNavbar.css"; // Import CSS

import AddBooks from "../AddBooks";
import AddAchievementForm from "../AddAchievmentForm";
import AddEventForm from "../AddEventForm";
import HeroForm from "../HeroForm";
import AddPathippagamBooks from "../AddPathippagamBooks";
import AddPathipagamEventForm from "../AddPathipagamEventForm";
import AddNewsletterForm from "../AddNewsletterForm";
import  logo from "../../assets/logo1.png";

import Dashboard from "./Dashboard";

export default function DashNavbar() {
  const [activeTab, setActiveTab] = useState("CREATE");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        navigate("/login");
      }
    });
  };

  return (
    <div className="dashboard-container">
      {isAuthenticated ? (
        <>
        <div className="dash-nav-con">
          <a href="/" className="dash-logo">
            <img src={logo} alt="Logo" className="dash-logo-img" />
          </a>
          {/* Menu Button (Only on Mobile) */}
          <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
        </div>


          {/* Sidebar (Fixed for Large Screens, Collapsible for Mobile) */}
          <nav className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="profile-section">
              <img
                src="https://th.bing.com/th/id/OIP.zuj7kANit3527OCU_UP2YAHaFm?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Profile"
                className="profile-image"
              />
              <p className="profile-name">John Doe</p>
            </div>

            {["CREATE", "BOOKS", "EVENTS", "ACHIEVEMENTS", "BANNERS", "PATHIPPAGAM BOOKS", "PATHIPPAGAM EVENTS", "ADD NEWSLETTER"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`admin-nav-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setSidebarOpen(false); // Close sidebar on mobile
                  }}
                >
                  {tab}
                </button>
              )
            )}

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </nav>

          {/* Content Section */}
          <div className="content-section">
            {activeTab === "BOOKS" && <AddBooks />}
            {activeTab === "ACHIEVEMENTS" && <AddAchievementForm />}
            {activeTab === "EVENTS" && <AddEventForm />}
            {activeTab === "PATHIPPAGAM BOOKS" && <AddPathippagamBooks />}
            {activeTab === "PATHIPPAGAM EVENTS" && <AddPathipagamEventForm />}
            {activeTab === "ADD NEWSLETTER" && <AddNewsletterForm />}
            {activeTab === "BANNERS" && (
              <div className="banners-section">
                <h2>Manage Banners</h2>
                <HeroForm />
              </div>
            )}
            {activeTab === "CREATE" && <Dashboard/>}
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
