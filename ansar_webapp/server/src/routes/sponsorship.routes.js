const express = require('express');
const {
  getSponsorships,
  getSponsorshipById,
  createSponsorship,
  updateSponsorship,
  deleteSponsorship,
  sponsor,
  getSponsorshipsByType
} = require('../controllers/sponsorship.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   GET /api/sponsorships
 * @desc    Get all sponsorships
 * @access  Public
 */
router.get('/', getSponsorships);

/**
 * @route   GET /api/sponsorships/type/:type
 * @desc    Get sponsorships by type
 * @access  Public
 */
router.get('/type/:type', getSponsorshipsByType);

/**
 * @route   GET /api/sponsorships/:id
 * @desc    Get sponsorship by ID
 * @access  Public
 */
router.get('/:id', getSponsorshipById);

/**
 * @route   POST /api/sponsorships
 * @desc    Create a new sponsorship
 * @access  Private/Admin
 */
router.post('/', protect, admin, createSponsorship);

/**
 * @route   POST /api/sponsorships/sponsor
 * @desc    Sponsor a child/family
 * @access  Private
 */
router.post('/sponsor', protect, sponsor);

/**
 * @route   PUT /api/sponsorships/:id
 * @desc    Update a sponsorship
 * @access  Private/Admin
 */
router.put('/:id', protect, admin, updateSponsorship);

/**
 * @route   DELETE /api/sponsorships/:id
 * @desc    Delete a sponsorship
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, deleteSponsorship);

module.exports = router; 