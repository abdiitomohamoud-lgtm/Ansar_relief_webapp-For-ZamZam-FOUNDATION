const https = require('https');
const fs = require('fs');
const path = require('path');

// Base directory for images
const baseDir = 'client/src/assets/images/projects';

// Create directories if they don't exist
const directories = [
  'hero',
  'categories',
  'featured',
  'testimonials',
  'process'
];

// Ensure base directory exists
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Create subdirectories
directories.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Image URLs and their destinations with proper query parameters
const images = {
  // Hero Images
  'hero/main.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  'hero/pattern.jpg': 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80',
  'hero/overlay.jpg': 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&w=1920&q=80',
  'hero/hero1.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  'hero/hero2.jpg': 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
  'hero/hero3.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',

  // Category Images
  'categories/mosques.jpg': 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
  'categories/housing.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
  'categories/water.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  'categories/health.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
  'categories/education.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
  'categories/income.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  'categories/relief.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',

  // Featured Project Images
  'featured/project1.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  'featured/project2.jpg': 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
  'featured/project3.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
  'featured/project4.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
  'featured/project5.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
  'featured/project6.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',

  // Testimonial Images
  'testimonials/person1.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  'testimonials/person2.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  'testimonials/person3.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',

  // Process Images
  'process/identify.jpg': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  'process/plan.jpg': 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
  'process/implement.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
  'process/monitor.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80'
};

// Function to download an image with retry mechanism
async function downloadImage(url, filepath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve, reject) => {
        https.get(url, (response) => {
          if (response.statusCode === 200) {
            const file = fs.createWriteStream(filepath);
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`✓ Downloaded: ${filepath}`);
              resolve();
            });
            file.on('error', (err) => {
              fs.unlink(filepath, () => reject(err));
            });
          } else {
            reject(`Failed to download ${url}: ${response.statusCode}`);
          }
        }).on('error', (err) => {
          reject(`Error downloading ${url}: ${err.message}`);
        });
      });
      return; // Success, exit the retry loop
    } catch (error) {
      if (i === retries - 1) throw error; // Last retry, throw the error
      console.log(`Retry ${i + 1}/${retries} for ${filepath}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

// Download all images with progress tracking
async function downloadAllImages() {
  const total = Object.keys(images).length;
  let completed = 0;
  
  console.log(`Starting download of ${total} images...`);
  
  for (const [filepath, url] of Object.entries(images)) {
    const fullPath = path.join(baseDir, filepath);
    try {
      await downloadImage(url, fullPath);
      completed++;
      console.log(`Progress: ${completed}/${total} (${Math.round(completed/total*100)}%)`);
    } catch (error) {
      console.error(`❌ Error downloading ${filepath}:`, error);
    }
  }
  
  console.log(`\nDownload complete! ${completed}/${total} images downloaded successfully.`);
}

// Run the download
console.log('Starting image download process...\n');
downloadAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 