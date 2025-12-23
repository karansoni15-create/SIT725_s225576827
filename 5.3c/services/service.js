// services/service.js
const Book = require('../models/book.model');

// GET /api/books
async function getAllBooks() {
  const books = await Book.find({});

  return books.map(book => ({
    id: book._id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    summary: book.summary,
    price: book.price.toString() // ✅ Decimal128 → string
  }));
}

// GET /api/books/:id
async function getBookById(id) {
  const book = await Book.findById(id);

  if (!book) return null;

  return {
    id: book._id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    summary: book.summary,
    price: book.price.toString() 
  };
}

module.exports = {
  getAllBooks,
  getBookById
};
