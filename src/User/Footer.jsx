import React from "react";
import { useLanguage } from "../LanguageContext";
import "./Footer.css";
import img1 from "../assets/logoicon.png";

const Footer = () => {
  const { language } = useLanguage();

  const footerText = {
    en: "Empowering developers with modern web solutions. Let's build something great together!",
    ta: "மோடர்ன் வலைத்தளத் தீர்வுகளால் டெவலப்பர்களை அதிகாரப்படுத்துதல். ஒன்றாக சிறப்பாக ஒன்றை உருவாக்குவோம்!"
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={img1} alt="Logo" />
        </div>

        <p className="footer-text">{footerText[language]}</p>

        <div className="footer-bottom">
          <div className="social-icons">
            <a href="tel:+915678998765" className="social-item">
              <img src="https://img.icons8.com/?size=100&id=16733&format=png" alt="WhatsApp" width="24" height="24" />
              <span>{language === "en" ? "Call us" : "எங்களை அழைக்கவும்"}</span>
              <strong>+91 5678998765</strong>
            </a>

            <a href="#" className="social-item">
              <img src="https://img.icons8.com/?size=100&id=37326&format=png" alt="YouTube" width="24" height="24" />
              <span>{language === "en" ? "Watch on" : "பார்க்க"}</span>
              <strong>Channel Name</strong>
            </a>

            <a href="mailto:cfvgbh@gmail.com" className="social-item">
              <img src="https://img.icons8.com/?size=100&id=38158&format=png" alt="Email" width="24" height="24" />
              <span>{language === "en" ? "Email" : "மின்னஞ்சல்"}</span>
              <strong>cfvgbh@gmail.com</strong>
            </a>
          </div>

          <p className="copyright">© 2025 Your Company | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
