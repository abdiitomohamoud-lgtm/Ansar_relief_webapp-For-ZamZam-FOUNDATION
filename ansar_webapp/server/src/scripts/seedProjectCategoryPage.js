// Seed script for ProjectCategoryPage using downloaded images
const mongoose = require('mongoose');
const ProjectCategoryPage = require('../../models/ProjectCategoryPage');
const data = require('../../scripts/projectCategoryPagesData.json');

mongoose.connect('mongodb://localhost:27017/ansar_db_2025', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seedProjectCategoryPage() {
  try {
    await ProjectCategoryPage.deleteMany({});
    await ProjectCategoryPage.create(data);
    console.log('ProjectCategoryPage data seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedProjectCategoryPage();
