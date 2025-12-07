const mongoose = require('mongoose');

/**
 * Testimonial model
 */
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  message: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);