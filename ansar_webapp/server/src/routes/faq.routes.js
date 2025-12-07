const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faq.controller');

// Public FAQ routes
router.get('/', faqController.getFAQs);
router.get('/:id', faqController.getFAQById);

// Admin FAQ routes (if needed, add authentication middleware)
router.post('/', faqController.createFAQ);
router.put('/:id', faqController.updateFAQ);
router.delete('/:id', faqController.deleteFAQ);

module.exports = router;
