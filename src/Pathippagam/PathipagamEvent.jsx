import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { API_BASE_URL } from "../api.js";
import { useNavigate } from "react-router-dom"; // Import Navigate hook
import "./PathipagamEvent.css";
import "../User/RecentBooks.css";

const PathipagamEvent = () => {
  const scrollRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // For event details view

  const navigate = useNavigate(); // Correct hook usage for navigation

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/pathipagamEvent/pathipagamEvents`
      );
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll Function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Event click handler for navigating to detail page
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Navigate to detail page from left section button
  const handleNavigateToDetail = (id) => {
    navigate(`/pathipagamevent`, { state: { id } });
  };

  return (
    <div className="pathipagam-event">
      <div className={`rcbk-container ${selectedEvent ? "expanded" : ""}`}>
        {/* Left Section: Event Details */}
        <div className={`book-details ${selectedEvent ? "show" : "hide"}`}>
          {selectedEvent && (
            <>
              <button
                className="rc-close-btn"
                onClick={() => setSelectedEvent(null)}
              >
                <X size={24} />
              </button>
              <div className="bk-sh-cont">
                {selectedEvent.photoUrl && (
                  <img
                    src={selectedEvent.photoUrl}
                    alt={selectedEvent.name}
                    className="selected-book-image"
                  />
                )}
                <div>
                  <h2>{selectedEvent.name}</h2>
                  <h3>Location: {selectedEvent.location}</h3>
                  <p>
                    Date: {new Date(selectedEvent.date).toLocaleDateString()}
                  </p>
                  <p>{selectedEvent.description}</p>
                  <button
                    className="view-details-btn"
                    onClick={() => handleNavigateToDetail(selectedEvent._id)}
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Section: Event Carousel */}
        <div
          className={`recent-books-container ${selectedEvent ? "shrink" : ""}`}
        >
          <h2 className="title">Pathippagam Events</h2>

          {/* Events Scrollable Section */}
          <div className="scroll-container">
            <button onClick={() => scroll("left")} className="arrow left">
              <ChevronLeft size={24} />
            </button>

            <div ref={scrollRef} className="books-wrapper">
              {loading ? (
                <p>Loading events...</p>
              ) : error ? (
                <p className="error">{error}</p>
              ) : events.length === 0 ? (
                <p>No events found.</p>
              ) : (
                events.map((event, index) => (
                  <div
                    key={event._id}
                    className="book-card"
                    onClick={() => handleEventClick(event)}
                    style={{ cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    {event.photoUrl && (
                      <img
                        src={event.photoUrl}
                        alt={event.name}
                        className="book-image"
                      />
                    )}
                    <h3>{event.name}</h3>
                    <div className="num">
                      <p className="book-author">{index + 1}</p>
                    </div>
                    <div className="book-info">
                      <h3 className="book-title">{event.name}</h3>
                      <p className="book-author">
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="book-author">
                        <strong>Location:</strong> {event.location}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => scroll("right")} className="arrow right">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathipagamEvent;
