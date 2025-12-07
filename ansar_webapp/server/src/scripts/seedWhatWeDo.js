// Seed script for What We Do section
const mongoose = require('mongoose');
const WhatWeDo = require('../models/WhatWeDo');

const whatWeDo = [
  {
    title: 'Emergency Relief',
    description: 'Providing immediate assistance to communities affected by conflicts and natural disasters.',
    icon: 'FaHandHoldingHeart',
    stats: '240,000+ people received emergency aid last year',
    gradient: 'from-rose-500 to-red-600'
  },
  {
    title: 'Sustainable Development',
    description: 'Creating long-term solutions that empower communities to become self-sufficient.',
    icon: 'FaUsers',
    stats: '85+ sustainable projects implemented globally',
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    title: 'Child Welfare',
    description: 'Supporting orphans and vulnerable children with education, healthcare, and protection.',
    icon: 'FaChild',
    stats: '10,000+ children sponsored through our programs',
    gradient: 'from-amber-500 to-orange-600'
  }
];

async function seedWhatWeDo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await WhatWeDo.deleteMany({});
    await WhatWeDo.insertMany(whatWeDo);
    console.log('What We Do section seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedWhatWeDo();
