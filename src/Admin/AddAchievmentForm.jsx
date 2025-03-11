import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import "./AddAchievmentForm.css";

const AddAchievementForm = () => {
  const [achievements, setAchievements] = useState([]);
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
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/achievements`);
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, photo: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      setError("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      let response;
      if (editId) {
        response = await axios.put(`${API_BASE_URL}/achievements/${editId}`, formDataToSend);
        setAchievements((prev) =>
          prev.map((ach) => (ach._id === editId ? response.data.achievement : ach))
        );
        setEditId(null);
      } else {
        response = await axios.post(`${API_BASE_URL}/achievements`, formDataToSend);
        setAchievements([...achievements, response.data.achievement]);
      }

      setSuccess(editId ? "Achievement updated successfully!" : "Achievement added successfully!");
      setFormData({ title: "", description: "", date: "", location: "", photo: null });
      setPreview(null);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleEdit = (achievement) => {
    setEditId(achievement._id);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      location: achievement.location,
      photo: null,
    });
    setPreview(achievement.photoUrl);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/achievements/${id}`);
      setAchievements(achievements.filter((ach) => ach._id !== id));
    } catch (error) {
      setError("Error deleting achievement.");
    }
  };

  return (
    <div className="achievement-container">
      <h2>{editId ? "Edit Achievement" : "Add Achievement"}</h2>
      <form onSubmit={handleSubmit} className="achievement-form">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />

        {preview && <img src={preview} alt="Preview" className="preview-img" />}
        <button type="submit">{editId ? "Update Achievement" : "Add Achievement"}</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <div className="achievement-list">
        <h2>Achievements</h2>
        <div className="achievement-cards">
          {achievements.map((ach) => (
            <div key={ach._id} className="achievement-card">
              <img src={ach.photoUrl} alt="Achievement" />
              <h3>{ach.title}</h3>
              <p>{ach.description}</p>
              <p><b>Date:</b> {ach.date}</p>
              <p><b>Location:</b> {ach.location}</p>
              <div className="achievement-buttons">
                <button onClick={() => handleEdit(ach)}>Edit</button>
                <button onClick={() => handleDelete(ach._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default AddAchievementForm;
