import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext'; // Import Language Context
import './GotoPathipagam.css'; // Import the CSS file

const GotoPathipagam = () => {
  const navigate = useNavigate();
  const { language } = useLanguage(); // Get language from context

  const content = {
    en: {
      title: "Start Your Reading Journey!",
      description:
        "Step into the world of books and enrich your knowledge and experiences. A place for unlimited reading, your personal book library.",
      button: "Go to Pathipagam",
    },
    ta: {
      title: "உங்கள் வாசிப்பு பயணத்தை தொடங்குங்கள்!",
      description:
        "நூல்களின் உலகில் சென்று உங்கள் அறிவையும் அனுபவங்களையும் மேம்படுத்துங்கள். எல்லையில்லா வாசிப்புக்கு ஒரு தனிப்பட்ட நூலகம்.",
      button: "பதிபகத்திற்குச் செல்லவும்",
    },
  };

  const handleClick = () => {
    navigate('/pathipagamHome'); // Redirect to another website or section
  };

  return (
    <div className="goto-container">
      <h2 className="goto-title">{content[language].title}</h2>
      <p className="goto-description">{content[language].description}</p>
      <button className="goto-pathipagam-btn" onClick={handleClick}>
        {content[language].button}
      </button>
    </div>
  );
};

export default GotoPathipagam;
