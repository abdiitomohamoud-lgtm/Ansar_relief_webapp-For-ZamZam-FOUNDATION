const express = require('express');
const router = express.Router();
const { getUserForms } = require('../controllers/userForms.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/user/forms?type=event|volunteer|contact (public access)
router.get('/', getUserForms);

module.exports = router;
