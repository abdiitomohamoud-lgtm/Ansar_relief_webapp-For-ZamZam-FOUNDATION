const mongoose = require('mongoose');

const ImpactStatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ImpactStat', ImpactStatSchema);
