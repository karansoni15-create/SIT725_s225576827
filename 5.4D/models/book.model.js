// models/book.model.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1500,
    max: new Date().getFullYear()
  },
  genre: {
    type: String,
    required: true,
    enum: ['Fiction', 'Non-Fiction', 'Education', 'Biography', 'Science', 'Other']
  },
  summary: {
    type: String,
    required: true,
    minlength: 10
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
