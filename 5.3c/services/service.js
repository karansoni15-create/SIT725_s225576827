const Book = require("../models/book.model");

const getAllBooks = async () => {
  return await Book.find({});
};

const getBookById = async (id) => {
  return await Book.findOne({ id: id });
};

const integrityCheck = async () => {
  const books = await Book.find({});
  return books.every(b => b.price instanceof require("mongoose").Types.Decimal128);
};

module.exports = { getAllBooks, getBookById, integrityCheck };
