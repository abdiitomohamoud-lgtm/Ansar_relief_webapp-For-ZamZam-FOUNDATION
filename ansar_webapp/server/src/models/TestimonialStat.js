const mongoose = require('mongoose');

const TestimonialStatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('TestimonialStat', TestimonialStatSchema);
