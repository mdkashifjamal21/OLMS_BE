const express = require('express');
const router = express.Router();
const issuedBookController = require('../controllers/issuedBookControllers'); // 🔥 Notice the correct filename!

// Route to get all issued books
router.get('/', issuedBookController.getAllIssuedBooks);

// Route to issue a new book
router.post('/', issuedBookController.addIssuedBook);

// Route to update issued book by ID
router.put('/:id', issuedBookController.updateIssuedBook);

// Route to delete issued book by ID
router.delete('/:id', issuedBookController.deleteIssuedBook);

// Route to get single issued book by ID
router.get('/:id', issuedBookController.getIssuedBookById);

module.exports = router;
