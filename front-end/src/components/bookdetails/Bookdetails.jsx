import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export const Bookdetails = () => {
    const [bookstore, setBookstore] = useState([])
    const [book, setBook] = useState({
        book_name: '',
        book_author: '',
        book_page_number: '',
        book_price: '',
        book_edition: '',
        book_description: ''
    })

    /* for searching pusrpose */
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]);

 console.log(results)

    // const [totalid,setTotalid]=useState([])
    const [status, setStatus] = useState(false)

    const getAllBookDetails = async () => {
        try {
            const res = await axios.get("http://localhost:4004/api/books")
            setBookstore(res.data)
            // console.log(res);

        } catch (err) {
            console.log(err);

        }
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const res = await axios.delete("http://localhost:4004/api/books/" + id);
                    console.log(res);

                    if (res.status === 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        getAllBookDetails();
                    }
                }
            });
        } catch (err) {

        }
    }



    // const searchData = async (e) => {
    //     try {
    //         // alert(e.target.value)
    //         const res = await axios.get("http://localhost:3004/book_details/" + e.target.value);
    //         console.log("Book found:", res);
    //         setBook(res.data)
    //         if (res.status === 200) {
    //             setStatus(true)

    //         }
    //         // setBookstore(res.data)

    //     } catch (err) {
    //         console.error("Error fetching book:", err.message);
    //     }
    // };


    // Search by book name
    const handleSearch = async (query) => {
        setSearchText(query); // keep input updated

        if (!query) {
            setResults([]);
            setErrorMsg('');
            return;
        }

        try {
            const res = await axios.get(`http://localhost:4004/api/books/search/${query}`);
            //console.log(res.data.result);
            if (res.status === 200) {
                setStatus(true)
                setResults(res.data.result);


            }


        } catch (err) {
            setResults([]);
            setErrorMsg('No books found.');
        }
    };

    useEffect(() => {
        getAllBookDetails();
    }, [])
    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">📚 Book List</h3>
            <div class="container mb-4">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="input-group shadow-sm">

                            {/* <input type="text" class="form-control form-control-lg" placeholder="🔍 Search books by title or author" name='search' onChange={searchData} />
                            <button class="btn btn-primary" type="button">
                                <i class="bi bi-search"></i>
                            </button> */}
                            {/* <select name="search" id="" className='form-control' onChange={searchData}>
                                <option value="">------- Select Id --------</option>
                                {
                                    bookstore.map((v,i)=>
                                        <option value={v.id}>{v.id}</option>
                                    )
                                }
                            </select> */}
                            <input
                                type="text"
                                placeholder="🔍 Search book by name"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyUp={(e) => handleSearch(e.target.value)}
                                className="form-control form-control-lg"
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Price (₹)</th>
                            <th>Edition</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            status ? (
                                <>
                                    {
                                        results.map((val , index) => {
                                            return (
                                                <tr key={val._id}>
                                                    <td>{index+1}</td>
                                                    <td>{val.book_name}</td>
                                                    <td>{val.book_author}</td>
                                                    <td>{val.book_page_number}</td>
                                                    <td>{val.book_price}</td>
                                                    <td>{val.book_edition}</td>
                                                    <td>{val.book_description}</td>
                                                          <td>
                                                    <Link to={`/edit/${val._id}`}> <i class="bi bi-pencil-fill"></i></Link>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <a href="#" onClick={() => { handleDelete(val._id) }}><i class="bi bi-trash-fill text-danger"></i></a>

                                                </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        bookstore.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.book_name}</td>
                                                <td>{item.book_author}</td>
                                                <td>{item.book_page_number}</td>
                                                <td>{item.book_price}</td>
                                                <td>{item.book_edition}</td>
                                                <td>{item.book_description}</td>
                                                <td>
                                                    <Link to={`/edit/${item._id}`}> <i class="bi bi-pencil-fill"></i></Link>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <a href="#" onClick={() => { handleDelete(item._id) }}><i class="bi bi-trash-fill text-danger"></i></a>

                                                </td>
                                            </tr>
                                        )
                                    }
                                </>
                            )

                        }

                    </tbody>
                </table>
            </div>
        </div>

    )
}
