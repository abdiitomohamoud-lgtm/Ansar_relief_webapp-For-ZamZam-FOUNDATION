// seedSponsorshipCategoryPages.js
// Seeds the sponsorshipCategoryPage collection with each category page data from sponsorshipCategoryPagesData.json

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const SponsorshipCategoryPage = require('../models/sponsorshipCategoryPage.model');


const dataPath = path.join(__dirname, '../../scripts/sponsorshipCategoryPagesData.json');
let categoryPages;
try {
  categoryPages = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (err) {
  console.error('Error reading sponsorshipCategoryPagesData.json:', err);
  process.exit(1);
}

async function seedSponsorshipCategoryPages() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
    console.log('Connected to MongoDB');

    await SponsorshipCategoryPage.deleteMany({});
    console.log('Cleared existing sponsorshipCategoryPage collection.');

    // Insert all category pages directly
    const result = await SponsorshipCategoryPage.insertMany(categoryPages);
    console.log(`Inserted ${result.length} sponsorship category pages.`);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB. Seeding complete.');
  } catch (err) {
    console.error('Error during seeding:', err);
    mongoose.disconnect();
  }
}

seedSponsorshipCategoryPages();
