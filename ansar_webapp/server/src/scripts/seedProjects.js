const mongoose = require('mongoose');
const Project = require('../models/project.model');
const data = require('../database/seedData/projectsData.json');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar_db_2025';

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Project.deleteMany({});
  await Project.insertMany(data);
  console.log('Projects data seeded!');
  await mongoose.disconnect();
}

seed();
