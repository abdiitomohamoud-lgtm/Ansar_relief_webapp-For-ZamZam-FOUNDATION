const express = require('express');
const {
  createDonation,
  updateDonationStatus,
  getUserDonations,
  getDonationById,
  getRecentDonations,
  getDonationStats,
  processQuickDonation
} = require('../controllers/donation.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   POST /api/donations
 * @desc    Create a new donation
 * @access  Public
 */
router.post('/', createDonation);

/**
 * @route   POST /api/donations/quick
 * @desc    Process a quick donation
 * @access  Public
 */
router.post('/quick', processQuickDonation);

/**
 * @route   GET /api/donations/user
 * @desc    Get user donations
 * @access  Private
 */
router.get('/user', protect, getUserDonations);

/**
 * @route   GET /api/donations/recent
 * @desc    Get recent donations (public)
 * @access  Public
 */
router.get('/recent', getRecentDonations);

/**
 * @route   GET /api/donations/stats
 * @desc    Get donation statistics
 * @access  Public
 */
router.get('/stats', getDonationStats);

/**
 * @route   GET /api/donations/:id
 * @desc    Get donation by ID
 * @access  Private
 */
router.get('/:id', protect, getDonationById);

/**
 * @route   PUT /api/donations/:id/status
 * @desc    Update donation status
 * @access  Private/Admin
 */
router.put('/:id/status', protect, admin, updateDonationStatus);

module.exports = router; 