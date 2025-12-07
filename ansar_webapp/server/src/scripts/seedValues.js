// Seed script for values
const mongoose = require('mongoose');
const Value = require('../models/Value');

const values = [
  { value: 'Transparency' },
  { value: 'Accountability' },
  { value: 'Sustainability' },
  { value: 'Empowerment' },
  { value: 'Dignity' },
  { value: 'Compassion' }
];

async function seedValues() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Value.deleteMany({});
    await Value.insertMany(values);
    console.log('Values seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedValues();
