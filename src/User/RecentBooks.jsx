import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import axios from "axios";
import "./RecentBooks.css";
import { API_BASE_URL } from "../../api";

export default function RecentBooks() {
  const scrollRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await axios.get(`${API_BASE_URL}/books/all`);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBooks();
  }, []);

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
            <button
              className="rc-close-btn"
              onClick={() => setSelectedBook(null)}
            >
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
        <h2 className="title">Recent Books</h2>
        <div className="scroll-container">
          <button onClick={() => scroll("left")} className="arrow left">
            <ChevronLeft size={24} />
          </button>

          <div ref={scrollRef} className="books-wrapper">
            {loading ? (
              <p>Loading books...</p>
            ) : (
              books.map((book, index) => (
                <div
                  key={index}
                  className="book-card"
                  onClick={() => !loading && setSelectedBook(book)} // Prevent clicks while loading
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
