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
    try {
      const response = await axios.post(`${API_BASE_URL}/login/addit`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Login successful!");
        console.log("Response:", response.data);
        alert("Successfully logged in");

        const { id } = response.data.user;
        navigate("/dash", { state: { id } });
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Login failed");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="auth-login-container">
      <div className="auth-right-section">
        <div className="auth-form-box">
          <h1 className="auth-title" style={{ color: "blue" }}>Login</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Password"
              required
            />
            <button type="submit" className="auth-login-button">
              Log In
            </button>
          </form>
          <div className="auth-divider">OR</div>
          <a onClick={() => navigate("/forget")} className="auth-forgot-password">
            Forgot Password?
          </a>
          <div className="auth-error-message">{message && <p>{message}</p>}</div>
        </div>
        <div className="auth-signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Log_in;
