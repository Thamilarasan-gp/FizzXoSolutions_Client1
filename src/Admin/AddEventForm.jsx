import React, { useState } from "react";
import "./AddEventForm.css";
import {API_BASE_URL} from '../../api';
const AddEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    youtubeLink: "",
    photo: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const response = await fetch(`${API_BASE_URL}/addevent`, {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
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
      <button type="submit">Add Event</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default AddEventForm;