const mongoose = require('mongoose');
const ProjectsPage = require('../models/ProjectsPage');

const data = require('../../client/src/data/projectsPageData.json'); // Use the latest JSON from client/src/data

mongoose.connect('mongodb://localhost:27017/ansar_db_2025', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seedProjectsPage() {
  try {
    await ProjectsPage.deleteMany({});
    await ProjectsPage.create(data);
    console.log('ProjectsPage data seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedProjectsPage();
