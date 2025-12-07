const mongoose = require('mongoose');
const path = require('path');
const Volunteer = require(path.join(__dirname, '../models/Volunteer.js'));
const volunteers = require(path.join(__dirname, '../../client/src/data/volunteers.json'));

mongoose.connect('mongodb://localhost:27017/ansar_db_2025', { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    await Volunteer.deleteMany({});
    await Volunteer.insertMany(volunteers);
    console.log('Volunteer data seeded successfully.');
  } catch (err) {
    console.error('Error seeding volunteer data:', err);
  } finally {
    mongoose.connection.close();
  }
})();
