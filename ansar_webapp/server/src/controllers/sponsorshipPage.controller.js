const SponsorshipPage = require('../models/sponsorshipPage.model');

exports.getSponsorshipPage = async (req, res) => {
  try {
    const data = await SponsorshipPage.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sponsorship page data.' });
  }
};
