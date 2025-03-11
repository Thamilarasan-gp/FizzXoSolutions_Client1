// import { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../api";
// // import "./AddNewsletterForm.css";
// //const API_BASE_URL = 'https://localhost:9000'; // or your actual API URL
// const AddNewsletterForm = () => {
//   const [newsletters, setNewsletters] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     date: "",
//     image: null,
//   });
  
//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/newsletters`)
//       .then(response => setNewsletters(response.data))
//       .catch(error => console.error("Error fetching newsletters:", error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, image: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!formData.title || !formData.content || !formData.date) {
//       setError("All fields are required.");
//       return;
//     }

//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       let response;
//       if (editId) {
//         response = await axios.put(`${API_BASE_URL}/newsletters/${editId}`, formDataToSend);
//         setNewsletters(prev => prev.map(news => (news._id === editId ? response.data.newsletter : news)));
//         setEditId(null);
//       } else {
//         console.log("Form Data (JSON):", JSON.stringify(formData, null, 2));
//         response = await axios.post(`${API_BASE_URL}/newsletters`, formDataToSend);
//         setNewsletters([...newsletters, response.data.newsletter]);
//       }

//       setSuccess(editId ? "Newsletter updated successfully!" : "Newsletter added successfully!");
//       setFormData({ title: "", content: "", date: "", image: null });
//       setPreview(null);
//     } catch (error) {
//       setError(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   const handleEdit = (news) => {
//     setEditId(news._id);
//     setFormData({ title: news.title, content: news.content, date: news.date, image: null });
//     setPreview(news.imageUrl);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/newsletters/${id}`);
//       setNewsletters(newsletters.filter(news => news._id !== id));
//     } catch (error) {
//       setError("Error deleting newsletter.");
//     }
//   };

//   return (
//     <div className="newsletter-container">
//       <h2>{editId ? "Edit Newsletter" : "Add Newsletter"}</h2>
//       <form onSubmit={handleSubmit} className="newsletter-form">
//         <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
//         <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//         <input type="file" name="image" accept="image/*" onChange={handleChange} />
//         {preview && <img src={preview} alt="Preview" className="preview-img" />}
//         <button type="submit">{editId ? "Update Newsletter" : "Add Newsletter"}</button>
//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}
//       </form>

//       <div className="newsletter-list">
//         {newsletters.map((news) => (
//           <div key={news._id} className="newsletter-card">
//             <img src={news.imageUrl} alt="Newsletter" />
//             <h3>{news.title}</h3>
//             <p>{news.content}</p>
//             <p>{news.date.split('T')[0]}</p>
//             <button onClick={() => handleEdit(news)}>Edit</button>
//             <button onClick={() => handleDelete(news._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddNewsletterForm;


import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import './AddNewsletterForm.css';

const AddNewsletterForm = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/newsletters`)
      .then(response => setNewsletters(response.data))
      .catch(error => console.error("Error fetching newsletters:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.content || !formData.date) {
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
        response = await axios.put(`${API_BASE_URL}/newsletters/${editId}`, formDataToSend);
        setNewsletters(prev => prev.map(news => (news._id === editId ? response.data.newsletter : news)));
        setEditId(null);
      } else {
        response = await axios.post(`${API_BASE_URL}/newsletters`, formDataToSend);
        setNewsletters([...newsletters, response.data.newsletter]);
      }

      setSuccess(editId ? "Newsletter updated successfully!" : "Newsletter added successfully!");
      setFormData({ title: "", content: "", date: "", image: null });
      setPreview(null);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleEdit = (news) => {
    setEditId(news._id);
    setFormData({ title: news.title, content: news.content, date: news.date.split('T')[0], image: null });
    setPreview(news.imageUrl);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/newsletters/${id}`);
      setNewsletters(newsletters.filter(news => news._id !== id));
    } catch (error) {
      setError("Error deleting newsletter.");
    }
  };

  return (
    <div className="addnewsletter-container">
      <h2>{editId ? "Edit Newsletter" : "Add Newsletter"}</h2>
      <form onSubmit={handleSubmit} className="addnewsletter-form">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        {preview && <img src={preview} alt="Preview" className="addnewsletter-preview-img" />}
        <button type="submit">{editId ? "Update Newsletter" : "Add Newsletter"}</button>
        {error && <p className="addnewsletter-error">{error}</p>}
        {success && <p className="addnewsletter-success">{success}</p>}
      </form>

      <div className="addnewsletter-list">
        {newsletters.map((news) => (
          <div key={news._id} className="addnewsletter-card">
            <img src={news.imageUrl} alt="Newsletter" />
            <h3>{news.title}</h3>
            <p>{news.content}</p>
            <p>{news.date.split('T')[0]}</p>
            <button onClick={() => handleEdit(news)}>Edit</button>
            <button onClick={() => handleDelete(news._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNewsletterForm;
