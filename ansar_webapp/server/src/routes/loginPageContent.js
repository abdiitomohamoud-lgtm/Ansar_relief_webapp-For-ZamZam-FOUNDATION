const express = require('express');
const router = express.Router();
const LoginPageContent = require('../../models/LoginPageContent');

// GET /api/login-page-content
router.get('/', async (req, res) => {
  try {
    const content = await LoginPageContent.findOne().lean();
    if (!content) {
      return res.status(404).json({ error: 'No login page content found' });
    }

    // Flatten leftPanel fields to top-level for frontend compatibility
    const {
      leftPanel = {},
      heading,
      subheading,
      tabs,
      emailForm,
      mobileForm,
      signupForm,
      helpText,
      socialLogins,
      securityFeatures,
      footer
    } = content;

    const response = {
      heading,
      subheading,
      leftPanel, // include the full leftPanel object
      tabs,
      emailForm,
      mobileForm,
      signupForm,
      helpText,
      socialLogins,
      securityFeatures,
      footer
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch login page content' });
  }
});

module.exports = router;
