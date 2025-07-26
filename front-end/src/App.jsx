import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hedaer } from "./components/header/Hedaer";
import Login from "./components/login/Login";
import { Footer } from "./components/footer/Footer";
import { Dashboard } from "./components/dashboard/Dashboard";
import { About } from "./components/about/About";
import Contacts from "./components/contact/Contact.jsx";
import { Pagenotfound } from "./components/pagenotfound/Pagenotfound";
import { Addbook } from "./components/addbook/Addbook";
import { Bookdetails } from "./components/bookdetails/Bookdetails";
import { Edit } from "./components/edit/Edit";
import { OnlineBooksPagination } from "./components/pagination/Pagination";

import Signup from "./components/login/Signup.jsx";
function App() {
  return (
    <BrowserRouter>
      <Hedaer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contacts />} />
        <Route path="/add-book" element={<Addbook />} />
        <Route path="/browse-book" element={<OnlineBooksPagination />} />
        <Route path="/book-details" element={<Bookdetails />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/pagination" element={<Pagination />} /> */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
