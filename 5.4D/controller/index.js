const Book = require("../models/book.model");

/* ---------- GET ALL BOOKS ---------- */
exports.getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(200).json({
    statusCode: 200,
    data: books
  });
};

/* ---------- GET BOOK BY ID ---------- */
exports.getBookById = async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
};

/* ---------- CREATE BOOK ---------- */
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate book id" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------- UPDATE BOOK ---------- */
exports.updateBook = async (req, res) => {
  if ("id" in req.body) {
    return res.status(400).json({ message: "ID cannot be updated" });
  }

  try {
    const updated = await Book.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------- INTEGRITY CHECK ---------- */
exports.checkIntegrity = (req, res) => {
  res.status(204).send();
};
