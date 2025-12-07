// DEPRECATED: Use campaignPage.model.js instead.
// This file is no longer used and can be deleted.

const mongoose = require('mongoose');

const campaignsPageContentSchema = new mongoose.Schema({
  hero: {
    headline: String,
    subheading: String,
    badge: String,
    ctaDonate: String,
    ctaVolunteer: String,
    backgroundImage: String
  },
  stats: [
    {
      value: String,
      label: String
    }
  ],
  filters: {
    heading: String,
    searchPlaceholder: String,
    filterButton: String,
    categories: [String],
    allLabel: String
  },
  noResults: {
    message: String,
    clearFilters: String
  },
  ctaBottom: {
    heading: String,
    subtext: String,
    contact: String,
    initiatives: String
  }
}, { collection: 'campaignsPageContent' });

module.exports = mongoose.model('CampaignsPageContent', campaignsPageContentSchema);
