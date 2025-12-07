const express = require('express');
const router = express.Router();
const { getContactPageContent } = require('../controllers/contactPageContent.controller');

router.get('/', getContactPageContent);

module.exports = router;
