const mongoose = require('mongoose');

const ContactUserInfoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  subject: { type: String, required: true },
  organization: String,
  address: String,
  city: String,
  country: String,
  message: { type: String, required: true },
  additional: String,
  newsletter: Boolean,
  updates: Boolean,
  contactMethod: String,
  createdAt: { type: Date, default: Date.now }
}, { collection: 'contact_user_info' });

module.exports = mongoose.model('ContactUserInfo', ContactUserInfoSchema);
