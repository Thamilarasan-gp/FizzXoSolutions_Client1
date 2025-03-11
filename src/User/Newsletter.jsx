import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import "./Newsletter.css";

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/newsletters`)
      .then((response) => setNewsletters(response.data))
      .catch((error) => console.error("Error fetching newsletters:", error));
  }, []);

  return (
    <div className="newsletter-display-container" id="newsletters-section">
      <h2>Latest Newsletters</h2>
      <div className="newsletter-list">
        {newsletters.map((news) => (
          <div key={news._id} className="newsletter-card">
            {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="newsletter-image" />}
            <h3>{news.title}</h3>
            <p>{news.content}</p>
            <p className="newsletter-date">{new Date(news.date).toDateString()}</p>
            {/* <p>{news.date.split('T')[0]}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsletter;
