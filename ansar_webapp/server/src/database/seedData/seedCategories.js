const mongoose = require('mongoose');
const Category = require('../../models/category.model');
const categoriesData = require('./categoriesData.json');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Category.deleteMany({});
    const inserted = await Category.insertMany(categoriesData);
    console.log('Categories seeded:', inserted.map(c => `${c.name} (${c._id})`).join(', '));
    process.exit(0);
  } catch (err) {
    console.error('Error seeding categories:', err);
    process.exit(1);
  }
}

seedCategories();
