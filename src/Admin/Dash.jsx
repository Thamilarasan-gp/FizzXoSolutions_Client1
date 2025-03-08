import React, { useState } from "react";
import { FaBell, FaSearch, FaBars, FaTh } from "react-icons/fa";


export default function YouTubePlaylist() {
  const [activeTab, setActiveTab] = useState("HOME"); // State to track active tab

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <FaBars style={styles.icon} />
          <img src="https://th.bing.com/th/id/OIP.7ITF2gx8_a3s4NbnDOpZzAHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.searchBar}>
          <input type="text" placeholder="Search" style={styles.searchInput} />
          <FaSearch style={styles.searchIcon} />
        </div>
        <div style={styles.headerRight}>
          <FaBell style={styles.icon} />
          <FaTh style={styles.icon} />
        </div>
        <button style={styles.logoutButton}>Log out</button>
      </header>

      {/* Banner */}
      <div style={styles.banner}>
        <img src="https://th.bing.com/th/id/OIP.7ITF2gx8_a3s4NbnDOpZzAHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Banner" style={styles.bannerImg} />
      </div>

      {/* Profile Section */}
      <div style={styles.profile}>
        <img src="https://th.bing.com/th/id/OIP.gttNrUtnDkf5AKxJkJ2TyQHaEO?w=330&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Profile" style={styles.profileImg} />
        <div style={styles.profileInfo}>
          <h1 style={styles.name}>Pongodi</h1>
          <p style={styles.role}>Admin1</p>
        </div>
        <button style={styles.addButton}>Add More</button>
      </div>

      {/* Navigation Bar */}
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

      {/* Content Section */}
      <div style={styles.contentSection}>
        {activeTab === "HOME" && (
          <div style={styles.playlists}>
            <h2>Created</h2>
            <div style={styles.boxes}>
              {["Total books", "Total events", "Total achievements"].map(
                (label, index) => (
                  <div key={index} style={styles.box}>
                    <p style={styles.count}>{[13, 23, 35][index]}</p>
                    <span style={{ ...styles.boxLabel, color: ["red", "green", "blue"][index] }}>
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {["BOOKS", "EVENTS", "ACHIEVEMENTS", "BANNERS"].includes(activeTab) && (
          <div style={styles.centerContent}>
            <h2>{activeTab}</h2>
            <button style={styles.addButton}>Add {activeTab}</button>
            <p>List of {activeTab.toLowerCase()} will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Unique CSS using JS object
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
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
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
  searchIcon: {
    color: "gray",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "8px 18px",
    backgroundColor: "grey",
    color: "white",
    border: "solid black 2px",
    borderRadius: "20px",
    cursor: "pointer",
  },
  banner: {
    textAlign: "center",
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
  profileInfo: {
    textAlign: "center",
  },
  name: {
    fontSize: "25px",
    fontWeight: "600",
  },
  role: {
    marginTop: "10px",
    fontSize: "14px",
  },
  addButton: {
    backgroundColor: "#0095f6",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
  },
  navBar: {
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
  },
  navList: {
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  navItem: {
    fontWeight: "bold",
    cursor: "pointer",
    padding: "10px",
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
  boxes: {
    display: "flex",
    justifyContent: "space-around",
    gap: "15px",
    marginTop: "50px",
  },
  box: {
    height: "200px",
    width: "300px",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 10px",
    borderRadius: "10px",
  },
  boxLabel: {
    fontSize: "18px",
    marginTop: "10px",
  },
  count: {
    fontSize: "50px",
  },
  centerContent: {
    textAlign: "center",
    marginTop: "30px",
  },
};

