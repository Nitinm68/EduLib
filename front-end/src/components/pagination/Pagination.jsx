// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import ReactPaginate from 'react-paginate';

// export const Pagination = () => {
//   const [state, setState] = useState([])
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const getTotal = (async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/photos")
//     // console.log(res);
//     // console.log(res.data.length);
//     setTotal(res.data.length / 4)

//   })

//   const getAllrecord = (async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/photos?_page=" + page + "&_limit=4")
//     setState(res.data)
//   })

//     const handlePageClick=(data)=>{
//         // console.log(data);
//           setPage(data.selected + 1);
//       }

//   useEffect(() => {
//     getTotal();
//     getAllrecord();
//   }, [page])
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="my_title">
//             Latest Card data
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         {
//           state.map((v, i) =>
//             <div className="col-md-3">
//               <div className="card m-2" style={{ width: "100%" }}>
//                 <img src={v.url} className="card-img-top" alt="..." style={{ height: "100px" }} />
//                 <div className="card-body">
//                   <h5 className="card-title">{v.id}</h5>
//                   <h5 className="card-title" style={{ fontSize: "14px" }}>{v.title.substring(0, 50)}</h5>
//                   <p className="card-text">
//                     Some quick example text to build on the card title and make up the bulk of
//                     the card’s content.
//                   </p>
//                   <a href="#" className="btn btn-primary">
//                     Go somewhere
//                   </a>
//                 </div>
//               </div>

//             </div>
//           )
//         }
//       </div>
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         pageCount={total}
//         marginPagesDisplayed={3}
//         pageRangeDisplayed={6}
//         onPageChange={handlePageClick}
//         containerClassName={'pagination'}
//         pageClassName={'page-item'}
//         pageLinkClassName={'page-link'}
//         previousClassName={'page-item'}
//         previousLinkClassName={'page-link'}
//         nextClassName={'page-item'}
//         nextLinkClassName={'page-link'}
//         breakClassName={'page-item'}
//         breakLinkClassName={'page-link'}
//         activeClassName={'active'}
//       />
//     </div>
//   )
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const OnlineBooksPagination = () => {
  const [onlineBooks, setOnlineBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const maxResultsPerPage = 4;

  // Fetch books from Google Books API
  const fetchBooks = async () => {
    const startIndex = page * maxResultsPerPage;
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&startIndex=${startIndex}&maxResults=${maxResultsPerPage}`
    );
    setOnlineBooks(res.data.items || []);
    setTotalItems(res.data.totalItems || 0);
  };

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-12">
          <h2 className="text-center">Latest Online Books</h2>
        </div>
      </div>
      <div className="row">
        {onlineBooks.map((book, index) => {
          const info = book.volumeInfo;
          return (
            <div className="col-md-3" key={index}>
              <div className="card m-2" style={{ width: "100%" }}>
                <img
                  src={
                    info.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x195.png?text=No+Cover"
                  }
                  className="card-img-top"
                  alt="Book Cover"
                  style={{ height: "195px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "16px" }}>
                    {info.title?.substring(0, 40)}
                  </h5>
                  <p className="card-text" style={{ fontSize: "13px" }}>
                    {info.authors ? info.authors.join(", ") : "Unknown Author"}
                  </p>
                  <a
                    href={info.previewLink}
                    className="btn btn-primary btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Preview
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalItems / maxResultsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};
