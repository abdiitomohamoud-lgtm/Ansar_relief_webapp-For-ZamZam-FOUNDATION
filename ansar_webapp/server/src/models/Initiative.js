const mongoose = require('mongoose');

const InitiativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  impact: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Initiative', InitiativeSchema);
