import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="your-logo.png" alt="Logo" />
        </div>
        <p className="footer-text">
          Empowering developers with modern web solutions. Let's build something great together!
        </p>
        <ul className="footer-nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="footer-bottom">
          <p>© 2025 Your Company | All rights reserved.</p>
          <div className="social-icons">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">TW</a>
            <a href="#" className="social-icon">LN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;