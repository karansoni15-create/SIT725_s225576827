// routes/routes.js
const express = require('express');
const router = express.Router();

const controller = require('../controller');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);

module.exports = router;
