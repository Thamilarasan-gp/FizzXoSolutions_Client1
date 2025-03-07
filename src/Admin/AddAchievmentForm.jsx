import React, { useState } from "react";
import { API_BASE_URL } from "../../api";
import "./AddAchievmentForm.css";

const AddAchievementForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
      setPreview(URL.createObjectURL(files[0])); // Preview Image
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate required fields
    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      setError("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/achievements`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to add achievement");

      setSuccess("Achievement added successfully!");
      setFormData({ title: "", description: "", date: "", location: "", photo: null });
      setPreview(null); // Reset preview
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="achievement-container">
      <h2 className="achievement-title">Add Achievement</h2>
      <form className="achievement-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="achievement-input"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="achievement-textarea"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="achievement-input"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="achievement-input"
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="achievement-file-input"
        />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" className="preview-img" />
          </div>
        )}

        <button type="submit" className="achievement-button">Add Achievement</button>
        {error && <p className="achievement-error">{error}</p>}
        {success && <p className="achievement-success">{success}</p>}
      </form>
    </div>
  );
};

export default AddAchievementForm;