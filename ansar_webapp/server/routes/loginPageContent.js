const express = require('express');
const router = express.Router();
const LoginPageContent = require('../models/LoginPageContent');

// GET /api/login-page-content
router.get('/', async (req, res) => {
  try {
    const content = await LoginPageContent.findOne();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch login page content' });
  }
});

module.exports = router;
