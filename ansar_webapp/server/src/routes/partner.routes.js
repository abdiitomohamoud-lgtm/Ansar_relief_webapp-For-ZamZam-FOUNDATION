const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partner.controller');

// Public partner routes
router.get('/', partnerController.getPartners);
router.get('/:id', partnerController.getPartnerById);

// Admin partner routes (if needed, add authentication middleware)
router.post('/', partnerController.createPartner);
router.put('/:id', partnerController.updatePartner);
router.delete('/:id', partnerController.deletePartner);

module.exports = router;
