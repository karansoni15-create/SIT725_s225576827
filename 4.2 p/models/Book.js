// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  author: { type: String, required: [true, 'Author is required'] },
  year: { type: Number, required: [true, 'Year is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  coverImage: { type: String, default: '' }, // optional (url/base64)
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Book', bookSchema);
