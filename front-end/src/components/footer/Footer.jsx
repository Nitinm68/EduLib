// import React from 'react'
// // import "./footer.css"
// export const Footer = () => {
//   return (
//     <>

//  <footer
//   style={{
//     marginTop: "5%",
//     backgroundColor: "black",
//     color: "white",
//     padding: "40px 0",
//   }}
// >
//   <div className="container">
//     <div className="row">
//       {/* Column 1: About */}
//       <div className="col-md-4 mb-3">
//         <h5>About Library</h5>
//         <p>
//           Our Library Management System helps manage books, track borrowings,
//           and provide a digital catalog for students and staff. Trusted by
//           institutions for its simplicity and power.
//         </p>
//       </div>

//       {/* Column 2: Quick Links */}
//       <div className="col-md-4 mb-3">
//         <h5>Quick Links</h5>
//         <ul className="list-unstyled">
//           <li>
//             <a href="#" className="text-white text-decoration-none">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-white text-decoration-none">
//               Catalog
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-white text-decoration-none">
//               My Account
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-white text-decoration-none">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Column 3: Contact Info */}
//       <div className="col-md-4 mb-3">
//         <h5>Contact Us</h5>
//         <p>
//           <strong>Email:</strong> support@library.com <br />
//           <strong>Phone:</strong> +91 9876543210 <br />
//           <strong>Address:</strong> BBD Campus, Lucknow, UP
//         </p>
//       </div>
//     </div>
//     <hr className="text-white" />
//     <div className="text-center mt-3">
//       <p className="mb-0">&copy; 2025 Library Management. All rights reserved.</p>
//     </div>
//   </div>
// </footer>

// </>

//   )
// }
import React from "react";
// import './footer.css'; // Optional for custom styles

export const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "5%",
        backgroundColor: "#111",
        color: "#f1f1f1",
        padding: "40px 0",
        fontFamily: "sans-serif",
      }}
    >
      <div className="container px-4">
        <div className="row text-start text-md-left">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">About EduLib</h5>
            <p>
              EduLib is a solo-built book hub 📚 to explore, learn, and manage
              your favorite reads. Built with 💖 and caffeine ☕ by Nitin ji.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {["Home", "Catalog", "My Account", "Contact"].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-white text-decoration-none d-block py-1"
                    style={{ transition: "0.3s" }}
                    onMouseOver={(e) => (e.target.style.color = "#0dcaf0")}
                    onMouseOut={(e) => (e.target.style.color = "#fff")}
                  >
                    ➤ {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Connect With Me</h5>
            <p>
              <strong>Email:</strong> nitin@edulib.com <br />
              <strong>Phone:</strong> +91 9876543210 <br />
              <strong>Location:</strong> BBD University, Lucknow 📍
            </p>
          </div>
        </div>

        <hr className="text-white" />
        <div className="text-center mt-3">
          <p className="mb-0">
            Made with{" "}
            <span style={{ color: "red", animation: "pulse 1s infinite" }}>
              ♥
            </span>{" "}
            by Nitin | © 2025 EduLib.
          </p>
        </div>
      </div>

      {/* Heart animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </footer>
  );
};
