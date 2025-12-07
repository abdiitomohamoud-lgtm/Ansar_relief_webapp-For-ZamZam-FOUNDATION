const express = require('express');
const router = express.Router();
const eventRegistrationController = require('../controllers/eventRegistration.controller');

// POST /api/event-registration
router.post('/', eventRegistrationController.createRegistration);

module.exports = router;
