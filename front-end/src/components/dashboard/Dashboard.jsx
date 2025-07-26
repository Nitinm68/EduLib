import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4004/books")
      .then((res) => {
        const recentBooks = res.data.slice(-3).reverse(); // Latest 3 books
        setBooks(recentBooks);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-color-gray">
          📚 Welcome to EduLib
        </h1>
        <p className="lead text-muted">
          Explore, Manage, and Grow your library collection with ease!
        </p>
        <Link to="/add-book" className="btn btn-secondary btn-lg m-2">
          Add New Book
        </Link>
        <Link to="/browse-book" className="btn btn-success btn-lg m-2">
          Browse Library
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📘 Total Books</h5>
              <p className="card-text fs-4">{books.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👩‍🏫 Authors</h5>
              <p className="card-text fs-4">12+</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⭐ User Reviews</h5>
              <p className="card-text fs-4">4.8 / 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Books Preview */}
      <h3 className="mb-3 text-center text-color-red">📖 Latest Books</h3>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{book.book_name}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.book_author}
                  <br />
                  <strong>Edition:</strong> {book.book_edition}
                  <br />
                  <strong>Price:</strong> ₹{book.book_price}
                </p>
                <p className="card-text text-truncate">
                  {book.book_description}
                </p>
                <Link
                  to={`/book-details/${book._id}`}
                  className="btn btn-sm btn-outline-secondary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
