const mongoose = require('mongoose');

const initiativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String },
  status: { type: String, enum: ['active', 'completed', 'upcoming'], default: 'active' },
  startDate: { type: Date },
  endDate: { type: Date },
  goals: [{ type: String }],
  impact: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Initiative', initiativeSchema);