const mongoose = require('mongoose');

/**
 * Partner model
 */
const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Partner', PartnerSchema);