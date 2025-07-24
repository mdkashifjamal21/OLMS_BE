const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.get('/', protect, bookController.getAllBooks);

// Protected routes
router.post('/', protect, bookController.addBook);
router.put('/:id', protect, bookController.updateBook);
router.delete('/:id', protect, bookController.deleteBook);
router.get('/:id', protect, bookController.getBookById);

module.exports = router;
