const mongoose = require('mongoose');
const VolunteerPageData = require('../models/VolunteerPageData');
const volunteerPageData = require('../../client/src/data/volunteerPageData.json');

mongoose.connect('mongodb://localhost:27017/ansar_db_2025', { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    await VolunteerPageData.deleteMany({});
    await VolunteerPageData.create(volunteerPageData);
    console.log('VolunteerPageData seeded successfully.');
  } catch (err) {
    console.error('Error seeding VolunteerPageData:', err);
  } finally {
    mongoose.connection.close();
  }
})();
