const express = require('express');
const { getUserDetails, updateUserDetails, updatePassword } = require('../controllers/user');
const authMiddleware = require('../middleware/auth'); // Middleware untuk otentikasi
const router = express.Router();

router.get('/', authMiddleware, getUserDetails);
router.put('/', authMiddleware, updateUserDetails);
router.put('/update-password', authMiddleware, updatePassword);

module.exports = router;
