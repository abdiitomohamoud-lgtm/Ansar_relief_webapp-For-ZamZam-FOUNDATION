const SponsorshipCategoryPage = require('../models/sponsorshipCategoryPage.model');

// GET /api/sponsorship-category/:id
exports.getCategoryPage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await SponsorshipCategoryPage.findOne({ id });
    if (!page) return res.status(404).json({ error: 'Category page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/sponsorship-category
exports.getAllCategoryPages = async (req, res) => {
  try {
    const pages = await SponsorshipCategoryPage.find({});
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
