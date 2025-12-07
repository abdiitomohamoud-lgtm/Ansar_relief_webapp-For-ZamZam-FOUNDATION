const mongoose = require('mongoose');
const DonateItem = require('../models/donate.model');
const data = require('../database/seedData/donateData.json');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function seed() {
  await mongoose.connect(MONGO_URI);
  await DonateItem.deleteMany({});
  await DonateItem.insertMany(data);
  console.log('Donate data seeded!');
  await mongoose.disconnect();
}

seed();
