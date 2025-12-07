const express = require('express');
const { getHomePageData } = require('../controllers/home.controller');
const router = express.Router();

router.get('/', getHomePageData);

module.exports = router;
