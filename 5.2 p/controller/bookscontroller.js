// controller/bookscontroller.js
const service = require('../services/service');

// GET /api/books
async function getAllBooks(req, res, next) {
  try {
    const books = service.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}

// GET /api/books/:id
async function getBookById(req, res, next) {
  try {
    const id = req.params.id;
    const book = service.getBookById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBooks,
  getBookById
};
