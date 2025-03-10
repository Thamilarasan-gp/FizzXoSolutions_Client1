import React from "react";
import "./GallerySection.css"; // Import the CSS file

const GallerySection = () => {
  return (
    <div className="unique-gallery-container">
      <div className="unique-gallery-title-container">
        <p className="unique-section-heading">Gallery</p>
      </div>
      <div className="unique-gallery-grid">
        {/* Large Image */}
        <div className="unique-large-image">
          <img
            src="https://miro.medium.com/max/3840/1*xMuIOwjliGUPjkzukeWKfw.jpeg"
            alt="Classical Dance"
          />
        </div>

        {/* Right Side Grid */}
        <div className="unique-small-images">
          <img
            src="https://i0.wp.com/tourismtn.com/wp-content/uploads/2021/01/Thanjai.jpg?resize=696%2C391&ssl=1"
            alt="Group Dance"
          />
          <img
            src="https://th.bing.com/th/id/OIP.Oge6q4YxlMheLldeAMLUhwHaJl?w=136&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Basketball"
          />
        </div>

        <div className="unique-small-images2">
          <img
            src="https://th.bing.com/th/id/OIP.A2CVGfScP39KZ31elAsv0wHaLo?w=122&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Martial Arts"
          />
          <img
            src="https://th.bing.com/th/id/OIP.hbp6FybX30CgNIlF07aCjgHaE8?w=291&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Fashion Walk"
          />
          <img
            src="https://th.bing.com/th/id/OIP.VY4nIfnK-r0mHjH3LCQdtwHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Students Talking"
            className="unique-wide-image"
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySection;