const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const CampaignPage = require('../../models/campaignPage.model');

const content = require('./campaignPageContent.json');
const campaigns = require('./campaigns.json');
const categories = require('./campaignCategories.json');

const MONGO_URI = 'mongodb://localhost:27017/ansar_db_2025';

async function seedCampaignPage() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to:', MONGO_URI);
    console.log('Using collection:', CampaignPage.collection.collectionName);
    // Delete all existing campaignPage documents
    await CampaignPage.deleteMany({});
    // Insert content
    await CampaignPage.discriminators.CampaignPageContent.create(content);
    // Insert campaigns
    await CampaignPage.discriminators.CampaignPageCampaign.create(campaigns);
    // Insert categories
    await CampaignPage.discriminators.CampaignPageCategory.create(categories);
    console.log('Campaign page content, campaigns, and categories seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding campaign page:', err);
    process.exit(1);
  }
}

seedCampaignPage();
