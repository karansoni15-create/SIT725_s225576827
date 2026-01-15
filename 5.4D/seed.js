// seed.js
const mongoose = require('mongoose');
const Book = require('./models/book.model');

const MONGO_URI = 'mongodb://127.0.0.1:27017/booksdb';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    await Book.deleteMany({});

    await Book.insertMany([
      {
        id: 'b1',
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        year: 2008,
        genre: 'Science', 
        summary: 'The first novel in the Remembrance of Earth’s Past trilogy.',
        price: mongoose.Types.Decimal128.fromString('29.99')
      },
      {
        id: 'b2',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        genre: 'Fiction',
        summary: 'An orphaned governess confronts class, morality, and love.',
        price: mongoose.Types.Decimal128.fromString('22.50')
      },
      {
        id: 'b3',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        genre: 'Fiction',
        summary: 'Elizabeth Bennet and Mr. Darcy navigate pride and misunderstanding.',
        price: mongoose.Types.Decimal128.fromString('18.00')
      },
      {
        id: 'b4',
        title: 'The English Patient',
        author: 'Michael Ondaatje',
        year: 1992,
        genre: 'Fiction',
        summary: 'Four people meet in an Italian villa during WWII.',
        price: mongoose.Types.Decimal128.fromString('25.00')
      },
      {
        id: 'b5',
        title: 'Small Gods',
        author: 'Terry Pratchett',
        year: 1992,
        genre: 'Other',
        summary: 'A satirical exploration of belief, power, and religion.',
        price: mongoose.Types.Decimal128.fromString('15.99')
      }
    ]);

    console.log(' Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(' Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
