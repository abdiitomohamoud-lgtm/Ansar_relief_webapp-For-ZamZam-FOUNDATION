require('dotenv').config();
const connectDB = require('./connection');
const ContactPageContent = require('../models/contactPageContent.model');

const fs = require('fs');
const path = require('path');

// Always read the latest JSON from disk to avoid require cache issues
const contactPageContentPath = path.join(__dirname, 'seedData', 'contactPageContent.json');
const contactPageContentData = JSON.parse(fs.readFileSync(contactPageContentPath, 'utf-8'));

const seedContactPageContent = async () => {
  try {
    await connectDB();
    await ContactPageContent.deleteMany({});
    await ContactPageContent.create(contactPageContentData);
    console.log('Contact page content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding contact page content:', error);
    process.exit(1);
  }
};

seedContactPageContent();
