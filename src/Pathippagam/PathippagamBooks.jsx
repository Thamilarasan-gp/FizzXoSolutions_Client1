
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import axios from "axios";
import "../Pathippagam/PathippagamBooks.css"; // Import the corresponding CSS file
import { API_BASE_URL } from "../api";
export default function PathippagamHome() {
  const scrollRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/p_books/all`);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = [...new Set(books.map((book) => book.category))];

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : [];

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
    <div className="p_books-container">
      {/* Categories */}
      <div className="p_books-category-grid">
      <h2 className="category-books-title">Category of Books</h2>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p_books-category-box ${
              selectedCategory === category ? "p_books-selected" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Books Section */}
      {selectedCategory && (
        <div className="p_books-section">
          <h2 className="p_books-category-title">{selectedCategory} Books</h2>
          <div className="p_books-scroll-container">
            <button onClick={() => scroll("left")} className="p_books-arrow left">
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
                    className="p_books-card"
                    onClick={() => !loading && setSelectedBook(book)}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="p_books-image"
                    />
                    <h3>{book.bookname}</h3>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => scroll("right")} className="p_books-arrow right">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Selected Book Details */}
      {selectedBook && (
        <div className="p_books-details">
          <button className="p_books-close-btn" onClick={() => setSelectedBook(null)}>
            <X size={24} />
          </button>
          <div className="p_books-info-container">
            <img src={selectedBook.image} alt={selectedBook.title} />
            <div>
              <h2>{selectedBook.title}</h2>
              <h3>{selectedBook.author}</h3>
              <p>{selectedBook.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
