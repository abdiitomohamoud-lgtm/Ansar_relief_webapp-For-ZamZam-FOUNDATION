const mongoose = require('mongoose');
const Initiative = require('../models/initiative.model');
const data = require('../database/seedData/initiativesData.json');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing initiatives
    await Initiative.deleteMany({});
    console.log('Cleared existing initiatives...');

    // Insert new initiatives
    await Initiative.insertMany(data);
    console.log('Initiatives data seeded successfully!');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding initiatives data:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
