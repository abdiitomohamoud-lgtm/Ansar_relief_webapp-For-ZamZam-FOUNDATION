// Usage: node scripts/migrate_add_user_to_contact_forms.js <userId>
// Adds the given userId to all contact_user_info documents missing the user field.

const mongoose = require('mongoose');
const ContactUserInfo = require('../server/src/models/contactUserInfo.model');

if (process.argv.length < 3) {
  console.error('Usage: node migrate_add_user_to_contact_forms.js <userId>');
  process.exit(1);
}

const userId = process.argv[2];
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ansar';

async function migrate() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const result = await ContactUserInfo.updateMany(
    { user: { $exists: false } },
    { $set: { user: userId } }
  );
  console.log(`Updated ${result.nModified || result.modifiedCount} contact_user_info documents.`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
