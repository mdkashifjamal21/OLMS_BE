const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');

// Get all books
router.get('/', bookController.getAllBooks);

// Add a new book
router.post('/', bookController.addBook);

// Update a book by ID
router.put('/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/:id', bookController.deleteBook);

// Get a book by ID (assuming this method exists in bookController)
router.get('/:id', bookController.getBookById);

module.exports = router;
