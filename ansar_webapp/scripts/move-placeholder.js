// scripts/move-placeholder.js
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../public/images/placeholder.jpg');
const dest = path.join(__dirname, '../server/public/images/placeholder.jpg');

if (!fs.existsSync(src)) {
  console.error('Source placeholder.jpg not found:', src);
  process.exit(1);
}

// Ensure destination directory exists
fs.mkdirSync(path.dirname(dest), { recursive: true });

fs.copyFileSync(src, dest);
console.log('Moved placeholder.jpg to server/public/images/');
