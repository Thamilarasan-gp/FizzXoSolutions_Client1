import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../api";
import "./AddBooks.css"; // Keeping class names the same

const AddAchievementForm = () => {
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    photo: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedAchievementId, setSelectedAchievementId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch achievements on mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Fetch all achievements
  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/achievements`);
      setAchievements(res.data);
      setFilteredAchievements(res.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      Swal.fire("Error", "Failed to fetch achievements. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    const filtered = achievements.filter((achievement) =>
      [achievement.title, achievement.location, achievement.description]
        .some((field) =>
          field?.toLowerCase().startsWith(search.trim().toLowerCase())
        )
    );
    setFilteredAchievements(filtered);
  }, [search, achievements]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });

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
      title: "",
      description: "",
      date: "",
      location: "",
      photo: null,
    });
    setPreviewImage(null);
    setSelectedAchievementId(null);
  };

  // Prepare FormData for requests
  const createFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    return data;
  };

  // Add achievement
// Add achievement
const handleAdd = async (e) => {
  e.preventDefault();
  const titleLength = formData.title.length;
  const descriptionLength = formData.description.length;

  if (titleLength < 20|| titleLength > 100) {
    return Swal.fire("Error", `Title must be between 5 and 20 characters. Current length: ${titleLength}`, "error");
  }
  if (descriptionLength < 50|| descriptionLength > 300) {
    return Swal.fire("Error", `Description must be between 5 and 20 characters. Current length: ${descriptionLength}`, "error");
  }

  setLoading(true);
  try {
    const achievementData = createFormData();
    await axios.post(`${API_BASE_URL}/achievements`, achievementData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchAchievements();
    resetForm();
    Swal.fire("Success!", "Achievement added successfully!", "success");
  } catch (error) {
    console.error("Error adding achievement:", error);
    Swal.fire("Error", "Failed to add achievement. Please try again.", "error");
  } finally {
    setLoading(false);
  }
};const handleUpdate = async (e) => {
  e.preventDefault();
  if (!selectedAchievementId) return Swal.fire("Warning", "Select an achievement to update.", "warning");

  const titleLength = formData.title.length;
  const descriptionLength = formData.description.length;

  if (titleLength < 20 || titleLength > 100) {
    return Swal.fire("Error", `Title must be between 5 and 20 characters. Current length: ${titleLength}`, "error");
  }
  if (descriptionLength < 20 || descriptionLength > 300) {
    return Swal.fire("Error", `Description must be between 5 and 20 characters. Current length: ${descriptionLength}`, "error");
  }

  setLoading(true);
  try {
    const achievementData = createFormData();
    await axios.put(`${API_BASE_URL}/achievements/${selectedAchievementId}`, achievementData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchAchievements();
    resetForm();
    Swal.fire("Success!", "Achievement updated successfully!", "success");
  } catch (error) {
    console.error("Error updating achievement:", error);
    Swal.fire("Error", "Failed to update achievement. Please try again.", "error");
  } finally {
    setLoading(false);
  }
};

  // Delete achievement with confirmation
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedAchievementId) return Swal.fire("Warning", "Select an achievement to delete.", "warning");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/achievements/${selectedAchievementId}`);
        fetchAchievements();
        resetForm();
        Swal.fire("Deleted!", "Achievement deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting achievement:", error);
        Swal.fire("Error", "Failed to delete achievement. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Select achievement for update/delete
  const handleSelectAchievement = (achievement) => {
    setSelectedAchievementId(achievement._id);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date.split("T")[0], // For proper date input
      location: achievement.location,
      photo: null,
    });
    setPreviewImage(achievement.photoUrl || null);
  };

  return (
    <div className="adbook-container" style={{ cursor: loading ? "wait" : "default" }}>
      <div className="ad-bk-fm">
        <h2>Achievement Management</h2>

        <input
          type="text"
          placeholder="🔍 Search achievements by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <form className="book-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
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
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />

          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Achievement Preview" />
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
          {filteredAchievements.map((achievement) => (
            <li
              key={achievement._id}
              className={`book-item ${selectedAchievementId === achievement._id ? "selected" : ""}`}
              onClick={() => handleSelectAchievement(achievement)}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              <strong>{achievement.title}</strong>
             
              {achievement.photoUrl && <img src={achievement.photoUrl} alt={achievement.title} className="book-image" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddAchievementForm;
