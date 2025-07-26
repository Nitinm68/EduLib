// // require("dotenv").config({ debug: false });

// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const bodyParser = require("body-parser");
// // const contactRoutes = require("./routes/contactRoutes");

// // const app = express();

// // /* ---------- MongoDB CONNECTION ---------- */
// // mongoose.set("strictQuery", false);
// // mongoose.Promise = global.Promise;

// // if (!process.env.MONGO_URI) {
// //   throw new Error(" MONGO_URI is not defined in .env");
// // }

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log(" MongoDB connected"))
// //   .catch((err) => {
// //     console.error(" DB connection error:", err.message);
// //     process.exit(1);
// //   });

// // /* ---------- GLOBAL MIDDLEWARE ---------- */
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(express.static(__dirname));

// // /* ---------- ROUTES ---------- */
// // app.use("/api/", require("./routes/libraryRoutes"));

// // /* ---------- START SERVER ---------- */
// // const PORT = process.env.PORT;
// // if (!PORT) {
// //   throw new Error(" PORT is not defined in .env");
// // }

// // app.listen(PORT, () =>
// //   console.log(` Server running → http://localhost:${PORT}`)
// // );

// // /* ---------- ERROR HANDLERS ---------- */
// // app.use((req, res, next) => {
// //   setImmediate(() => next(new Error("Route not found")));
// // });

// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(err.statusCode || 500).send(err.message);
// // });

require("dotenv").config({ debug: false });

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

/* ---------- MongoDB CONNECTION ---------- */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

if (!process.env.MONGO_URI) {
  throw new Error(" MONGO_URI is not defined in .env");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => {
    console.error(" DB connection error:", err.message);
    process.exit(1);
  });

/* ---------- GLOBAL MIDDLEWARE ---------- */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Book model
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    coverImage: String, // this will store filename of uploaded image
  })
);

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // this uploads folder should exist or be auto-created
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

/* ---------- ROUTES ---------- */
app.use("/api/", require("./routes/libraryRoutes"));
app.use("/api/contact", contactRoutes); // ✅ ← Contact route added
// This route handles book uploads with image
app.post("/add-book", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newBook = new Book({
      title,
      author,
      description,
      coverImage,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error(" PORT is not defined in .env");
}

app.listen(PORT, () =>
  console.log(` Server running → http://localhost:${PORT}`)
);

/* ---------- ERROR HANDLERS ---------- */
// app.use((req, res, next) => {
//   setImmediate(() => next(new Error("Route not found")));
// });
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});
