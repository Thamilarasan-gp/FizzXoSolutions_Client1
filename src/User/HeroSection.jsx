import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSection.css';
import { API_BASE_URL } from "../../api";
const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/heros/gallery`)
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="gallery-container">
      {images.length > 0 && (
        <div className="hero-section">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentIndex].imageUrl}
              src={images[currentIndex].imageUrl}
              alt="Gallery Slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="hero-image"
            />
          </AnimatePresence>

          {/* Left Arrow */}
          <button  className="arrow left-arrow" onClick={prevSlide}>&#10094;</button>

          {/* Right Arrow */}
          <button className="arrow right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
