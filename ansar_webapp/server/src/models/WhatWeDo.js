const mongoose = require('mongoose');

const WhatWeDoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  stats: { type: String, required: true },
  gradient: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('WhatWeDo', WhatWeDoSchema);
