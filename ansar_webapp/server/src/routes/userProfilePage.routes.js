const express = require('express');
const router = express.Router();
const userProfilePageController = require('../controllers/userProfilePageController');

// PUT /api/user-profile-page
router.put('/', userProfilePageController.updateUserProfilePage);
// GET /api/user-profile-page
router.get('/', userProfilePageController.getUserProfilePage);

module.exports = router;
