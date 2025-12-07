require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');
const SadaqahCard = require('../../models/SadaqahCard');
const fullOptions = require('../../scripts/fullSadaqahOptions.json');
// Flatten all category arrays into a single array
const data = Object.values(fullOptions).reduce((acc, arr) => acc.concat(arr), []);

async function seedSadaqahCards() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MongoDB connection string is missing. Please set MONGO_URI or MONGODB_URI in your .env file.');
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await SadaqahCard.deleteMany({});
  await SadaqahCard.create(data);
  console.log('Seeded Sadaqah Card Data');
  await mongoose.disconnect();
}

seedSadaqahCards().catch(err => {
  console.error(err);
  process.exit(1);
});
