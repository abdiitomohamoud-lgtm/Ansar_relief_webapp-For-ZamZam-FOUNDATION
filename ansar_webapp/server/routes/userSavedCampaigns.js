const express = require('express');
const router = express.Router();
const UserProfilePage = require('../models/userProfilePage');

// GET /api/user-saved-campaigns?email=...
router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const profile = await UserProfilePage.findOne({ 'profileInfo.email': email });
  res.json({ savedCampaigns: profile ? profile.savedCampaigns : [] });
});

// POST /api/user-saved-campaigns/remove
router.post('/remove', async (req, res) => {
  const { email, campaignId } = req.body;
  if (!email || !campaignId) return res.status(400).json({ error: 'Email and campaignId required' });
  const profile = await UserProfilePage.findOneAndUpdate(
    { 'profileInfo.email': email },
    { $pull: { savedCampaigns: { id: campaignId } } },
    { new: true }
  );
  res.json({ savedCampaigns: profile ? profile.savedCampaigns : [] });
});

module.exports = router;
