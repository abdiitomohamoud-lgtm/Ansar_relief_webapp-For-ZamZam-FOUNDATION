const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  attendees: { type: Number, default: 1 },
  comments: { type: String },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
