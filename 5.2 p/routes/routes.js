// routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller');

// GET /api/books  -> list all books
router.get('/', controller.getAllBooks);

// GET /api/books/:id -> single book by id
router.get('/:id', controller.getBookById);

module.exports = router;
