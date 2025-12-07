const AboutPage = require('../models/aboutPage.model');

// Example About controller
exports.getAbout = (req, res) => {
  res.json({ message: 'About endpoint' });
};

// About controller
const getAboutPage = async (req, res) => {
  try {
    // Fetch the first AboutPage document from the collection
    const aboutPage = await AboutPage.findOne();
    if (!aboutPage) {
      return res.status(404).json({ message: 'About page data not found' });
    }
    res.json(aboutPage);
  } catch (error) {
    console.error('Error fetching about page:', error);
    res.status(500).json({ message: 'Server error fetching about page data' });
  }
};

module.exports = { getAboutPage };
