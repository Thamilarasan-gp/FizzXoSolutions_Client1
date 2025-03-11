import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GotoPathipagam.css'; // Import the CSS file

const GotoPathipagam = () => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/pathipagamHome'); // Redirect to the desired route
  // };

  return (
    <div className="goto-container">
      <button className="goto-pathipagam-btn" onClick={()=>navigate('/pathipagamHome')}>
        Go to Pathipagam
      </button>
    </div>
  );
};

export default GotoPathipagam;
