require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');
const HomePageData = require('../models/homePageData.model');
const data = require('../database/seedData/homePageData.json');

async function seedHomePageData() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MongoDB connection string is missing. Please set MONGO_URI or MONGODB_URI in your .env file.');
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await HomePageData.deleteMany({});
  await HomePageData.create(data);
  console.log('Seeded Home Page Data');
  await mongoose.disconnect();
}

seedHomePageData().catch(err => {
  console.error(err);
  process.exit(1);
});
