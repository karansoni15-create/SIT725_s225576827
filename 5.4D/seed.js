const mongoose = require("mongoose");
const Book = require("./models/book.model");

const MONGO_URL = "mongodb://127.0.0.1:27017/sit725_books";

const books = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "The first novel in the Remembrance of Earth's Past trilogy.",
    price: mongoose.Types.Decimal128.fromString("29.99")
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "An orphaned governess confronts class and morality.",
    price: mongoose.Types.Decimal128.fromString("22.50")
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    summary: "Elizabeth Bennet and Mr. Darcy navigate pride and misunderstanding.",
    price: mongoose.Types.Decimal128.fromString("18.00")
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "Four people meet in an Italian villa during WWII.",
    price: mongoose.Types.Decimal128.fromString("25.00")
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "A story about religion, belief, and philosophy.",
    price: mongoose.Types.Decimal128.fromString("15.99")
  }
];

mongoose.connect(MONGO_URL).then(async () => {
  console.log("Connected for seeding");

  await Book.deleteMany({});
  await Book.insertMany(books);

  console.log("Seeding complete");
  mongoose.connection.close();
});
