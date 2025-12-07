const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/:userId', roleController.getRole);
router.post('/', roleController.updateRole);

module.exports = router;
