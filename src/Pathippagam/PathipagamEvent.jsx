import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { API_BASE_URL } from "../api.js";
import "./PathipagamEvent.css";

const PathipagamEvent = () => {
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // Initially show 12 events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12); // Show next 12 events
  };

  return (
    <div className="pathipagam-event-container">
      <h2>Pathipagam Events</h2>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && events.length === 0 && <p>No events found.</p>}

      {!loading && events.length > 0 && (
        <>
          <div className="event-grid">
            {events.slice(0, visibleCount).map((event) => (
              <Link to={`/pathipagamevent/${event._id}`} key={event._id} className="event-card">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                {event.youtubeLink && (
                  <p>
                    <a href={event.youtubeLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Watch on YouTube
                    </a>
                  </p>
                )}
                {event.photoUrl && <img className="event-image" src={event.photoUrl} alt={event.name} />}
              </Link>
            ))}
          </div>

          {visibleCount < events.length && (
            <button className="see-all-btn" onClick={loadMore}>See All</button>
          )}
        </>
      )}
    </div>
  );
};

export default PathipagamEvent;
