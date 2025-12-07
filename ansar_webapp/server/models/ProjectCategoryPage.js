const mongoose = require('mongoose');

const ProjectCategoryPageSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  title: String,
  description: String,
  heroImage: String,
  impactStats: mongoose.Schema.Types.Mixed,
  cta: mongoose.Schema.Types.Mixed,
  projectIds: [String],
  reusableContent: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('ProjectCategoryPage', ProjectCategoryPageSchema);
