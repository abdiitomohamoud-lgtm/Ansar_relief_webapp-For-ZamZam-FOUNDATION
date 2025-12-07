const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');

// Public testimonial routes
router.get('/', testimonialController.getTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

// Admin testimonial routes (if needed, add authentication middleware)
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
