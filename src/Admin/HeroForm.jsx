import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./HeroForm.css"; // Import styles
import { API_BASE_URL } from "../../api";

const HeroForm = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/heros/gallery`);
        setPosts(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchImages();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await axios.post(`${API_BASE_URL}/heros/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPosts([...posts, res.data.image]); // Update UI
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/heros/files/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed!");
    }
  };

  // Handle edit mode
  const handleEdit = (post) => {
    setEditId(post._id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  // Save edited details
  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/heros/files/${editId}`, {
        title: editTitle,
        description: editDescription,
      });

      setPosts(posts.map((post) => (post._id === editId ? res.data.image : post)));
      setEditId(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed!");
    }
  };

  // Delete all images
  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/heros/deleteAll`);
      setPosts([]);
    } catch (error) {
      console.error("Delete all error:", error);
      alert("Delete all failed!");
    }
  };

  return (
    <div className="upload-page1">
      {/* Upload Form */}
      <div className="upload-container1">
        <h2>Upload Image</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit">Upload</button>
        </form>
      </div>

      {/* Image Gallery */}
      {posts.length > 0 && (
        <div className="gallery">
          <h2>Uploaded Images</h2>
          <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
          <div className="gallery-grid">
            {posts.map((post) => (
              <motion.div key={post._id} className="image-card" whileHover={{ scale: 1.05 }}>
                <img src={post.imageUrl} alt="Uploaded" />
                {editId === post._id ? (
                  <div className="edit-mode">
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="image-info">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroForm;
