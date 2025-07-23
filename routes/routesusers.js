const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Get all users
router.get('/', userController.getAllUsers);

// Add a new user
router.post('/', userController.addUser);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

// Get a user by ID (based on your earlier controller function)
router.get('/:id', userController.getUserById);

module.exports = router;
