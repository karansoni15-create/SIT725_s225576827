const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
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
      min: 1500,
      max: new Date().getFullYear()
    },
    genre: {
      type: String,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Education",
        "Biography",
        "Science"
      ]
    },
    summary: {
      type: String,
      minlength: 10
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      min: 0
    }
  },
  {
    strict: "throw"   
  }
);

module.exports = mongoose.model("Book", bookSchema);
