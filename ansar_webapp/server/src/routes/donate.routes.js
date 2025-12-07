const express = require('express');
const router = express.Router();
const donateController = require('../controllers/donate.controller');

router.get('/:slug', donateController.getDonateItemBySlug);

module.exports = router;
