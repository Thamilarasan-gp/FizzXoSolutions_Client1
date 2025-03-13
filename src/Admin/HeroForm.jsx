import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBooks.css"; // Use AddBooks styling
import { API_BASE_URL } from "../../api";

const HeroForm = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // For search filtering
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/heros/gallery`);
      setPosts(res.data);
      setFilteredPosts(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().startsWith(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [search, posts]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
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
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Please select an image.");
    setLoading(true);

    try {
      const imageData = new FormData();
      imageData.append("title", formData.title);
      imageData.append("description", formData.description);
      imageData.append("file", formData.image);

      await axios.post(`${API_BASE_URL}/heros/upload`, imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchImages();
      setFormData({ title: "", description: "", image: null });
      setPreviewImage(null);
      setSelectedPostId(null);
    } catch (error) {
      console.error("Error adding image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedPostId) {
      alert("Please select an image to update.");
      return;
    }
    setLoading(true);

    try {
      const imageData = new FormData();
      imageData.append("title", formData.title);
      imageData.append("description", formData.description);
      if (formData.image) {
        imageData.append("file", formData.image);
      }

      await axios.put(`${API_BASE_URL}/heros/files/${selectedPostId}`, imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchImages();
      setFormData({ title: "", description: "", image: null });
      setPreviewImage(null);
      setSelectedPostId(null);
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedPostId) {
      alert("Please select an image to delete.");
      return;
    }
    setLoading(true);

    try {
      await axios.delete(`${API_BASE_URL}/heros/files/${selectedPostId}`);
      fetchImages();
      setFormData({ title: "", description: "", image: null });
      setPreviewImage(null);
      setSelectedPostId(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPost = (post) => {
    setSelectedPostId(post._id);
    setFormData({
      title: post.title,
      description: post.description,
      image: null, // Image needs to be reselected
    });
    setPreviewImage(post.imageUrl ? post.imageUrl : null);
  };

  return (
    <div className="adbook-container" style={{ cursor: loading ? "wait" : "default" }}>
      <div className="ad-bk-fm">
        <h2>Hero Image Management</h2>

        <input
          type="text"
          placeholder="🔍 Search images by title, description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <form className="book-form">
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
          ></textarea>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}

          <div className="adbk-button-group">
            <button type="button" onClick={handleAdd}>
              Add
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>

      <div className="ad-bk-ds-cont">
        <ul className="book-list">
          {filteredPosts.map((post) => (
            <li
              key={post._id}
              className={`book-item ${selectedPostId === post._id ? "selected" : ""}`}
              onClick={() => handleSelectPost(post)}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              <p style={{height:"20px" , width:"200px",overflow:"hidden",fontWeight:'600'}} >{post.title}</p>
              <p style={{height:"45px" , width:"200px",overflow:"hidden"}}>{post.description}</p>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="book-image" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroForm;