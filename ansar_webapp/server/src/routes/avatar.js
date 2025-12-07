const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const avatarController = require('../../controllers/avatarController');

// Configure multer for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/avatars'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// POST /api/user/avatar
router.post('/', upload.single('avatar'), avatarController.uploadAvatar);

module.exports = router;
