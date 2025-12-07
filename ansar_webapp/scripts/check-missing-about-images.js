// check-missing-about-images.js
// Usage: node scripts/check-missing-about-images.js
// Checks all image paths in aboutPageData.json and downloads a sample image if missing.

const fs = require('fs');
const path = require('path');
const https = require('https');

const aboutPagePath = path.resolve(__dirname, '../server/src/database/seedData/aboutPageData.json');
const publicDir = path.resolve(__dirname, '../client/public');

function collectImagePaths(obj, paths = []) {
  if (Array.isArray(obj)) {
    obj.forEach(item => collectImagePaths(item, paths));
  } else if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if ((key === 'image' || key === 'thumbnailImage') && typeof obj[key] === 'string') {
        paths.push(obj[key]);
      } else {
        collectImagePaths(obj[key], paths);
      }
    }
  }
  return paths;
}

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadSampleImage(destPath, label) {
  const url = `https://via.placeholder.com/400x300?text=${encodeURIComponent(label)}`;
  const localPlaceholder = path.resolve(__dirname, '../client/public/images/default.jpg');
  return new Promise((resolve, reject) => {
    let file;
    try {
      file = fs.createWriteStream(destPath);
    } catch (err) {
      console.error('Error creating file stream for', destPath, err);
      // Try to copy local placeholder if file stream creation fails
      try {
        fs.copyFileSync(localPlaceholder, destPath);
        console.log('Copied local placeholder for:', destPath);
        return resolve();
      } catch (copyErr) {
        console.error('Failed to copy local placeholder for', destPath, copyErr);
        return reject(copyErr);
      }
    }
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => {
        console.error('File write error for', destPath, err);
        // Try to copy local placeholder if file write fails
        try {
          fs.copyFileSync(localPlaceholder, destPath);
          console.log('Copied local placeholder for:', destPath);
          resolve();
        } catch (copyErr) {
          console.error('Failed to copy local placeholder for', destPath, copyErr);
          reject(copyErr);
        }
      });
    }).on('error', err => {
      fs.unlink(destPath, () => {});
      console.error('HTTP error for', url, err);
      // Try to copy local placeholder if download fails
      try {
        fs.copyFileSync(localPlaceholder, destPath);
        console.log('Copied local placeholder for:', destPath);
        resolve();
      } catch (copyErr) {
        console.error('Failed to copy local placeholder for', destPath, copyErr);
        reject(copyErr);
      }
    });
  });
}

async function checkAndDownloadImages() {
  if (!fs.existsSync(aboutPagePath)) {
    console.error('aboutPageData.json not found:', aboutPagePath);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(aboutPagePath, 'utf8'));
  const imagePaths = collectImagePaths(data);
  const missing = [];
  for (const imgPath of imagePaths) {
    if (!imgPath.startsWith('/')) continue;
    const filePath = path.join(publicDir, imgPath);
    if (!fs.existsSync(filePath)) {
      missing.push({ imgPath, filePath });
    }
  }
  if (missing.length === 0) {
    console.log('All images exist!');
    return;
  }
  console.log('Missing images, downloading sample images:');
  for (const { imgPath, filePath } of missing) {
    ensureDirExists(filePath);
    const label = path.basename(imgPath, path.extname(imgPath)).replace(/[-_]/g, ' ');
    try {
      await downloadSampleImage(filePath, label);
      console.log('Downloaded sample for:', imgPath);
    } catch (e) {
      console.error('Failed to download sample for:', imgPath, e);
    }
  }
}

checkAndDownloadImages();
