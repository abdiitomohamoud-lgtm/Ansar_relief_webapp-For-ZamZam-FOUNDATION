const mongoose = require('mongoose');
const InitiativesPage = require('../models/initiativesPage.model');
const fs = require('fs');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';
const dataPath = path.join(__dirname, '../database/seedData/initiativesPageData.json');

async function seedInitiativesPage() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);

    // Remove existing data
    await InitiativesPage.deleteMany({});
    console.log('Existing InitiativesPage data cleared');

    // Insert new data
    const inserted = await InitiativesPage.create(data);
    console.log('InitiativesPage data seeded successfully');
    console.log('Seeded document:', JSON.stringify(inserted, null, 2));

    process.exit(0);
  } catch (err) {
    console.error('Error seeding InitiativesPage data:', err);
    process.exit(1);
  }
}

seedInitiativesPage();
