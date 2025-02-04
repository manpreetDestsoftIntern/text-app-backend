const express = require('express');
const router = express.Router();
const userController = require('../controllers/Auth.controller.js');

// Update an existing user
router.put('/login', userController.loginUser);

module.exports = router;