const mongoose = require('mongoose');

/**
 * News model
 */
const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 500 },
  image: { type: String },
  publishDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  author: { type: String },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: { type: [String] },
  metaTitle: { type: String },
  metaDescription: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);