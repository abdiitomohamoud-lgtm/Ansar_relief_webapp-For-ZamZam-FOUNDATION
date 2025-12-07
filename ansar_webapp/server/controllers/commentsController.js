const Comment = require('../models/Comment');


exports.getComments = async (req, res) => {
  const { userId } = req.params;
  const comments = await Comment.find({ userId }).sort({ createdAt: -1 });
  res.json(comments);
};

exports.addComment = async (req, res) => {
  const { userId, text } = req.body;
  const comment = new Comment({ userId, text });
  await comment.save();
  res.json(comment);
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const deleted = await Comment.findByIdAndDelete(commentId);
  if (!deleted) return res.status(404).json({ error: 'Comment not found' });
  res.json({ success: true });
};

// Update a comment
exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const updated = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
  if (!updated) return res.status(404).json({ error: 'Comment not found' });
  res.json(updated);
};
