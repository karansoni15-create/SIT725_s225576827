// controller/index.js
const booksController = require('./bookscontroller');

module.exports = {
  getAllBooks: booksController.getAllBooks,
  getBookById: booksController.getBookById
};
