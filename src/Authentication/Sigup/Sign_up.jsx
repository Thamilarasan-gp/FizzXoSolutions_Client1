import React, { useState } from "react";
import "./Sign_up.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../api";

function Sign_up() {
  const navigate = useNavigate();

  // Step 1: Initialize state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Step 2: Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("Form Data:", formData);

    try {
      const response = await axios.post(`${API_BASE_URL}/signup/sigin/add`, formData);

      setResponseMessage("Registration successful!");
      console.log("Server Response:", response.data);

      setFormData({
        email: "",
        password: "",
        name: "",
        username: "",
      });

      navigate("/dash");
    } catch (error) {
      setResponseMessage("Registration failed. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-box">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-tagline">Sign up to go to login</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="signup-input"
          />

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter an Email"
            required
            className="signup-input"
            onBlur={() => {
              if (!formData.email.includes("@")) {
                alert("Email must contain '@' symbol.");
              }
            }}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="signup-input"
          />

          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
      </div>

      <div className="signup-login-link">
        Have an account? <Link to="/login"> Log in </Link>
      </div>
    </div>
  );
}

export default Sign_up;
