const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Download image from URL
const downloadImage = (url, destination) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destination);
    ensureDir(dir);

    const file = fs.createWriteStream(destination);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${destination}`);
        resolve();
      });
      
    }).on('error', (err) => {
      fs.unlink(destination, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
};

// Image definitions for missing images only
const imagesToDownload = [
  // Missing images
  {
    url: 'https://images.pexels.com/photos/9538654/pexels-photo-9538654.jpeg',
    destination: 'client/src/assets/images/campaigns/emergency.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg',
    destination: 'client/src/assets/images/news/news-2.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  
  // Logo placeholders with placehold.co
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Partner+1',
    destination: 'client/src/assets/images/logos/partner-1.png'
  },
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Partner+2',
    destination: 'client/src/assets/images/logos/partner-2.png'
  },
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Partner+3',
    destination: 'client/src/assets/images/logos/partner-3.png'
  },
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Partner+4',
    destination: 'client/src/assets/images/logos/partner-4.png'
  },
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Partner+5',
    destination: 'client/src/assets/images/logos/partner-5.png'
  },
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Partner+6',
    destination: 'client/src/assets/images/logos/partner-6.png'
  },
  {
    url: 'https://placehold.co/200x100/FFFFFF/333333/png?text=Logo',
    destination: 'client/src/assets/images/logos/placeholder-logo.png'
  }
];

// Download all images
async function downloadAllImages() {
  console.log('Starting download of missing images...');
  
  for (const image of imagesToDownload) {
    try {
      const fullUrl = image.params ? image.url + image.params : image.url;
      await downloadImage(fullUrl, image.destination);
    } catch (error) {
      console.error(`Error downloading ${image.destination}:`, error.message);
    }
  }
  
  console.log('All downloads completed!');
}

// Start the download process
downloadAllImages(); 