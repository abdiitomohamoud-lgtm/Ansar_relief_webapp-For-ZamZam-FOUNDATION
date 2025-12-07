const mongoose = require('mongoose');
const ProjectsDetailPage = require('../models/ProjectsDetailPage');
const data = require('./projectsDetailPagesData.json');

const MONGO_URI = 'mongodb://localhost:27017/ansar_db_2025';

async function seedProjectsDetailPages() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    await ProjectsDetailPage.deleteMany({});
    await ProjectsDetailPage.insertMany(data);
    console.log('Projects Detail Pages data seeded successfully');
  } catch (error) {
    console.error('Error seeding Projects Detail Pages:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedProjectsDetailPages();
