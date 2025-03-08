import React, { useState } from "react";
import axios from "axios";
import "../Login/Log_in.css";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../api";

function Log_in() {
  const navigate = useNavigate();

  // State for handling form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for handling success or error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit clicked", formData);

    // ✅ Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/forget/pass`, {
        email: formData.email,
        password: formData.password, // Only send necessary fields
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Password reset successful!");
        console.log("Response:", response.data);
        alert("Password updated successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Request failed");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="right-section">
        <div className="form-box">
          <h1 className="loo" style={{color:"blue" , fontSize:"20px"}}>Forget Password</h1>
          <form className="forml" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Mobile Number or Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />

            <button type="submit" className="login-button">
              Confirm
            </button>
          </form>
          <div style={{fontSize:"15px"}} className="res">{message && <p>{message}</p>}</div>
        </div>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Log_in;
