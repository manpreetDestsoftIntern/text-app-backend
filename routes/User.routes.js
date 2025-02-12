const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller.js');

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Get a user by email
router.put('/email', userController.getUserByEmail);

// Create a new user
router.post('/signup', userController.createUser);

// Update an existing user
router.put('/update-profile', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
