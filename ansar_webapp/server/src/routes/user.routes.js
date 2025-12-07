const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  deleteAvatar,
  deleteMyAccount,
  getUserProfileById
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const upload = require('../middleware/uploadAvatar.middleware');
const multerErrorHandler = require('../middleware/multerErrorHandler.middleware');


// User profile endpoints
router.get('/profile/me', protect, getUserProfile);
router.put('/profile/me', protect, updateUserProfile);
router.post('/profile/avatar', protect, upload.single('avatar'), multerErrorHandler, uploadAvatar);
router.delete('/profile/avatar', protect, deleteAvatar);
router.get('/profile/:id', protect, getUserProfileById);

module.exports = router;