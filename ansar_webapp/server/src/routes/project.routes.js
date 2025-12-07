const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

// Get all projects
router.get('/', projectController.getProjects);

// Get project by ID or slug
router.get('/:idOrSlug', projectController.getProjectByIdOrSlug);

module.exports = router;
