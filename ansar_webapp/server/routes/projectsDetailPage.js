const express = require('express');
const router = express.Router();
const ProjectsDetailPage = require('../models/ProjectsDetailPage');

// GET all project detail pages
router.get('/', async (req, res) => {
  try {
    const projects = await ProjectsDetailPage.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project detail pages' });
  }
});

// GET single project detail page by id
router.get('/:id', async (req, res) => {
  try {
    const project = await ProjectsDetailPage.findOne({ id: req.params.id });
    if (!project) {
      return res.status(404).json({ error: 'Project detail page not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project detail page' });
  }
});

module.exports = router;
