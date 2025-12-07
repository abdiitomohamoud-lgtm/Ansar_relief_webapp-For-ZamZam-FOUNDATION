const fs = require('fs');
const path = require('path');
const CampaignPage = require('../models/campaignPage.model');

// Helper to load JSON data from file
function loadJson(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../database/seedData', file), 'utf-8'));
}

// GET /api/campaign-page/content
exports.getContent = async (req, res) => {
  try {
    // Try both discriminator and legacy type for compatibility
    let content = await CampaignPage.findOne({ type: 'CampaignPageContent' }).lean();
    if (!content) {
      content = await CampaignPage.findOne({ type: 'Content' }).lean();
    }
    if (!content) return res.status(404).json({ error: 'No campaign page content found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load campaign page content' });
  }
};

// GET /api/campaign-page/campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignPage.find({ type: 'CampaignPageCampaign' }).lean();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load campaigns' });
  }
};

// GET /api/campaign-page/campaigns/:id
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await CampaignPage.findOne({ type: 'CampaignPageCampaign', id: req.params.id }).lean();
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load campaign' });
  }
};

// GET /api/campaign-page/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await CampaignPage.find({ type: 'CampaignPageCategory' }).lean();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load campaign categories' });
  }
};