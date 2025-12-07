// Node.js script to download missing images from placeholder URLs
const fs = require('fs');
const path = require('path');
const https = require('https');

// List of missing image names
const missingImages = [
  'well1.jpg', 'well2.jpg', 'school1.jpg', 'mosque1.jpg', 'house1.jpg', 'health1.jpg', 'income1.jpg', 'relief1.jpg',
  'water1.jpg', 'water2.jpg', 'water3.jpg', 'water4.jpg', 'water5.jpg', 'water6.jpg'
];

// Folder to save images
const targetDir = path.join(__dirname, '../../client/public/assets/images/projects/featured');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Map of image names to Unsplash URLs
const imageUrls = {
  'well1.jpg': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'well2.jpg': 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  'school1.jpg': 'https://images.unsplash.com/photo-1513258496099-48168024aec0',
  'mosque1.jpg': 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
  'house1.jpg': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7',
  'health1.jpg': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
  'income1.jpg': 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'relief1.jpg': 'https://images.unsplash.com/photo-1506784365847-bbad939e9335',
  'water1.jpg': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'water2.jpg': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
  'water3.jpg': 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'water4.jpg': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'water5.jpg': 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
  'water6.jpg': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'
};

function downloadImage(imageName, url) {
  const filePath = path.join(targetDir, imageName);
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close());
      console.log(`Downloaded: ${imageName}`);
    } else {
      console.error(`Failed to download ${imageName}: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${imageName}:`, err.message);
  });
}

Object.entries(imageUrls).forEach(([name, url]) => downloadImage(name, url));
