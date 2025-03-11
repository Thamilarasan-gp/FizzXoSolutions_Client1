import { useState, useEffect } from "react";
import "./NavBar.css";
import logo from "../assets/logo1.png";
import translateicon from "../assets/translateicon.png";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "english" ? "tamil" : "english";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const navigation = {
    english: [
      { title: "Home", path: "/" },
      { title: "Pathipagam Books", path: "/pathipagamHome#pathippagam-books" },
      { title: "Pathipagam Events", path: "/pathipagamHome#pathipagam-events" },
      { title: "Newsletter", path: "#pathipagam-even" },
      { title: "Achievements", path: "#achievements-section" },
    ],
    tamil: [
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
        <button className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
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

          {/* Show "English" button only on small screens */}
          <li className="nav-item english-only">
            <button onClick={toggleLanguage}>{language === "english" ? "தமிழ்" : "English"}</button>
          </li>
        </ul>

        {/* Translate Icon (Visible only on larger screens) */}
        <button onClick={toggleLanguage} className="tamil-translate-translate-only">
          <img src={translateicon} alt="Translate" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
