import { useState } from "react";
import "./NavBar.css";
import img2 from "../assets/image.png";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Customers", path: "/customers" },
    { title: "Careers", path: "/careers" },
    { title: "Guides", path: "/guides" },
    { title: "Partners", path: "/partners" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a href="/" className="logo">
          <img src={img2} alt="Logo" />
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
          {navigation.map((item, idx) => (
            <li key={idx} className="nav-item">
              <a href={item.path} onClick={() => setIsOpen(false)}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
