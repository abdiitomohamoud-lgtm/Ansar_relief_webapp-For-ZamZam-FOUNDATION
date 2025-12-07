// Script to add missing profile fields to all UserInfo documents
const mongoose = require('mongoose');
const UserInfo = require('../models/UserInfo');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ansar_db';

async function addMissingFields() {
  await mongoose.connect(MONGODB_URI);
  const users = await UserInfo.find({});
  for (const user of users) {
    let updated = false;
    if (user.phone === undefined) { user.phone = ''; updated = true; }
    if (user.address === undefined) { user.address = ''; updated = true; }
    if (user.dob === undefined) { user.dob = ''; updated = true; }
    if (user.avatar === undefined) { user.avatar = ''; updated = true; }
    if (user.bio === undefined) { user.bio = ''; updated = true; }
    if (updated) {
      await user.save();
      console.log(`Updated user: ${user.email}`);
    }
  }
  console.log('All users updated.');
  mongoose.disconnect();
}

addMissingFields().catch(err => {
  console.error('Error updating users:', err);
  mongoose.disconnect();
});
