import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./EventSection.css";
import {API_BASE_URL} from '../../api';
const EventSection = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/events`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch events");
                return res.json();
            })
            .then((data) => setEvents(data))
            .catch((error) => setError(error.message));
    }, []);

    const handleScroll = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = window.innerWidth < 768 ? 250 : 400;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="event-section">
            <h2>Upcoming Events</h2>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <div className="carousel-container">
                <button className="nav-btn left" onClick={() => handleScroll("left")}>&#8249;</button>

                <div className="event-list" ref={scrollRef}>
                    {events.length === 0 && !error ? (
                        <p>No events found</p>
                    ) : (
                        events.map((event) => (
                            <Link to={`/event/${event._id}`} key={event._id} className="event-card">
                                <img src={event.photoUrl || "default-image.jpg"} alt={event.name} />
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p>{event.location}</p>
                            </Link>
                        ))
                    )}
                </div>

                <button className="nav-btn right" onClick={() => handleScroll("right")}>&#8250;</button>
            </div>
        </div>
    );
};

export default EventSection;
