import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { useLanguage } from "../LanguageContext"; // Import Language Context
import "./Newsletter.css";

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const { language } = useLanguage(); // Get language from context
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/newsletters`)
      .then((response) => setNewsletters(response.data))
      .catch((error) => console.error("Error fetching newsletters:", error));
  }, []);

  // Scroll Left and Right
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Content for different languages
  const content = {
    en: {
      heading: "Latest Newsletters",
    },
    ta: {
      heading: "சமீபத்திய செய்திமடல்கள்",
    },
  };

  return (
    <div className="newsletter-slider-container">
      <h2>{content[language].heading}</h2>
      <button className="newsletter-nav-btn newsletter-left" onClick={scrollLeft}>
        ❮
      </button>
      <div className="newsletter-carousel">
        <div className="newsletter-list" ref={sliderRef}>
          {newsletters.map((news) => (
            <div key={news._id} className="newsletter-card">
              {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="newsletter-image" />}
              <h3 className="title_nl">{news.title}</h3>
              <p className="newsletter-date">{new Date(news.date).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="newsletter-nav-btn newsletter-right" onClick={scrollRight}>
        ❯
      </button>
    </div>
  );
};

export default Newsletter;
