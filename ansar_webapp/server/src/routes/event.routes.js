const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// Public event routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

// Admin event routes (if needed, add authentication middleware)
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
