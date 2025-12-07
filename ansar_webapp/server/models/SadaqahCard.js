const mongoose = require('mongoose');

const SadaqahCardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: String,
  title: String,
  subtitle: String,
  description: String,
  iconName: String,
  icon: String,
  impact: String,
  suggestedAmounts: [Number],
  color: String,
  cta: String,
  isPeriodic: Boolean,
  amount: Number,
  customAmount: Boolean,
  interval: String,
  day: String,
  days: [String],
  location: String,
  donors: Number,
  goal: Number,
  raised: Number,
  daysLeft: Number,
  benefits: [String],
  faq: [{ question: String, answer: String }],
  extraInfo: String
});
module.exports = mongoose.model('SadaqahCard', SadaqahCardSchema);
