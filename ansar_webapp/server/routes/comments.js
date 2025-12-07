const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');


router.get('/:userId', commentsController.getComments);
router.post('/', commentsController.addComment);
// Delete a comment
router.delete('/:commentId', commentsController.deleteComment);
// Update a comment
router.put('/:commentId', commentsController.updateComment);

module.exports = router;
