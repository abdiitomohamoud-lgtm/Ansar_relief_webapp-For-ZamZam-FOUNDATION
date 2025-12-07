const fs = require('fs');
const path = require('path');
const https = require('https');

// Create necessary directories
const clientCampaignsDir = path.join('client', 'public', 'assets', 'images', 'campaigns');
if (!fs.existsSync(clientCampaignsDir)) {
  fs.mkdirSync(clientCampaignsDir, { recursive: true });
}

// Image URLs for client assets that seem to be referenced but missing
const clientAssetImageUrls = {
  'food-security.jpg': 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?auto=format&fit=crop&w=800&q=80',
  'housing.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  'healthcare.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
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

// Download all client asset images
async function downloadClientAssetImages() {
  for (const [filename, url] of Object.entries(clientAssetImageUrls)) {
    const filepath = path.join(clientCampaignsDir, filename);
    
    try {
      await downloadImage(url, filepath);
      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log('Client asset image download process completed!');
}

downloadClientAssetImages().catch(console.error);