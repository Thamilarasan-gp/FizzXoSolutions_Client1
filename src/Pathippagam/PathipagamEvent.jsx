import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api.js";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import "./PathipagamEvent.css";

const PathipagamEvent = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pathipagamEvent/pathipagamEvents`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pathipagam-event-container">
      <div className="header">
        <h2 className="section-title">Pathipagam Events</h2>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && events.length === 0 && <p>No events found.</p>}

      {!loading && events.length > 0 && (
        <>
          <div className="event-grid">
            {displayedEvents.map((event) => (
              <Link to={`/pathipagamevent/${event._id}`} key={event._id} className="event-card">
                <img className="event-image" src={event.photoUrl} alt={event.name} />
                <h3 className="event-title">{event.name}</h3>
                <p className="event-author">{event.description}</p>
                <p className="event-location">{event.location}</p>
              </Link>
            ))}
          </div>

          <div className="pathipagam-events-navigation-buttons">
            <button className="arr-btn left-arrow" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>
            
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button className="arr-btn right-arrow" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PathipagamEvent;
