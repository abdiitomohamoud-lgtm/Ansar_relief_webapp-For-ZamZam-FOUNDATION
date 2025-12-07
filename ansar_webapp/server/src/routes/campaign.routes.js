const express = require('express');
const {
  getCampaigns,
  getCampaignByIdOrSlug,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getFeaturedCampaigns,
  getUrgentCampaigns
} = require('../controllers/campaign.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   GET /api/campaigns
 * @desc    Get all campaigns with filters
 * @access  Public
 */
router.get('/', getCampaigns);

/**
 * @route   GET /api/campaigns/featured
 * @desc    Get featured campaigns
 * @access  Public
 */
router.get('/featured', getFeaturedCampaigns);

/**
 * @route   GET /api/campaigns/urgent
 * @desc    Get urgent campaigns
 * @access  Public
 */
router.get('/urgent', getUrgentCampaigns);

/**
 * @route   GET /api/campaigns/:idOrSlug
 * @desc    Get campaign by ID or slug
 * @access  Public
 */
router.get('/:idOrSlug', getCampaignByIdOrSlug);

/**
 * @route   POST /api/campaigns
 * @desc    Create a new campaign
 * @access  Private/Admin
 */
router.post('/', protect, admin, createCampaign);

/**
 * @route   PUT /api/campaigns/:id
 * @desc    Update a campaign
 * @access  Private/Admin
 */
router.put('/:id', protect, admin, updateCampaign);

/**
 * @route   DELETE /api/campaigns/:id
 * @desc    Delete a campaign
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, deleteCampaign);

module.exports = router; 