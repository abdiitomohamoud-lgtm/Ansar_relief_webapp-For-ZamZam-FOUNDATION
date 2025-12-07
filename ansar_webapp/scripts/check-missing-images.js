// check-missing-images.js
// Usage: node scripts/check-missing-images.js

const fs = require('fs');
const path = require('path');

// Path to aboutPageData.json
const aboutPagePath = path.resolve(__dirname, '../server/src/database/seedData/aboutPageData.json');
// Path to public directory (adjust if needed)
const publicDir = path.resolve(__dirname, '../client/public');

// Recursively collect all image paths from an object
function collectImagePaths(obj, paths = []) {
  if (Array.isArray(obj)) {
    obj.forEach(item => collectImagePaths(item, paths));
  } else if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (key === 'image' && typeof obj[key] === 'string') {
        paths.push(obj[key]);
      } else {
        collectImagePaths(obj[key], paths);
      }
    }
  }
  return paths;
}

function checkImages() {
  if (!fs.existsSync(aboutPagePath)) {
    console.error('aboutPageData.json not found:', aboutPagePath);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(aboutPagePath, 'utf8'));
  const imagePaths = collectImagePaths(data);
  const missing = [];

  imagePaths.forEach(imgPath => {
    // Only check relative paths
    if (!imgPath.startsWith('/')) return;
    const filePath = path.join(publicDir, imgPath);
    if (!fs.existsSync(filePath)) {
      missing.push(imgPath);
    }
  });

  if (missing.length === 0) {
    console.log('All images exist!');
  } else {
    console.log('Missing images:');
    missing.forEach(img => console.log('  ' + img));
  }
}

checkImages();
