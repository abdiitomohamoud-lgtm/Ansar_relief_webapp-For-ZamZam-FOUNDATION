const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userProfile.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/user/profile
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
