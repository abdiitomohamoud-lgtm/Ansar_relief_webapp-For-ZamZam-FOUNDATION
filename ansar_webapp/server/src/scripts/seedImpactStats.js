// Seed script for impact stats
const mongoose = require('mongoose');
const ImpactStat = require('../models/ImpactStat');

const impactStats = [
  { number: '1M+', label: 'People Impacted' },
  { number: '100+', label: 'Projects Completed' },
  { number: '50+', label: 'Communities Served' },
  { number: '25+', label: 'Years of Service' }
];

async function seedImpactStats() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await ImpactStat.deleteMany({});
    await ImpactStat.insertMany(impactStats);
    console.log('Impact stats seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedImpactStats();
