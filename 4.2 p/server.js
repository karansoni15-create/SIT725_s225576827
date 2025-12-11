// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// API routes

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create book
app.post('/api/books', async (req, res) => {
  try {
    // server-side validation
    const { title, author, year, description, coverImage } = req.body;
    if (!title || !author || !year || !description) {
      return res.status(400).json({ error: 'title, author, year and description are required' });
    }
    const newBook = new Book({ title, author, year, description, coverImage });
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    // Mongoose validation error might appear here
    res.status(400).json({ error: err.message });
  }
});

// Optional: GET single book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
