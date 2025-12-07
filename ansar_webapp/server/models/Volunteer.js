const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  availability: [{ type: String, required: true }],
  interests: [{ type: String, required: true }],
  skills: { type: String },
  experience: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
