const express = require('express');
const router = express.Router();
const issuedBookController = require('../controllers/issuedBookControllers');
const { protect } = require('../middleware/authMiddleware');

// All routes protected
router.get('/', protect, issuedBookController.getAllIssuedBooks);
router.post('/', protect, issuedBookController.addIssuedBook);
router.put('/:id', protect, issuedBookController.updateIssuedBook);
router.delete('/:id', protect, issuedBookController.deleteIssuedBook);
router.get('/:id', protect, issuedBookController.getIssuedBookById);

module.exports = router;
