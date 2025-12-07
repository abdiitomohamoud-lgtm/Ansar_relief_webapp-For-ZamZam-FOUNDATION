const express = require('express');
const router = express.Router();
const controller = require('../controllers/sponsorshipCategoryPage.controller');

// Get all category pages
router.get('/', controller.getAllCategoryPages);
// Get single category page by id
router.get('/:id', controller.getCategoryPage);

module.exports = router;
