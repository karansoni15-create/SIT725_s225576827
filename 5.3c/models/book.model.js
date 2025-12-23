const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String,
  summary: String,
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
