// auto-copy-missing-images.js
// Usage: node scripts/auto-copy-missing-images.js
// Attempts to find and copy missing images to client/public/images/...

const fs = require('fs');
const path = require('path');

const aboutPagePath = path.resolve(__dirname, '../server/src/database/seedData/aboutPageData.json');
const publicDir = path.resolve(__dirname, '../client/public');
const projectRoot = path.resolve(__dirname, '..');

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

function findFileAnywhere(filename, startDir) {
  let result = null;
  function search(dir) {
    if (result) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        search(fullPath);
      } else if (file === filename) {
        result = fullPath;
        return;
      }
    }
  }
  search(startDir);
  return result;
}

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function autoCopyImages() {
  if (!fs.existsSync(aboutPagePath)) {
    console.error('aboutPageData.json not found:', aboutPagePath);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(aboutPagePath, 'utf8'));
  const imagePaths = collectImagePaths(data);
  const missing = [];
  const copied = [];

  imagePaths.forEach(imgPath => {
    if (!imgPath.startsWith('/')) return;
    const destPath = path.join(publicDir, imgPath);
    if (!fs.existsSync(destPath)) {
      const filename = path.basename(imgPath);
      const found = findFileAnywhere(filename, projectRoot);
      if (found) {
        ensureDirExists(destPath);
        fs.copyFileSync(found, destPath);
        copied.push({ from: found, to: destPath });
      } else {
        missing.push(imgPath);
      }
    }
  });

  if (copied.length > 0) {
    console.log('Copied the following images:');
    copied.forEach(c => console.log(`  ${c.from} -> ${c.to}`));
  }
  if (missing.length > 0) {
    console.log('\nStill missing:');
    missing.forEach(img => console.log('  ' + img));
  }
  if (copied.length === 0 && missing.length === 0) {
    console.log('All images exist!');
  }
}

autoCopyImages();
