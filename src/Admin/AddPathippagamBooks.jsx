// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddPathippagamBooks.css";
// import { API_BASE_URL } from "../../api";

// const AddPathippagamBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
//   const [formData, setFormData] = useState({
//     bookname: "",
//     title: "",
//     author: "",
//     description: "",
//     image: null,
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [search, setSearch] = useState("");
//   const [selectedBookId, setSelectedBookId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//    fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/p_books/all`);
//       setBooks(res.data);
//       setFilteredBooks(res.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (search.trim() === "") {
//       setFilteredBooks(books); // Show all books when search is cleared
//     } else {
//       const filtered = books.filter(
//         (book) =>
//           book.bookname.toLowerCase().startsWith(search.toLowerCase()) ||
//           book.title.toLowerCase().startsWith(search.toLowerCase()) ||
//           book.author.toLowerCase().startsWith(search.toLowerCase())
//       );
//       setFilteredBooks(filtered);
//     }
//   }, [search, books]); // Runs when search or books list changes

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       const file = e.target.files[0];
//       setFormData({ ...formData, image: file });

//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewImage(reader.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         setPreviewImage(null);
//       }
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const bookData = new FormData();
//       bookData.append("bookname", formData.bookname);
//       bookData.append("title", formData.title);
//       bookData.append("author", formData.author);
//       bookData.append("description", formData.description);
//       if (formData.image) {
//         bookData.append("image", formData.image);
//       }
//       for (let pair of bookData.entries()) {
//         console.log(pair[0] + ": " + pair[1]);
//       }
//       await axios.post(`${API_BASE_URL}/p_books/added`, bookData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       fetchBooks();
//       setFormData({
//         bookname: "",
//         title: "",
//         author: "",
//         description: "",
//         image: null,
//       });
//       setPreviewImage(null);
//       setSelectedBookId(null);
//     } catch (error) {
//       console.error("Error adding book:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!selectedBookId) {
//       alert("Please select a book to update.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const bookData = new FormData();
//       bookData.append("bookname", formData.bookname);
//       bookData.append("title", formData.title);
//       bookData.append("author", formData.author);
//       bookData.append("description", formData.description);
//       if (formData.image) {
//         bookData.append("image", formData.image);
//       }

//       await axios.put(
//         `${API_BASE_URL}/p_books/update/${selectedBookId}`,
//         bookData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       fetchBooks();
//       setFormData({
//         bookname: "",
//         title: "",
//         author: "",
//         description: "",
//         image: null,
//       });
//       setPreviewImage(null);
//       setSelectedBookId(null);
//     } catch (error) {
//       console.error("Error updating book:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (!selectedBookId) {
//       alert("Please select a book to delete.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.delete(`${API_BASE_URL}/p_books/delete/${selectedBookId}`);
//       fetchBooks();
//       setFormData({
//         bookname: "",
//         title: "",
//         author: "",
//         description: "",
//         image: null,
//       });
//       setPreviewImage(null);
//       setSelectedBookId(null);
//     } catch (error) {
//       console.error("Error deleting book:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectBook = (book) => {
//     setSelectedBookId(book._id);
//     setFormData({
//       bookname: book.bookname,
//       title: book.title,
//       author: book.author,
//       description: book.description,
//       image: null, // Image needs to be reselected
//     });
//     setPreviewImage(book.image ? book.image : null);
//   };

//   return (
//     <div
//       className="adbook-container"
//       style={{ cursor: loading ? "wait" : "default" }}
//     >
//       <div className="ad-bk-fm">
//         <h2>Bookstore Management</h2>

//         <input
//           type="text"
//           placeholder="Search books by name, title, author"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-bar"
//         />

//         <form className="book-form">
//           <input
//             type="text"
//             name="bookname"
//             placeholder="Book Name"
//             value={formData.bookname}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="author"
//             placeholder="Author"
//             value={formData.author}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//           />

