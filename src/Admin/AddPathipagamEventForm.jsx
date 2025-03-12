import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";
import "./AddBooks.css"; 

const AddPathipagamEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    youtubeLink: "",
    photo: null,
  });

  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/pathipagamEvent/pathipagamEvents`
      );
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setMessage("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle event form submit (Add or Update)
  const handleSubmit = async (method) => {
    setMessage("");
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      const url =
        selectedEvent && method === "PUT"
          ? `${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${selectedEvent._id}`
          : `${API_BASE_URL}/pathipagamEvent/pathipagamEvents`;

      const response = await fetch(url, { method, body: form });
      const result = await response.json();

      if (response.ok) {
        setMessage(
          method === "PUT"
            ? "Event updated successfully!"
            : "Event added successfully!"
        );
        fetchEvents();
        resetForm();
      } else {
        setMessage(result.message || "Error occurred.");
      }
    } catch (error) {
      setMessage("Failed to submit the form.");
    }
  };

  // Handle delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/pathipagamEvent/pathipagamEvents/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setMessage("Event deleted successfully!");
        fetchEvents();
        resetForm();
      } else {
        setMessage("Failed to delete event.");
      }
    } catch (error) {
      setMessage("Error deleting event.");
    }
  };

  // Handle event edit
  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date.split("T")[0],
      location: event.location,
      youtubeLink: event.youtubeLink || "",
      photo: null,
    });
    setPreviewImage(event.photoUrl || null);
  };

  // Select event from list
  const handleSelectEvent = (event) => {
    handleEdit(event);
  };

  // Reset form to default
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
    setPreviewImage(null);
  };

  // Filter events by search
  const filteredEvents = events.filter(
    (e) =>
      e.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div
      className="adbook-container"
      style={{ cursor: loading ? "wait" : "default" }}
    >
      <div className="ad-bk-fm">
        <h2>
          {selectedEvent ? "Update Pathipagam Event" : "Add Pathipagam Event"}
        </h2>

        {/* Search */}
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="book-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
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
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <input
            type="url"
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
            placeholder="YouTube Link"
          />
          <input type="file" name="photo" onChange={handleChange} />
          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}

          <div className="adbk-button-group">
            <button type="button" onClick={() => handleSubmit("POST")}>
              Add
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("PUT")}
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => handleDelete(selectedEvent._id)}
            >
              Delete
            </button>
            <button type="button" onClick={resetForm}>
              Clear
            </button>
          </div>
        </form>
        </div>

        {/* Event List */}
        <div className="ad-bk-ds-cont">
          <ul className="book-list">
            {filteredEvents.map((event) => (
              <li
                key={event._id}
                className={`book-item ${
                  selectedEvent?._id === event._id ? "selected" : ""
                }`}
                onClick={() => handleSelectEvent(event)}
                style={{ pointerEvents: loading ? "none" : "auto" }}
              >
                <strong>{event.name}</strong> - {event.location}
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                {event.youtubeLink && (
                  <p>
                    <a
                      href={event.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch on YouTube
                    </a>
                  </p>
                )}
                {event.photoUrl && (
                  <img
                    src={event.photoUrl}
                    alt={event.name}
                    className="book-image"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default AddPathipagamEventForm;
