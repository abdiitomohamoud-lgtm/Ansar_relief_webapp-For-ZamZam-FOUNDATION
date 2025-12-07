const mongoose = require('mongoose');
const LoginPageContent = require('../../models/LoginPageContent');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://localhost:27017/ansar_db_2025';

async function seed() {
  await mongoose.connect(MONGO_URI);
  const dataPath = path.join(__dirname, 'loginPageContent.json');
  const content = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  await LoginPageContent.deleteMany({});
  await LoginPageContent.create(content);
  console.log('Login page content seeded!');
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
