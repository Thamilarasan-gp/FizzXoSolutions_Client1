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
     <h2 className="goto-title">Start Your Reading Journey!</h2>
<p className="goto-description">
    Step into the world of books and enrich your knowledge and experiences.  
    <br /> A place for unlimited reading, your personal book library.
</p>
<button className="goto-pathipagam-btn" onClick={handleClick}>
        Go to Pathipagam
</button>


    </div>
  );
};

export default GotoPathipagam;
