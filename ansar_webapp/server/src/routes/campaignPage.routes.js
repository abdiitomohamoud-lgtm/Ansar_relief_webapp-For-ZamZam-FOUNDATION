console.log('Loaded campaignPage.routes.js (route file)');

const express = require('express');
const router = express.Router();
const campaignPageController = require('../controllers/campaignPage.controller');

// GET /api/campaign-page/content
router.get('/content', campaignPageController.getContent);
// GET /api/campaign-page/campaigns
router.get('/campaigns', campaignPageController.getCampaigns);
// GET /api/campaign-page/campaigns/:id
router.get('/campaigns/:id', campaignPageController.getCampaignById);
// GET /api/campaign-page/categories
router.get('/categories', campaignPageController.getCategories);

module.exports = router;
