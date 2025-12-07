const express = require('express');
const router = express.Router();
const initiativesController = require('../controllers/initiatives.controller');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', initiativesController.getInitiatives);
router.get('/:slug', initiativesController.getInitiativeBySlug);

// Protected admin routes
router.post('/', protect, admin, initiativesController.createInitiative);
router.put('/:id', protect, admin, initiativesController.updateInitiative);
router.delete('/:id', protect, admin, initiativesController.deleteInitiative);

module.exports = router;
