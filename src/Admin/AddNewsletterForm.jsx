import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddNewsletterForm.css";
import { API_BASE_URL } from "../api";

const AddNewsletterForm = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedNewsletterId, setSelectedNewsletterId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/newsletters`);
      setNewsletters(res.data);
      setFilteredNewsletters(res.data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredNewsletters(newsletters);
    } else {
      const filtered = newsletters.filter(
        (news) =>
          news.title.toLowerCase().startsWith(search.toLowerCase()) ||
          news.content.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredNewsletters(filtered);
    }
  }, [search, newsletters]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      if (name === "title") {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < 32) {
          setTitleError("Title must be at least 32 words.");
        } else {
          setTitleError("");
        }
      }
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (titleError) return;

    setLoading(true);
    try {
      const newsData = new FormData();
      newsData.append("title", formData.title);
      newsData.append("content", formData.content);
      newsData.append("date", formData.date);
      if (formData.image) {
        newsData.append("image", formData.image);
      }

      await axios.post(`${API_BASE_URL}/newsletters`, newsData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchNewsletters();
      setFormData({ title: "", content: "", date: "", image: null });
      setPreviewImage(null);
      setSelectedNewsletterId(null);
    } catch (error) {
      console.error("Error adding newsletter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedNewsletterId) {
      alert("Please select a newsletter to update.");
      return;
    }
    if (titleError) return;

    setLoading(true);
    try {
      const newsData = new FormData();
      newsData.append("title", formData.title);
      newsData.append("content", formData.content);
      newsData.append("date", formData.date);
      if (formData.image) {
        newsData.append("image", formData.image);
      }

      await axios.put(`${API_BASE_URL}/newsletters/${selectedNewsletterId}`, newsData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchNewsletters();
      setFormData({ title: "", content: "", date: "", image: null });
      setPreviewImage(null);
      setSelectedNewsletterId(null);
    } catch (error) {
      console.error("Error updating newsletter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedNewsletterId) {
      alert("Please select a newsletter to delete.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/newsletters/${selectedNewsletterId}`);
      fetchNewsletters();
      setFormData({ title: "", content: "", date: "", image: null });
      setPreviewImage(null);
      setSelectedNewsletterId(null);
    } catch (error) {
      console.error("Error deleting newsletter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectNewsletter = (news) => {
    setSelectedNewsletterId(news._id);
    setFormData({
      title: news.title,
      content: news.content,
      date: news.date.split("T")[0],
      image: null,
    });
    setPreviewImage(news.imageUrl ? news.imageUrl : null);
  };

  return (
    <div className="adbook-container" style={{ cursor: loading ? "wait" : "default" }}>
      <div className="ad-bk-fm">
        <h2>Newsletter Management</h2>

        <input
          type="text"
          placeholder="🔍 Search newsletters by title, content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <form style={{width:"210px"}} className="book-form">
          <input
            type="text"
            name="title"
            placeholder="Title (Minimum 32 words)"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {titleError && <p className="error-message">{titleError}</p>}

          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Newsletter Preview" />
            </div>
          )}

          <div className="adbk-button-group">
            <button type="button" onClick={handleAdd} disabled={titleError}>
              Add
            </button>
            <button type="button" onClick={handleUpdate} disabled={titleError}>
              Update
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>

      <div className="ad-bk-ds-cont">
        <ul  className="book-list">
          {filteredNewsletters.map((news) => (
            <li
              key={news._id}
              className={`book-item_r ${selectedNewsletterId === news._id ? "selected" : ""}`}

              onClick={() => handleSelectNewsletter(news)}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              <p  className="tit_an">{news.title}</p>
              <p className="con_an">{news.content}</p>
              <p><em>{news.date.split("T")[0]}</em></p>
              {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="book-image" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddNewsletterForm;