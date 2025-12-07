const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  city: String,
  country: String,
  availability: [String],
  interests: [String],
  skills: String,
  experience: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