//           {previewImage && (
//             <div className="ad-image-preview">
//               <img src={previewImage} alt="Book Preview" />
//             </div>
//           )}

//           <div className="adbk-button-group">
//             <button type="button" onClick={handleAdd}>
//               Add
//             </button>
//             <button type="button" onClick={handleUpdate}>
//               Update
//             </button>
//             <button type="button" onClick={handleDelete}>
//               Delete
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className="ad-bk-ds-cont">
//         <ul className="book-list">
//           {filteredBooks.map((book) => (
//             <li
//               key={book._id}
//               className={`book-item ${
//                 selectedBookId === book._id ? "selected" : ""
//               }`}
//               onClick={() => handleSelectBook(book)}
//               style={{ pointerEvents: loading ? "none" : "auto" }}
//             >
//               <strong>{book.bookname}</strong> - {book.title} by {book.author}
//               <p>{book.description}</p>
//               {book.image && (
//                 <img
//                   src={book.image}
//                   alt={book.bookname}
//                   className="book-image"
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddPathippagamBooks;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPathippagamBooks.css";
import { API_BASE_URL } from "../api";

const AddPathippagamBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookname: "",
    title: "",
    author: "",
    description: "",
    category: "",
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
      const res = await axios.get(`${API_BASE_URL}/p_books/all`);
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
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.bookname.toLowerCase().startsWith(search.toLowerCase()) ||
          book.title.toLowerCase().startsWith(search.toLowerCase()) ||
          book.author.toLowerCase().startsWith(search.toLowerCase()) ||
          book.category.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [search, books]);

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

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === "image") {
            bookData.append(key, formData[key]);
          } else {
            bookData.append(key, formData[key].toString());
          }
        }
      });

      if (action === "add") {
        await axios.post(`${API_BASE_URL}/p_books/added`, bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (action === "update" && selectedBookId) {
        await axios.put(`${API_BASE_URL}/p_books/update/${selectedBookId}`, bookData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (action === "delete" && selectedBookId) {
        await axios.delete(`${API_BASE_URL}/p_books/delete/${selectedBookId}`);
      }

      fetchBooks();
      resetForm();
    } catch (error) {
      console.error(`Error during ${action} operation:`, error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      bookname: "",
      title: "",
      author: "",
      description: "",
      category: "",
      image: null,
    });
    setPreviewImage(null);
    setSelectedBookId(null);
  };

  const handleSelectBook = (book) => {
    setSelectedBookId(book._id);
    setFormData({
      bookname: book.bookname,
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category || "",
      image: null,
    });
    setPreviewImage(book.image ? book.image : null);
  };

  return (
    <div className="adbook-container" style={{ cursor: loading ? "wait" : "default" }}>
      <div className="ad-bk-fm">
        <h2>Bookstore Management</h2>

        <input
          type="text"
          placeholder="Search books by name, title, author, category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <form className="book-form">
          <input type="text" name="bookname" placeholder="Book Name" value={formData.bookname} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          {previewImage && (
            <div className="ad-image-preview">
              <img src={previewImage} alt="Book Preview" />
            </div>
          )}

          <div className="adbk-button-group">
            <button type="button" onClick={(e) => handleSubmit(e, "add")}>Add</button>
            <button type="button" onClick={(e) => handleSubmit(e, "update")}>Update</button>
            <button type="button" onClick={(e) => handleSubmit(e, "delete")}>Delete</button>
          </div>
        </form>
      </div>

      <div className="ad-bk-ds-cont">
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li key={book._id} className={`book-item ${selectedBookId === book._id ? "selected" : ""}`} onClick={() => handleSelectBook(book)}>
              <strong>{book.bookname}</strong> - {book.title} by {book.author} (Category: {book.category})
              <p>{book.description}</p>
              {book.image && <img src={book.image} alt={book.bookname} className="book-image" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddPathippagamBooks;

