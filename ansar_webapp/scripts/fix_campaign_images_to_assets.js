const fs = require('fs');
const path = require('path');

// Paths
const campaignsDataPath = path.join(__dirname, '../server/src/database/seedData/campaignsData.json');
const assetsDir = path.join(__dirname, '../client/public/assets/images/campaigns');

// Get all available images in the assets folder
function getAllAssetImages() {
  return fs.readdirSync(assetsDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });
}

// Check if a specific image exists in the assets folder
function assetImageExists(filename) {
  return fs.existsSync(path.join(assetsDir, filename));
}

function getFilenameFromPath(imgPath) {
  // Extract filename from /images/campaigns/xyz.jpg or similar
  return path.basename(imgPath);
}

function main() {
  const data = JSON.parse(fs.readFileSync(campaignsDataPath, 'utf8'));
  const assetImages = getAllAssetImages();
  if (assetImages.length === 0) {
    console.error('No images found in assets folder.');
    return;
  }
  const updated = data.map(campaign => {
    let imgPath = campaign.image;
    let filename = getFilenameFromPath(imgPath || '');
    if (filename && assetImageExists(filename)) {
      // Use the asset image path
      campaign.image = `/assets/images/campaigns/${filename}`;
    } else {
      // Use a random image from the assets folder
      const randomImg = assetImages[Math.floor(Math.random() * assetImages.length)];
      campaign.image = `/assets/images/campaigns/${randomImg}`;
    }
    return campaign;
  });
  fs.writeFileSync(campaignsDataPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('campaignsData.json updated with valid image paths.');
}

main();
