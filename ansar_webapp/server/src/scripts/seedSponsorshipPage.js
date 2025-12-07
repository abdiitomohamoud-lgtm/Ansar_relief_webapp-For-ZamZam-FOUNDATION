// seedSponsorshipPage.js
// Seeds the sponsorshipPage collection with the full page data from sponsorshipData.json

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const SponsorshipPage = require('../models/sponsorshipPage.model');

const dataPath = path.join(__dirname, '../../scripts/sponsorshipData.json');
let sponsorshipPageData;
try {
  sponsorshipPageData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (err) {
  console.error('Error reading sponsorshipData.json:', err);
  process.exit(1);
}

async function seedSponsorshipPage() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
    console.log('Connected to MongoDB');

    await SponsorshipPage.deleteMany({});
    console.log('Cleared existing sponsorshipPage collection.');

    const result = await SponsorshipPage.create(sponsorshipPageData);
    console.log('Inserted sponsorship page data:', result._id);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB. Seeding complete.');
  } catch (err) {
    console.error('Error during seeding:', err);
    mongoose.disconnect();
  }
}

seedSponsorshipPage();
