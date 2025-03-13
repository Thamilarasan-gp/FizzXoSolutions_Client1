import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBooks.css"; // Reusing the same CSS
import { API_BASE_URL } from "../../api";

const AddEventForm = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    photo: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get(`${API_BASE_URL}/events/all`);
      setEvents(res.data);
      setFilteredEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setMessage("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    const filtered = events.filter((event) =>
      [event.eventname, event.location, event.description]
        .some((field) =>
          field?.toLowerCase().startsWith(search.trim().toLowerCase())
        )
    );
    setFilteredEvents(filtered);
  }, [search, events]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      setFormData({ ...formData, image: file });

      // Image preview
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      location: "",
      description: "",
      image: null,
    });
    setPreviewImage(null);
    setSelectedEventId(null);
    setMessage("");
  };

  // Add event
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const eventData = createFormData();
      await axios.post(`${API_BASE_URL}/events/add`, eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEvents();
      resetForm();
      setMessage("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      setMessage("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update event
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedEventId) return alert("Select an event to update.");
    setLoading(true);
    setMessage("");
    try {
      const eventData = createFormData();
      await axios.put(`${API_BASE_URL}/events/events/${selectedEventId}`, eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEvents();
      resetForm();
      setMessage("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      setMessage("Failed to update event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedEventId) return alert("Select an event to delete.");
    setLoading(true);
    setMessage("");
    try {
      await axios.delete(`${API_BASE_URL}/events/events/${selectedEventId}`);
      fetchEvents();
      resetForm();
      setMessage("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      setMessage("Failed to delete event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare FormData for requests
  const createFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    return data;
  };

  // Select event for update/delete
  const handleSelectEvent = (event) => {
    setSelectedEventId(event._id);
    setFormData({
      name: event.name,
      date: event.date.split("T")[0], // For proper date input
      location: event.location,
      description: event.description,
      photoUrl: null,
    });
    setPreviewImage(event.photoUrl || null);
  };

  return (
    <div
      className="adbook-container"
      style={{ cursor: loading ? "wait" : "default" }}
    >
      <div className="ad-bk-fm">
        <h2>Event Management</h2>

        <input
          type="text"
          placeholder="🔍 Search events by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {message && <div className="status-message">{message}</div>}

        <form className="book-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="photoUrl"
            accept="image/*"
            onChange={handleChange}
          />

          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Event Preview" />
            </div>
          )}

          <div className="adbk-button-group">
            <button type="button" onClick={handleAdd} disabled={loading}>
              Add
            </button>
            <button type="button" onClick={handleUpdate} disabled={loading}>
              Update
            </button>
            <button type="button" onClick={handleDelete} disabled={loading}>
              Delete
            </button>
          </div>
        </form>
      </div>

      <div className="ad-bk-ds-cont">
        <ul className="book-list">
          {filteredEvents.map((event) => (
            <li
              key={event._id}
              className={`book-item ${selectedEventId === event._id ? "selected" : ""}`}
              onClick={() => handleSelectEvent(event)}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              <strong>{event.name}</strong> — {event.date.split("T")[0]} at {event.location}
             
              {event.photoUrl && (
                <img src={event.photoUrl} alt={event.name} className="book-image" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEventForm;
