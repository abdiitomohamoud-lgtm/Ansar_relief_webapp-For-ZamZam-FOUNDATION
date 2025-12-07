const ContactPageContent = require('../models/contactPageContent.model');

exports.getContactPageContent = async (req, res) => {
  try {
    const content = await ContactPageContent.findOne();
    if (!content) return res.status(404).json({ error: 'Contact page content not found' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
