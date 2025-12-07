// DEPRECATED: Use campaignPage.routes.js instead.
// This file is no longer used and can be deleted.

const express = require('express');
const router = express.Router();
const campaignsPageContentController = require('../controllers/campaignsPageContent.controller');

// GET /api/campaigns-page-content
router.get('/', campaignsPageContentController.getCampaignsPageContent);

module.exports = router;
