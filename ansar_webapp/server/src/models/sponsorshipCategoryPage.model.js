const mongoose = require('mongoose');

const sponsorshipCategoryPageSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    path: { type: String },
    image: { type: String },
    stats: { type: String },
    impact: { type: String },
    monthlyAmount: { type: Number },
    features: { type: Array },
    filters: { type: Array },
    items: { type: Array },
    hero: { type: Object },
    impactStats: { type: Array },
    benefits: { type: Object },
    processSteps: { type: Array },
    testimonials: { type: Array },
  },
  { timestamps: true, strict: false }
);

const SponsorshipCategoryPage = mongoose.model('SponsorshipCategoryPage', sponsorshipCategoryPageSchema);

module.exports = SponsorshipCategoryPage;
