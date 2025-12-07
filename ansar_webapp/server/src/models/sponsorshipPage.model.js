const mongoose = require('mongoose');

const sponsorshipPageSchema = new mongoose.Schema(
  {
    hero: { type: Object },
    impactStats: { type: Array },
    categories: { type: Array },
    benefits: { type: Array },
    processSteps: { type: Array },
    testimonials: { type: Array },
  },
  { timestamps: true, strict: false }
);

const SponsorshipPage = mongoose.model('SponsorshipPage', sponsorshipPageSchema, 'sponsorshippages');

module.exports = SponsorshipPage;
