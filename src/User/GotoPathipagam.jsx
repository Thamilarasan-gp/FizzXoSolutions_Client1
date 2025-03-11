import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GotoPathipagam.css'; // Import the CSS file

const GotoPathipagam = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/pathipagamHome'); // Redirect to another website or section
  };

  return (
    <div className="goto-container">
      <h2 className="goto-title">📖 உங்கள் வாசிப்பு பயணத்தை தொடங்குங்கள்!</h2>
      <p className="goto-description">
        புத்தகங்களின் உலகத்திற்கு சென்று, அறிவையும் அனுபவத்தையும் பெருக்குங்கள். 
        <br />கட்டற்ற வாசிப்பிற்கான இடம், உங்கள் தனிப்பட்ட புத்தக நூலகம்.
      </p>
      <button className="goto-pathipagam-btn" onClick={handleClick}>
        📚 பத்திரிககத்திற்கு செல்லுங்கள்
      </button>
    </div>
  );
};

export default GotoPathipagam;
