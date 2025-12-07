const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const campaignsPageContent = require('./campaignsPageContent.json');

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

const CampaignsPageContent = mongoose.model('CampaignsPageContent', campaignsPageContentSchema);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function seedCampaignsPageContent() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await CampaignsPageContent.deleteMany({});
    await CampaignsPageContent.create(campaignsPageContent);
    console.log('Campaigns page static content seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding campaigns page content:', err);
    process.exit(1);
  }
}

seedCampaignsPageContent();
