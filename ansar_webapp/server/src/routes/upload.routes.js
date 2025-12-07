const express = require('express');
const {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  avatarUploadMiddleware
} = require('../controllers/upload.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload a single file (avatar)
 * @access  Private
 */
router.post('/', protect, avatarUploadMiddleware, uploadFile);

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple files
 * @access  Private
 */
router.post('/multiple', protect, uploadMultipleFiles);

/**
 * @route   DELETE /api/upload/:id
 * @desc    Delete a file
 * @access  Private
 */
router.delete('/:id', protect, deleteFile);

module.exports = router; 