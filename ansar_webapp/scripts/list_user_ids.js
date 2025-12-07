// Usage: node scripts/list_user_ids.js
// Prints all user IDs and emails from the User collection.

const mongoose = require('mongoose');
const { User } = require('../server/src/models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar';

async function listUserIds() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const users = await User.find({}, { _id: 1, email: 1 });
  users.forEach(u => console.log(`${u._id}  ${u.email}`));
  await mongoose.disconnect();
}

listUserIds().catch(err => {
  console.error('Failed to list user IDs:', err);
  process.exit(1);
});
