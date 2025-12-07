const mongoose = require('mongoose');

const sponsorshipSchema = new mongoose.Schema(
  {
    // Core fields for all sponsorship items
    name: { type: String, trim: true },
    type: { type: String, enum: ['orphan', 'student', 'family', 'teacher', 'special-needs', 'primary', 'secondary', 'special-education', 'displaced', 'single-parent', 'low-income', 'physical', 'intellectual', 'sensory'] },
    description: { type: String },
    image: { type: String },
    location: { type: String, trim: true },
    age: { type: Number, min: 0 },
    gender: { type: String },
    members: { type: Number, min: 1 },
    subject: { type: String },
    needs: { type: [String] },
    program: { type: String },
    monthlyAmount: { type: Number, min: 0 },
    monthlyCost: { type: Number, min: 0 },
    yearlyAmount: { type: Number, min: 0 },
    isActive: { type: Boolean, default: true },
    isSponsored: { type: Boolean, default: false },
    sponsored: { type: Boolean, default: false },
    story: { type: String },
    sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // For flexibility, allow additional fields
  },
  { timestamps: true, strict: false }
);

// Create index for search
sponsorshipSchema.index({ name: 'text', description: 'text', location: 'text' });

const Sponsorship = mongoose.model('Sponsorship', sponsorshipSchema);

module.exports = Sponsorship;