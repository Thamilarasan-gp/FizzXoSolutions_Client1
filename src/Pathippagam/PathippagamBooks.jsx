import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import axios from "axios";
import "../Pathippagam/PathippagamBooks.css"; // Import CSS file
import { API_BASE_URL } from "../api";
import { FaSearch } from "react-icons/fa";

export default function PathippagamHome() {
  const scrollRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/p_books/all`);
        setBooks(res.data);

        // Set first category only once when books are initially loaded
        if (res.data.length > 0 && !selectedCategory) {
          setSelectedCategory(res.data[0].category);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Run only once when component mounts

  const categories = [...new Set(books.map((book) => book.category))];

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSelectedBook(null);
      return;
    }

    const foundBook = books.find((book) =>
      book.bookname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundBook) {
      setSelectedCategory(foundBook.category);
      setSelectedBook(foundBook);
    } else {
      setSelectedBook(null);
    }
  }, [searchTerm, books]);

  // Filter books based on selected category
  const filteredBooks = books.filter(
    (book) => book.category === selectedCategory
  );

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p_books-container" id="pathippagam-books">
      <div className="categories-container">
        <div className="categories-content">
          <h3 className="subtitle">Explore your favorite books 📚</h3>
          <h1 className="title">Categories</h1>
          <a href="/" className="back-link">
            Back To Home
          </a>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Your Favorite Books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p_books-category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p_books-category-box ${
              selectedCategory === category ? "p_books-selected" : ""
            }`}
            onClick={() => setSelectedCategory(category)} // Clicking updates category
          >
            {category}
          </div>
        ))}
      </div>

      {/* Books Section */}
      {selectedCategory && (
        <div className="p_books-section">
          <h2 className="p_books-category-title">{selectedCategory} books</h2>
          <div className="p_books-scroll-container">
            <button
              onClick={() => scroll("left")}
              className="p_books-arrow left"
            >
              <ChevronLeft size={24} />
            </button>

            <div ref={scrollRef} className="p_books-wrapper">
              {loading ? (
                <p>Loading books...</p>
              ) : filteredBooks.length === 0 ? (
                <p>No books available in this category.</p>
              ) : (
                filteredBooks.map((book, index) => (
                  <div
                    key={index}
                    className={`p_books-card ${
                      selectedBook?.bookname === book.bookname
                        ? "p_books-highlight"
                        : ""
                    }`}
                    onClick={() => setSelectedBook(book)}
                  >
                    <img
                      src={book.image}
                      alt={book.bookname}
                      className="p_books-image"
                    />
                    <div className="p_books-content">
                      <h3>{book.bookname}</h3>
                      <p className="author_pb">{book.author}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => scroll("right")}
              className="p_books-arrow right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Selected Book Details */}
      {selectedBook && (
        <div className="p_books-details">
          <button
            className="p_books-close-btn"
            onClick={() => setSelectedBook(null)}
          >
            <X size={24} />
          </button>
          <div className="p_books-info-container">
            <img src={selectedBook.image} alt={selectedBook.bookname} />
            <div>
              <h2>{selectedBook.bookname}</h2>
              <h3>{selectedBook.author}</h3>
              <p>{selectedBook.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
