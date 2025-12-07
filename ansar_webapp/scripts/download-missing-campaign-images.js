const fs = require('fs');
const path = require('path');
const https = require('https');

// Create necessary directories
const campaignsDir = path.join('server', 'public', 'images', 'campaigns');
if (!fs.existsSync(campaignsDir)) {
  fs.mkdirSync(campaignsDir, { recursive: true });
}

// Image URLs for campaign images that seem to be referenced but missing
const campaignImageUrls = {
  'education.jpg': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
  'food-security.jpg': 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?auto=format&fit=crop&w=800&q=80',
  'healthcare-relief.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'water.jpg': 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?auto=format&fit=crop&w=800&q=80'
};

// Download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode} ${response.statusMessage}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download all campaign images
async function downloadCampaignImages() {
  for (const [filename, url] of Object.entries(campaignImageUrls)) {
    const filepath = path.join(campaignsDir, filename);
    
    try {
      await downloadImage(url, filepath);
      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log('Campaign image download process completed!');
}

downloadCampaignImages().catch(console.error);