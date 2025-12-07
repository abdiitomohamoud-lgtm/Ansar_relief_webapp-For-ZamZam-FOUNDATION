const mongoose = require('mongoose');
const Approach = require('../models/approach.model');
const data = require('../database/seedData/approachData.json');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Approach.deleteMany({});
  await Approach.insertMany(data);
  console.log('Approach data seeded!');
  await mongoose.disconnect();
}

seed();
