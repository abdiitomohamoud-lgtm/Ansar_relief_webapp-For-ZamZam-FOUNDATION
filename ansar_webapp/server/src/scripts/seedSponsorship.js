// seedSponsorship.js
// Seeds the sponsorship collection with data from sponsorshipData.json

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Sponsorship = require('../models/sponsorship.model');

const dataPath = path.join(__dirname, '../../scripts/sponsorshipData.json');
let sponsorshipData;
try {
  sponsorshipData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (err) {
  console.error('Error reading sponsorshipData.json:', err);
  process.exit(1);
}

async function seedSponsorship() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
    console.log('Connected to MongoDB');

    // Flatten all category items into one array for seeding
    const items = sponsorshipData.categories.flatMap(category => {
      return category.items.map(item => {
        const monthlyAmount = item.monthlyCost || category.monthlyAmount;
        return {
          ...item,
          type: category.id,
          description: category.description,
          image: item.image || category.image,
          monthlyAmount,
          yearlyAmount: monthlyAmount * 12,
          isSponsored: item.sponsored || false,
          story: item.story || '',
        };
      });
    });

    console.log(`Prepared ${items.length} sponsorship items for seeding.`);

    await Sponsorship.deleteMany({});
    console.log('Cleared existing sponsorship collection.');

    const result = await Sponsorship.insertMany(items);
    console.log(`Inserted ${result.length} sponsorship items.`);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB. Seeding complete.');
  } catch (err) {
    console.error('Error during seeding:', err);
    mongoose.disconnect();
  }
}

seedSponsorship();
