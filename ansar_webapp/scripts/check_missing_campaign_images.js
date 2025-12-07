const fs = require('fs');
const path = require('path');

// Path to your campaigns data JSON
const campaignsDataPath = path.join(__dirname, '../server/src/database/seedData/campaignsData.json');
// Path to your images directory
const imagesDir = path.join(__dirname, '../client/public/images/campaigns');

function getAllImagePaths(data) {
  // Adjust this if your image field is named differently
  return data
    .map(campaign => campaign.image)
    .filter(Boolean);
}

function checkImagesExist(imagePaths, imagesDir) {
  const missing = [];
  imagePaths.forEach(imgPath => {
    // Remove leading slash if present
    let relPath = imgPath.replace(/^\/+/, '');
    // Only check images in /images/campaigns/
    if (!relPath.startsWith('images/campaigns/')) return;
    // Remove 'images/campaigns/' prefix
    relPath = relPath.replace(/^images\/campaigns\//, '');
    const fullPath = path.join(imagesDir, relPath);
    if (!fs.existsSync(fullPath)) {
      missing.push(imgPath);
    }
  });
  return missing;
}

function main() {
  const data = JSON.parse(fs.readFileSync(campaignsDataPath, 'utf8'));
  const imagePaths = getAllImagePaths(data);
  const missing = checkImagesExist(imagePaths, imagesDir);
  if (missing.length === 0) {
    console.log('All campaign images are present.');
  } else {
    console.log('Missing campaign images:');
    missing.forEach(img => console.log(img));
  }
}

main();
