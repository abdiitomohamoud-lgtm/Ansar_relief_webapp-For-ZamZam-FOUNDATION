const express = require('express');
const router = express.Router();
const { getInitiativesPage } = require('../controllers/initiativesPage.controller');

console.log('initiativesPage route loaded');

// Test route
router.get('/test', (req, res) => res.json({ ok: true, message: 'initiativesPage test route works' }));

// GET /api/initiatives-page
router.get('/', getInitiativesPage);

module.exports = router;
