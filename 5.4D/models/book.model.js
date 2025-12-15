const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Book id is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Book id must be at least 2 characters'],
      maxlength: [20, 'Book id must be at most 20 characters'],
      match: [/^[a-zA-Z0-9_-]+$/, 'Book id contains invalid characters']
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title must be at most 100 characters']
    },

    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters'],
      maxlength: [60, 'Author name must be at most 60 characters']
    },

    year: {
      type: Number,
      required: [true, 'Publication year is required'],
      min: [1450, 'Year must be after the invention of printing'],
      max: [new Date().getFullYear(), 'Year cannot be in the future']
    },

    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: {
        values: ['Fiction', 'Non-Fiction', 'Education', 'Biography', 'Science', 'Other'],
        message: 'Genre is not supported'
      }
    },

    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
      minlength: [10, 'Summary must be at least 10 characters'],
      maxlength: [500, 'Summary must be at most 500 characters']
    },

    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, 'Price is required'],
      validate: {
        validator: function (value) {
          return parseFloat(value.toString()) > 0;
        },
        message: 'Price must be greater than 0 AUD'
      }
    }
  },
  {
    strict: 'throw', // 🚨 rejects extra / malicious fields
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);
