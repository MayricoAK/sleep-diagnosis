const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// logout route
router.post('/logout', authController.logout);

module.exports = router;