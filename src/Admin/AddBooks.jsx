import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBooks.css";
import { API_BASE_URL } from "../../api";

const AddBooks = () => {
  const [books, setBooks] = useState([]);
<<<<<<< HEAD
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
=======
  const [filteredBooks, setFilteredBooks] = useState([]);
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
  const [formData, setFormData] = useState({
    bookname: "",
    title: "",
    author: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await axios.get(`${API_BASE_URL}/books/all`);
=======
      const res = await axios.get(`${API_BASE_URL}/api/books/all`);
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
<<<<<<< HEAD
      setFilteredBooks(books); // Show all books when search is cleared
=======
      setFilteredBooks(books);
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
    } else {
      const filtered = books.filter(
        (book) =>
          book.bookname.toLowerCase().startsWith(search.toLowerCase()) ||
          book.title.toLowerCase().startsWith(search.toLowerCase()) ||
          book.author.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
<<<<<<< HEAD
  }, [search, books]); // Runs when search or books list changes
=======
  }, [search, books]);
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565

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
    setLoading(true);
    try {
      const bookData = new FormData();
      bookData.append("bookname", formData.bookname);
      bookData.append("title", formData.title);
      bookData.append("author", formData.author);
      bookData.append("description", formData.description);
      if (formData.image) {
        bookData.append("image", formData.image);
      }

<<<<<<< HEAD
      await axios.post(`${API_BASE_URL}/books/add`, bookData, {
=======
      await axios.post(`${API_BASE_URL}/api/books/add`, bookData, {
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchBooks();
      setFormData({
        bookname: "",
        title: "",
        author: "",
        description: "",
        image: null,
      });
      setPreviewImage(null);
      setSelectedBookId(null);
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      alert("Please select a book to update.");
      return;
    }
    setLoading(true);
    try {
      const bookData = new FormData();
      bookData.append("bookname", formData.bookname);
      bookData.append("title", formData.title);
      bookData.append("author", formData.author);
      bookData.append("description", formData.description);
      if (formData.image) {
        bookData.append("image", formData.image);
      }

<<<<<<< HEAD
      await axios.put(
        `${API_BASE_URL}/books/update/${selectedBookId}`,
        bookData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
=======
      await axios.put(`${API_BASE_URL}/api/books/update/${selectedBookId}`, bookData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565

      fetchBooks();
      setFormData({
        bookname: "",
        title: "",
        author: "",
        description: "",
        image: null,
      });
      setPreviewImage(null);
      setSelectedBookId(null);
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      alert("Please select a book to delete.");
      return;
    }
    setLoading(true);
    try {
<<<<<<< HEAD
      await axios.delete(
        `http://localhost:5000/api/books/delete/${selectedBookId}`
      );
=======
      await axios.delete(`${API_BASE_URL}/api/books/delete/${selectedBookId}`);
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
      fetchBooks();
      setFormData({
        bookname: "",
        title: "",
        author: "",
        description: "",
        image: null,
      });
      setPreviewImage(null);
      setSelectedBookId(null);
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBookId(book._id);
    setFormData({
      bookname: book.bookname,
      title: book.title,
      author: book.author,
      description: book.description,
<<<<<<< HEAD
      image: null, // Image needs to be reselected
=======
      image: null,
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
    });
    setPreviewImage(book.image ? book.image : null);
  };

  return (
<<<<<<< HEAD
    <div
      className="adbook-container"
      style={{ cursor: loading ? "wait" : "default" }}
    >
=======
    <div className="adbook-container" style={{ cursor: loading ? "wait" : "default" }}>
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
      <div className="ad-bk-fm">
        <h2>Bookstore Management</h2>

        <input
          type="text"
          placeholder="Search books by name, title, author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <form className="book-form">
<<<<<<< HEAD
          <input
            type="text"
            name="bookname"
            placeholder="Book Name"
            value={formData.bookname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
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
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
=======
          <input type="text" name="bookname" placeholder="Book Name" value={formData.bookname} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565

          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Book Preview" />
            </div>
          )}

          <div className="adbk-button-group">
<<<<<<< HEAD
            <button type="button" onClick={handleAdd}>
              Add
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
=======
            <button type="button" onClick={handleAdd}>Add</button>
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={handleDelete}>Delete</button>
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
          </div>
        </form>
      </div>

      <div className="ad-bk-ds-cont">
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li
              key={book._id}
<<<<<<< HEAD
              className={`book-item ${
                selectedBookId === book._id ? "selected" : ""
              }`}
=======
              className={`book-item ${selectedBookId === book._id ? "selected" : ""}`}
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
              onClick={() => handleSelectBook(book)}
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              <strong>{book.bookname}</strong> - {book.title} by {book.author}
              <p>{book.description}</p>
<<<<<<< HEAD
              {book.image && (
                <img
                  src={book.image}
                  alt={book.bookname}
                  className="book-image"
                />
              )}
=======
              {book.image && <img src={book.image} alt={book.bookname} className="book-image" />}
>>>>>>> f73780c7b81c254389df05742bb74a61ba552565
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddBooks;
