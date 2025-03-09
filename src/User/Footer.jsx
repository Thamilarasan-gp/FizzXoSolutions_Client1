import React from "react";
import "./Footer.css";
import img1 from "../assets/image.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src={img1} alt="Logo" />
        </div>

        {/* Footer Text */}
        <p className="footer-text">
          Empowering developers with modern web solutions. Let's build something great together!
        </p>

        {/* Navigation Links */}
     

        {/* Social Icons & Contact Details */}
        <div className="footer-bottom">
          <div className="social-icons">
            {/* WhatsApp */}
            <a href="tel:+915678998765" className="social-item">
              <img src="https://img.icons8.com/?size=100&id=16733&format=png&color=FFFFFF" 
                   alt="WhatsApp" width="24" height="24" />
              <span>Call us</span>
              <strong>+91 5678998765</strong>
            </a>

            {/* YouTube */}
            <a href="#" className="social-item">
              <img src="https://img.icons8.com/?size=100&id=37326&format=png&color=FFFFFF" 
                   alt="YouTube" width="24" height="24" />
              <span>Watch on</span>
              <strong>Channel Name</strong>
            </a>

            {/* Email */}
            <a href="mailto:cfvgbh@gmail.com" className="social-item">
              <img src="https://img.icons8.com/?size=100&id=38158&format=png&color=FFFFFF" 
                   alt="Email" width="24" height="24" />
              <span>Email</span>
              <strong>cfvgbh@gmail.com</strong>
            </a>
          </div>

          {/* Copyright Text */}
          <p className="copyright">© 2025 Your Company | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
