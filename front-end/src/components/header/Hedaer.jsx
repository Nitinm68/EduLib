import React from "react";
import { Link } from "react-router-dom";

export const Hedaer = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="#">
          <span className="book_management">EduLib System</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/add-book">
                    Add Book
                  </Link>
                </li>
                <br></br>
                <li>
                  <Link className="dropdown-item" to="/book-details">
                    Book Details
                  </Link>
                </li>
                <br></br>
                <li>
                  <Link className="dropdown-item" to="/browse-book">
                    Online books
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <br></br>
                <li>
                  <Link className="dropdown-item" to="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
          </ul>

          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            /> 
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};
