const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth.middleware');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Brute-force protection for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts, please try again later.'
});

/**
 * @route   POST /api/auth/google-login
 * @desc    Login user with Google
 * @access  Public
 */
router.post('/google-login', authController.loginWithGoogle);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', authController.signup);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginLimiter, authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post('/logout', authController.logout);

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', authController.protect, authController.getMe, authController.getUser);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authController.protect, authController.updateMe);

/**
 * @route   PATCH /api/auth/update-password
 * @desc    Update password
 * @access  Private
 */
router.patch('/update-password', authController.protect, authController.updatePassword);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @route   PATCH /api/auth/reset-password/:token
 * @desc    Reset password
 * @access  Public
 */
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;