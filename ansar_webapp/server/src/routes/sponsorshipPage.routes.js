const express = require('express');
const router = express.Router();
const { getSponsorshipPage } = require('../controllers/sponsorshipPage.controller');

router.get('/', getSponsorshipPage);

module.exports = router;
