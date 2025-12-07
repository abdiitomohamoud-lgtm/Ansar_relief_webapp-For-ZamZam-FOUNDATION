const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  newsId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
