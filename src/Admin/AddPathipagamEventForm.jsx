import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";
import "./AddPathipagamEventForm.css";

const AddPathipagamEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    youtubeLink: "",
    photo: null,
  });
  
  const [pathipagamEvents, setPathipagamEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // For search functionality
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPathipagamEvents();
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
    // Filter events based on search query
    const filtered = pathipagamEvents.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, pathipagamEvents]);

  const fetchPathipagamEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pathipagamEvent/pathipagamEvents`);
      const data = await response.json();
      setPathipagamEvents(data);
      setFilteredEvents(data); // Initialize filteredEvents
    } catch (error) {
      setError("Failed to fetch pathipagam events.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      let url = `${API_BASE_URL}/pathipagamEvent/pathipagamEvents`;
      let method = "POST";

      if (selectedEvent) {
        url = `${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${selectedEvent._id}`;
        method = "PUT";
      }

      response = await fetch(url, {
        method: method,
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(selectedEvent ? "Pathipagam Event updated successfully!" : "Pathipagam Event added successfully!");
        fetchPathipagamEvents();
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
      const response = await fetch(`${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPathipagamEvents();
        alert("Pathipagam Event deleted successfully!");
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
    <div className="add-pathipagam-container">
      <h2>{selectedEvent ? "Update Pathipagam Event" : "Add Pathipagam Event"}</h2>

      {/* Search Input */}
      <input
        type="text"
        className="add-pathipagam-input search-input"
        placeholder="Search events..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <form className="add-pathipagam-form" onSubmit={handleSubmit}>
        <input className="add-pathipagam-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Event Name" required />
        <textarea className="add-pathipagam-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Event Description" required />
        <input className="add-pathipagam-input" type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input className="add-pathipagam-input" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input className="add-pathipagam-input" type="url" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} placeholder="YouTube Link" />
        <input className="add-pathipagam-input" type="file" name="photo" onChange={handleChange} />

        <button className="add-pathipagam-button primary" type="submit">{selectedEvent ? "Update Event" : "Add Event"}</button>
        {selectedEvent && <button className="add-pathipagam-button secondary" type="button" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h2>All Pathipagam Events</h2>
      {loading && <p>Loading events...</p>}
      {!loading && filteredEvents.length === 0 && <p>No events found.</p>}

      <div className="pathipagam-events-slider">
        {filteredEvents.map((event) => (
          <div className="pathipagam-event-card" key={event._id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            {event.youtubeLink && <p><a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>}
            {event.photoUrl && <img className="pathipagam-event-image" src={event.photoUrl} alt={event.name} />}

            <div className="pathipagam-event-actions">
              <button className="add-pathipagam-button primary" onClick={() => handleEdit(event)}>Edit</button>
              <button className="add-pathipagam-button danger" onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPathipagamEventForm;
