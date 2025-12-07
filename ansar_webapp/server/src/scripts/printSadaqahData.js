// server/src/scripts/printSadaqahData.js
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const Sadaqah = require('../models/sadaqah.model.js');

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const doc = await Sadaqah.findOne();
    if (!doc) {
      console.log('No Sadaqah data found in the database.');
    } else {
      console.dir(doc.toObject(), { depth: null, colors: true });
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
