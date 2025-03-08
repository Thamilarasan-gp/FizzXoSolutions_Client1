import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaBars, FaTh } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Log_in from "../Authentication/Login/Log_in";
import Signup from "../Authentication/Sigup/Sign_up";
import Forget from "../Authentication/Forget/Forget";
import AddBooks from "./AddBooks";
import AddAchievementForm from "./AddAchievmentForm";
import AddEventForm from "./AddEventForm";
import EventPage from "../User/EventPage";
import EventSection from "../User/EventSection";
import HeroForm from "./HeroForm";
import HeroSection from "../User/HeroSection";

export default function YouTubePlaylist() {
  const [activeTab, setActiveTab] = useState("HOME");
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

  return (
    <div style={styles.container}>
      {isAuthenticated ? (
        <>
          <header style={styles.header}>
            <div style={styles.headerLeft}>
              <FaBars style={styles.icon} />
              <img
                src="https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg"
                alt="Logo"
                style={styles.logo}
              />
            </div>
            <div style={styles.searchBar}>
              <input type="text" placeholder="Search" style={styles.searchInput} />
              <FaSearch style={styles.searchIcon} />
            </div>
            <div style={styles.headerRight}>
              <FaBell style={styles.icon} />
              <FaTh style={styles.icon} />
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Log out
            </button>
          </header>

          <div style={styles.banner}>
            <img
              src="https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg"
              alt="Banner"
              style={styles.bannerImg}
            />
          </div>

          <div style={styles.profile}>
            <img
              src="https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg"
              alt="Profile"
              style={styles.profileImg}
            />
            <div style={styles.profileInfo}>
              <h1 style={styles.name}>Pongodi</h1>
              <p style={styles.role}>Admin1</p>
            </div>
            <button style={styles.addButton}>Add More</button>
          </div>

          <nav style={styles.navBar}>
            <ul style={styles.navList}>
              {["HOME", "BOOKS", "EVENTS", "ACHIEVEMENTS", "BANNERS"].map((tab) => (
                <li
                  key={tab}
                  style={activeTab === tab ? styles.activeTab : styles.navItem}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </nav>

          <div style={styles.contentSection}>
            {activeTab === "HOME" && (
              <div style={styles.playlists}>
                <h2>Created</h2>
                <div style={styles.boxes}>
                  {["Total books", "Total events", "Total achievements"].map((label, index) => (
                    <div key={index} style={styles.box}>
                      <p style={styles.count}>{[13, 23, 35][index]}</p>
                      <span
                        style={{
                          ...styles.boxLabel,
                          color: ["red", "green", "blue"][index],
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "BOOKS" && <AddBooks/>}
            {activeTab === "ACHIEVEMENTS" && <>
              <AddAchievementForm />
              
            </> }
            {activeTab === "EVENTS" &&<>
              <HeroForm/>
              <HeroSection/>
              </> }
            {activeTab === "BANNERS" && <><HeroForm/>
            <HeroSection/>
            </>}
          </div>
        </>
      ) : (
        <>
          <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
            Please log in to view content.
          </p>
          <button onClick={() => navigate("/login")} style={styles.logoutButton}>
            Go to Login
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    height: "30px",
    marginLeft: "10px",
  },
  icon: {
    fontSize: "20px",
    margin: "0 10px",
    cursor: "pointer",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    background: "#f1f1f1",
    padding: "5px 10px",
    borderRadius: "20px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    padding: "5px",
    width: "250px",
  },
  logoutButton: {
    padding: "8px 18px",
    backgroundColor: "grey",
    color: "white",
    border: "solid black 2px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  bannerImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    justifyContent: "center",
    gap: "20px",
  },
  profileImg: {
    height: "90px",
    width: "90px",
    borderRadius: "50%",
  },
  navList: {
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  activeTab: {
    fontWeight: "bold",
    cursor: "pointer",
    padding: "10px",
    borderBottom: "2px solid black",
  },
  contentSection: {
    padding: "20px",
  },
};

