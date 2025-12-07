const mongoose = require('mongoose');
const HomePageData = require('../src/models/homePageData.model');

async function checkData() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
    console.log('Connected to MongoDB');
    
    // Check if collection exists and has data
    const count = await HomePageData.countDocuments();
    console.log(`Found ${count} documents in HomePageData collection`);
    
    if (count > 0) {
      const data = await HomePageData.findOne();
      console.log('Sample data structure:');
      console.log('- Hero slides:', data.heroSlides?.length || 0);
      console.log('- Programs:', data.programs?.length || 0);
      console.log('- Urgent cases:', data.urgentCases?.length || 0);
      console.log('- Current campaigns:', data.currentCampaigns?.length || 0);
      console.log('- Sadaqah types:', data.sadaqahTypes?.length || 0);
      console.log('- Sponsorship programs:', data.sponsorshipPrograms?.length || 0);
      console.log('- News items:', data.news?.length || 0);
      console.log('- Testimonials:', data.testimonials?.length || 0);
      console.log('- Partners:', data.partners?.length || 0);
    } else {
      console.log('No data found in HomePageData collection');
    }
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkData();