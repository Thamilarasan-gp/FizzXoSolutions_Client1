import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import axios from "axios";
import "../Pathippagam/PathippagamBooks.css"; // Use your CSS path
import { API_BASE_URL } from "../api";

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

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books; // If no category selected, show all books

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
    <div className={`rcbk-container ${selectedBook ? "expanded" : ""}`}>
      
      {/* Left Section: Book Details */}
      <div className={`book-details ${selectedBook ? "show" : "hide"}`}>
        {selectedBook && (
          <div>
            <button className="rc-close-btn" onClick={() => setSelectedBook(null)}>
              <X size={24} />
            </button>
            <div className="bk-sh-cont">
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="selected-book-image"
              />
              <div>
                <h2>{selectedBook.title}</h2>
                <h3>{selectedBook.author}</h3>
                <p>{selectedBook.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section: Book Carousel */}
      <div className={`recent-books-container ${selectedBook ? "shrink" : ""}`}>
        <h2 className="title">Pathippagam Books</h2>

        {/* Categories Section */}
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
          <div
            className={`p_books-category-box ${
              selectedCategory === null ? "p_books-selected" : ""
            }`}
            onClick={() => setSelectedCategory(null)} // Option to show all
          >
            All
          </div>
        </div>

        {/* Books Section */}
        <div className="scroll-container">
          <button onClick={() => scroll("left")} className="arrow left">
            <ChevronLeft size={24} />
          </button>

          <div ref={scrollRef} className="books-wrapper">
            {loading ? (
              <p>Loading books...</p>
            ) : filteredBooks.length === 0 ? (
              <p>No books available.</p>
            ) : (
              filteredBooks.map((book, index) => (
                <div
                  key={index}
                  className="book-card"
                  onClick={() => !loading && setSelectedBook(book)}
                  style={{ cursor: loading ? "not-allowed" : "pointer" }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image"
                  />
                  <h3>{book.bookname}</h3>
                  <div className="num">
                    <p className="book-author">{index + 1}</p>
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <button onClick={() => scroll("right")} className="arrow right">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

