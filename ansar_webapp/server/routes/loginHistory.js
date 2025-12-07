const express = require('express');
const router = express.Router();
const loginHistoryController = require('../controllers/loginHistoryController');

router.get('/:userId', loginHistoryController.getLoginHistory);

module.exports = router;
