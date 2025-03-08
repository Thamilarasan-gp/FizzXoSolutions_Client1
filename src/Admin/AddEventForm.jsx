import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api";

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
        photo: null, // Reset file input
      });
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/events`);
      const data = await response.json();
      setEvents(data);
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
      let url = `${API_BASE_URL}/addevent`;
      let method = "POST";

      if (selectedEvent) {
        // If editing, update event
        url = `${API_BASE_URL}/events/${selectedEvent._id}`;
        method = "PUT";
      }

      response = await fetch(url, {
        method: method,
        body: form, 
      });

      const result = await response.json();
      console.log("Server Response:", result); // Debugging

      if (response.ok) {
        setSuccess(selectedEvent ? "Event updated successfully!" : "Event added successfully!");
        fetchEvents();
        resetForm();
      } else {
        setError(result.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
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
    <div>
      <h2>{selectedEvent ? "Update Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>YouTube Link:</label>
          <input type="url" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleChange} />
        </div>
        <button type="submit">{selectedEvent ? "Update Event" : "Add Event"}</button>
        {selectedEvent && <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>Cancel Edit</button>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>

      <h2>All Events</h2>
      {loading && <p>Loading events...</p>}
      {events.length === 0 && !loading && <p>No events found.</p>}
      <ul>
        {events.map((event) => (
          <li key={event._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            {event.youtubeLink && <p><a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>}
            {event.photoUrl && <img src={event.photoUrl} alt={event.name} style={{ width: "100px" }} />}
            <br />
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)} style={{ marginLeft: "10px", color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddEventForm;
