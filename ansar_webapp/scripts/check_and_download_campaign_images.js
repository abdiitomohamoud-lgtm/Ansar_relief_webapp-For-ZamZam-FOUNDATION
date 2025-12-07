// Script: check_and_download_campaign_images.js
// Usage: node scripts/check_and_download_campaign_images.js
// This script checks for missing campaign images and downloads them if a valid URL is provided in the campaign data.

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Path to your campaign data (adjust if needed)
const campaignsDataPath = path.join(__dirname, '../server/src/database/seedData/campaignsData.json');
// Directory where images should be stored (adjust if needed)
const imagesDir = path.join(__dirname, '../server/public/images/campaigns/');

// Ensure images directory exists
fs.mkdirSync(imagesDir, { recursive: true });

// Load campaign data
const campaigns = JSON.parse(fs.readFileSync(campaignsDataPath, 'utf-8'));

async function downloadImage(url, dest) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 15000
    });
    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    console.log(`Downloaded: ${dest}`);
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
  }
}

(async () => {
  for (const campaign of campaigns) {
    if (!campaign.image) continue;
    let imageUrl = campaign.image;
    let imageName = path.basename(imageUrl);
    let localPath = path.join(imagesDir, imageName);

    // If image path is a URL, download it if missing
    if (/^https?:\/\//.test(imageUrl)) {
      if (!fs.existsSync(localPath)) {
        await downloadImage(imageUrl, localPath);
      } else {
        console.log(`Exists: ${localPath}`);
      }
    } else {
      // If image path is relative, check if it exists in public/images/campaigns
      let relPath = path.join(imagesDir, imageUrl.replace(/^\/+/, ''));
      if (!fs.existsSync(relPath)) {
        console.warn(`Missing local image: ${relPath}`);
      } else {
        console.log(`Exists: ${relPath}`);
      }
    }
  }
})();
