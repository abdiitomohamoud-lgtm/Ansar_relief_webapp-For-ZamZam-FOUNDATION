const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

router.post('/change-password', securityController.changePassword);
router.post('/delete-account', securityController.deleteAccount);
router.post('/enable-2fa', securityController.enable2FA);

module.exports = router;
