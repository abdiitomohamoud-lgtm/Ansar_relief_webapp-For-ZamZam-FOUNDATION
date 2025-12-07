// Seed script for ProjectsDetailPage using downloaded images
const mongoose = require('mongoose');
const ProjectsDetailPage = require('../../models/ProjectsDetailPage');
const data = require('../../scripts/projectsDetailPagesData.json');

mongoose.connect('mongodb://localhost:27017/ansar_db_2025', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seedProjectsDetailPage() {
  try {
    await ProjectsDetailPage.deleteMany({});
    await ProjectsDetailPage.create(data);
    console.log('ProjectsDetailPage data seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedProjectsDetailPage();
