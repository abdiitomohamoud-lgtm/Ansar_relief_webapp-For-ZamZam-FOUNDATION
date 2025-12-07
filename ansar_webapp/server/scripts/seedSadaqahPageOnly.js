// Node.js script to seed the Sadaqah page data only, without touching other collections
const mongoose = require('mongoose');
const Sadaqah = require('../src/models/sadaqah.model');
const sadaqahPageData = require('./seedSadaqahPage');

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
  await Sadaqah.deleteMany({});
  await Sadaqah.create(sadaqahPageData);
  console.log('Seeded Sadaqah page data successfully.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
