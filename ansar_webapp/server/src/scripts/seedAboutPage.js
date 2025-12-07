require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const AboutPage = require('../models/aboutPage.model');
const aboutData = require('../database/seedData/aboutPageData.json');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      console.log('Connected to MongoDB. Clearing existing AboutPage data...');
      await AboutPage.deleteMany({});
      const doc = await AboutPage.create(aboutData);
      console.log('About page data seeded successfully!');
      console.log('Inserted document:', JSON.stringify(doc, null, 2));
      process.exit();
    } catch (err) {
      console.error('Seeding error:', err);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
