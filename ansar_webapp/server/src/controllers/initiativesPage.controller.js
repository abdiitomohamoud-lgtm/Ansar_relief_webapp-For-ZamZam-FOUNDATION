const InitiativesPage = require('../models/initiativesPage.model');

// Initiatives Page controller
exports.getInitiativesPage = async (req, res) => {
  try {
    // Fetch the latest initiatives page document from the 'initiativespages' collection in ansar_db_2025
    const pageData = await InitiativesPage.findOne().lean();
    if (!pageData) {
      return res.status(404).json({ error: 'No initiatives page data found' });
    }
    res.json(pageData);
  } catch (error) {
    console.error('Error fetching initiatives page data:', error);
    res.status(500).json({ error: 'Server error fetching initiatives page data' });
  }
};
