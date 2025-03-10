import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api";
import "./AddEventForm.css";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    youtubeLink: "",
    photo: null,
  });

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        name: selectedEvent.name,
        description: selectedEvent.description,
        date: selectedEvent.date.split("T")[0],
        location: selectedEvent.location,
        youtubeLink: selectedEvent.youtubeLink || "",
        photo: null,
      });
    }
  }, [selectedEvent]);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/events/events`);
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("location", formData.location);
    form.append("youtubeLink", formData.youtubeLink);
    if (formData.photo) {
      form.append("photo", formData.photo);
    }

    try {
      let response;
      let url = `${API_BASE_URL}/events/addevent`;
      let method = "POST";

      if (selectedEvent) {
        url = `${API_BASE_URL}/events/events/${selectedEvent._id}`;
        method = "PUT";
      }

      response = await fetch(url, { method, body: form });
      const result = await response.json();

      if (response.ok) {
        setSuccess(selectedEvent ? "Event updated successfully!" : "Event added successfully!");
        fetchEvents();
        resetForm();
      } else {
        setError(result.message || "An error occurred.");
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/events/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEvents();
        alert("Event deleted successfully!");
        resetForm();
      } else {
        alert("Failed to delete event.");
      }
    } catch (error) {
      alert("Error deleting event.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      date: "",
      location: "",
      youtubeLink: "",
      photo: null,
    });
    setSelectedEvent(null);
  };

  return (
    <div className="add-event-form">
      <h2>{selectedEvent ? "Update Event" : "Add Event"}</h2>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading events...</p>}
      {filteredEvents.length === 0 && !loading && <p>No events found.</p>}

      <form onSubmit={handleSubmit} className="event-form">
        <div className="input-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>YouTube Link:</label>
          <input type="url" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleChange} />
        </div>
        <button type="submit">{selectedEvent ? "Update Event" : "Add Event"}</button>
        {selectedEvent && <button type="button" onClick={resetForm} className="cancel-btn">Cancel Edit</button>}
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <h2>All Events</h2>
   
      <div className="event-grid-container">
        <div className="event-grid">
          {filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              {event.youtubeLink && <p><a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>}
              {event.photoUrl && <img src={event.photoUrl} alt={event.name} className="event-image" />}
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
