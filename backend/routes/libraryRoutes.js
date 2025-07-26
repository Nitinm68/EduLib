const express = require("express");
const router = express.Router();
const Library = require("../model/Library");

router.post("/books", async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.body.book_name);

    //   const data= new Library({
    //                     book_name: req.body.book_name,
    //                     book_author: req.body.book_author,
    //                     book_page_number: req.body.book_page_number,
    //                     book_price: req.body.book_price,
    //                     book_edition: req.body.book_edition,
    //                     book_description: req.body.book_description,
    // }).save();

    const book = new Library(req.body); // destructing

    await book.save();
    // res.status(201).json(Library);
    return res.status(201).send({
      message: "Book inserted successfully !",
      success: true,
      book,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get All Books
router.get("/books", async (req, res) => {
  try {
    const books = await Library.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Only One data by id
router.get("/books/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const book_details = await Library.findById(req.params.id);
    if (!book_details) {
      return res.status(404).json({ message: "Book not found" });
    }
    // res.json({ message: "Book deleted successfully", deletedBook });
    return res.status(200).send({
      message: "Book Details found  !",
      success: true,
      book_details,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// code for update

// Update Book by ID
router.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    // console.log(bookId);
    // console.log(req.body);

    const updatedBook = await Library.findByIdAndUpdate(
      bookId,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    console.log(updatedBook);

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book updated successfully!",
      success: true,
      updatedBook,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      success: false,
    });
  }
});

// DELETE a book by ID
router.delete("/books/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const deletedBook = await Library.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    // res.json({ message: "Book deleted successfully", deletedBook });
    return res.status(200).send({
      message: "Book inserted successfully !",
      success: true,
      deletedBook,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search book by name (case-insensitive)
router.get("/books/search/:name", async (req, res) => {
  try {
    const searchTerm = req.params.name;
    console.log(searchTerm);

    const matchedBooks = await Library.find({
      book_name: { $regex: searchTerm, $options: "i" }, // i = case-insensitive
    });

    console.log(matchedBooks);

    if (matchedBooks.length === 0) {
      return res.status(404).json({
        message: "No books found with that name",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Books found",
      success: true,
      result: matchedBooks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
