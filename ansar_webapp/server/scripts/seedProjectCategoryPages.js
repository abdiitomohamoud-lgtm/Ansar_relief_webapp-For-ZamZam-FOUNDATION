const mongoose = require('mongoose');
const ProjectCategoryPage = require('../models/ProjectCategoryPage');
const data = require('./projectCategoryPagesData.json');

mongoose.connect('mongodb://localhost:27017/ansar_db_2025', { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  try {
    await ProjectCategoryPage.deleteMany({});
    await ProjectCategoryPage.insertMany(data);
    console.log('Project category pages seeded successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
