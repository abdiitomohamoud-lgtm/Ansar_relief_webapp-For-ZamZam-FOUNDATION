const express = require('express');
const router = express.Router();
const { getAboutPage } = require('../controllers/about.controller');

router.get('/', getAboutPage);

module.exports = router;
