const mongoose = require('mongoose');

/**
 * Team model
 */
const TeamSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    primaryKey: true
  },
  name: { type: String, required: true },
  title: {
    type: String,
    required: true
  },
  bio: { type: String },
  image: { type: String },
  email: { type: String },
  phone: { type: String },
  department: { type: String },
  socialMedia: { type: Object },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  role: { type: String, enum: ['board', 'executive', 'staff', 'volunteer'], default: 'staff' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);