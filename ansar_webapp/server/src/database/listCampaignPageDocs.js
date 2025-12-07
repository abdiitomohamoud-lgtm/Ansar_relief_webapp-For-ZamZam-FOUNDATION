const mongoose = require('mongoose');
const CampaignPage = require('../models/campaignPage.model');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function listCampaignPageDocs() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const docs = await CampaignPage.find({});
    console.log('All documents in campaignPage collection:');
    docs.forEach(doc => {
      console.log({
        _id: doc._id,
        type: doc.type,
        id: doc.id,
        title: doc.title,
        name: doc.name,
        hero: doc.hero,
        ctaBottom: doc.ctaBottom
      });
    });
    process.exit(0);
  } catch (err) {
    console.error('Error listing campaignPage documents:', err);
    process.exit(1);
  }
}

listCampaignPageDocs();
