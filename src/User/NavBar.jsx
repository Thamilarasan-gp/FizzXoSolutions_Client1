import { useState } from "react";
import { useLanguage } from "../LanguageContext"; // Import Language Context
import "./NavBar.css";
import logo from "../assets/logo1.png";
import translateicon from "../assets/translateicon.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage(); // Get context values

  const navigation = {
    en: [
      { title: "Home", path: "/" },
      { title: "Pathipagam Books", path: "/pathipagamHome#pathippagam-books" },
      { title: "Pathipagam Events", path: "/pathipagamHome#pathipagam-events" },
      { title: "Newsletter", path: "#pathipagam-even" },
      { title: "Achievements", path: "#achievements-section" },
    ],
    ta: [
      { title: "முகப்பு", path: "/" },
      { title: "பதிப்பகம் புத்தகங்கள்", path: "/pathipagamHome#pathippagam-books" },
      { title: "பதிப்பகம் நிகழ்வுகள்", path: "/pathipagamHome#pathipagam-events" },
      { title: "செய்திமடல்", path: "#pathipagam-even" },
      { title: "சாதனைகள்", path: "#achievements-section" },
    ],
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a href="/" className="nav-logo">
          <img src={logo} alt="Logo" />
        </a>

        {/* Mobile Menu Button */}
        <button
          id="menu-toggle-icon"
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="icon close-icon" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="icon menu-icon" viewBox="0 0 24 24">
              <path d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          {navigation[language].map((item, idx) => (
            <li key={idx} className="nav-item">
              <a href={item.path} onClick={() => setIsOpen(false)}>
                {item.title}
              </a>
            </li>
          ))}

          {/* Language Toggle Button */}
          <li className="nav-item english-only">
            <button id="change-language-btn" onClick={toggleLanguage}>
              {language === "en" ? "தமிழ்" : "English"}
            </button>
          </li>
        </ul>

        {/* Translate Icon */}
        <p onClick={toggleLanguage} className="tamil-translate-translate-only">
          <img src={translateicon} alt="Translate" />
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
