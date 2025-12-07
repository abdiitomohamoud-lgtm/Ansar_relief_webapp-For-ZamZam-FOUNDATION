const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');

// Public news routes
router.get('/', newsController.getNews);
router.get('/:id', newsController.getNewsById);

// Admin news routes (if needed, add authentication middleware)
router.post('/', newsController.createNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
