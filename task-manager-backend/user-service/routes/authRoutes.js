const express = require('express');
const { register, login, profile, profileWithoutToken } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Register User
router.post('/register', register);

// Login User
router.post('/login', login);

// Get Profile (requires token)
router.get('/profile', authMiddleware, profile);

// Get Profile by ID without token
router.get('/profile/:id', profileWithoutToken);

module.exports = router;
