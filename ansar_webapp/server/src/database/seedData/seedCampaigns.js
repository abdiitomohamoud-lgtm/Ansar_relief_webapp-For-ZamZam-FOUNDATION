const mongoose = require('mongoose');
const Campaign = require('../../models/campaign.model');
const Category = require('../../models/category.model');
const campaignsData = require('./campaignsData.json');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seedCampaigns() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    const campaigns = campaignsData.map(c => {
      const categoryId = categoryMap[c.category];
      if (!categoryId) {
        throw new Error(`Category not found for: ${c.category}`);
      }
      return {
        ...c,
        slug: slugify(c.title),
        category: categoryId,
      };
    });

    await Campaign.deleteMany({});
    await Campaign.insertMany(campaigns);
    console.log('Campaigns data seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding campaigns data:', err);
    process.exit(1);
  }
}

seedCampaigns();
