const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

// All routes protected
router.get('/', protect, userController.getAllUsers);
router.post('/', protect, userController.addUser);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);
router.get('/:id', protect, userController.getUserById);

module.exports = router;
