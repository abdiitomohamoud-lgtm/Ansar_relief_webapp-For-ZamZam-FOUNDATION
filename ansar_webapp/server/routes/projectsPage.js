const express = require('express');
const router = express.Router();
const ProjectsPage = require('../models/ProjectsPage');

// GET /api/projects-page
router.get('/', async (req, res) => {
  try {
    const pageData = await ProjectsPage.findOne().lean();
    if (!pageData) {
      return res.status(404).json({ error: 'Projects page data not found.' });
    }
    // Remove MongoDB-specific fields
    const { _id, __v, ...cleanData } = pageData;
    res.json(cleanData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects page data.' });
  }
});

module.exports = router;
