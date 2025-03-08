import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [editEventId, setEditEventId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to fetch events.");
    }
  };

  const handleEdit = (event) => {
    setEditEventId(event._id);
    setEditFormData(event);
  };

  const handleCancelEdit = () => {
    setEditEventId(null);
    setEditFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async (id) => {
    try {
      const updatedEvent = { ...editFormData, _id: id }; // Ensure ID is included
  
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
  
      if (response.ok) {
        const updatedData = await response.json(); // Get the actual updated event from the backend
  
        setEvents(events.map((event) => (event._id === id ? updatedData : event))); // Ensure correct update
        setEditEventId(null);
      } else {
        setError("Failed to update event.");
      }
    } catch (error) {
      setError("Error updating event.");
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        setError("Failed to delete event.");
      }
    } catch (error) {
      setError("Error deleting event.");
    }
  };

  return (
    <div>
      <h2>Event List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            {editEventId === event._id ? (
              <>
                <input type="text" name="name" value={editFormData.name} onChange={handleChange} />
                <textarea name="description" value={editFormData.description} onChange={handleChange} />
                <input type="date" name="date" value={editFormData.date} onChange={handleChange} />
                <input type="text" name="location" value={editFormData.location} onChange={handleChange} />
                <input type="url" name="youtubeLink" value={editFormData.youtubeLink} onChange={handleChange} />
                <button onClick={() => handleSave(event._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{event.name}</h3>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                {event.youtubeLink && (
                  <p>
                    <strong>YouTube Link:</strong>{" "}
                    <a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">
                      {event.youtubeLink}
                    </a>
                  </p>
                )}
                {event.photo && (
                  <p>
                    <strong>Photo:</strong><br />
                    <img src={`${API_BASE_URL}/uploads/${event.photo}`} alt="Event" style={{ width: "150px", height: "100px" }} />
                  </p>
                )}
                <button onClick={() => handleEdit(event)}>Edit</button>
                <button onClick={() => handleDelete(event._id)} style={{ marginLeft: "10px", background: "red", color: "white" }}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
