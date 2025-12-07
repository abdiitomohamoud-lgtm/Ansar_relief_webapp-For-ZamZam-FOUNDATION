const express = require('express');
const router = express.Router();
const approachController = require('../controllers/approach.controller');

router.get('/:slug', approachController.getApproachBySlug);

module.exports = router;
