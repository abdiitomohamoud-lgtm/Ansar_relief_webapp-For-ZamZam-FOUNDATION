const express = require('express');
const router = express.Router();
const ProjectCategoryPage = require('../models/ProjectCategoryPage');

// GET /api/projectCategories/:category
router.get('/:category', async (req, res) => {
  try {
    const categoryPage = await ProjectCategoryPage.findOne({ category: req.params.category });
    if (!categoryPage) return res.status(404).json({ error: 'Category not found' });
    res.json(categoryPage);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
