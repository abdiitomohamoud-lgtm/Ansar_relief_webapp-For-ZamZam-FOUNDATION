const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// GET /:newsId/comments
router.get('/:newsId/comments', commentController.getComments);
// POST /:newsId/comments
router.post('/:newsId/comments', commentController.addComment);

module.exports = router;
