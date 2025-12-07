const fs = require('fs');
const path = require('path');
const https = require('https');
const { createDirectories } = require('./utils');

// Image URLs for different categories - Updated with more reliable URLs
const imageUrls = {
  hero: {
    main: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    pattern: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80',
    overlay: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&w=1920&q=80',
    hero1: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    hero2: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
    hero3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
  },
  categories: {
    mosques: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
    housing: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    water: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    health: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
    income: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    relief: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  },
  featured: {
    project1: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    project2: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
    project3: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
    project4: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    project5: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    project6: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
  },
  testimonials: {
    person1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    person2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    person3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  process: {
    identify: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    plan: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80',
    implement: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
    monitor: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
  },
};

// Create necessary directories
const directories = [
  'client/src/assets/images/projects/hero',
  'client/src/assets/images/projects/categories',
  'client/src/assets/images/projects/featured',
  'client/src/assets/images/projects/testimonials',
  'client/src/assets/images/projects/process',
];

createDirectories(directories);

// Download function with improved error handling and fallback
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timeout downloading ${url}`));
    }, 30000); // 30 second timeout

    const request = https.get(url, (response) => {
      // Clear the timeout since we got a response
      clearTimeout(timeout);
      
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
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
        // If 404, fallback to placeholder image from placehold.co
        if (response.statusCode === 404) {
          const placeholderUrl = 'https://placehold.co/300x200?text=Image+Not+Found';
          https.get(placeholderUrl, (placeholderRes) => {
            if (placeholderRes.statusCode === 200) {
              const file = fs.createWriteStream(filepath);
              placeholderRes.pipe(file);
              file.on('finish', () => {
                file.close();
                resolve();
              });
              file.on('error', (err) => {
                fs.unlink(filepath, () => {});
                reject(err);
              });
            } else {
              reject(new Error(`Failed to download placeholder image: ${placeholderRes.statusCode} ${placeholderRes.statusMessage}`));
            }
          }).on('error', (err) => {
            reject(err);
          });
        } else {
          reject(new Error(`Failed to download ${url}: ${response.statusCode} ${response.statusMessage}`));
        }
      }
    });
    
    request.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
    
    // Set a timeout for the request itself
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Request timeout for ${url}`));
    });
  });
}

// Download all images with retry logic
async function downloadAllImages() {
  const maxRetries = 3;

  // Download all project images as before
  for (const [category, images] of Object.entries(imageUrls)) {
    for (const [name, url] of Object.entries(images)) {
      const filepath = path.join(
        'client/src/assets/images/projects',
        category,
        `${name}.jpg`
      );

      let retries = 0;
      let success = false;

      while (retries < maxRetries && !success) {
        try {
          await downloadImage(url, filepath);
          console.log(`Downloaded: ${filepath}`);
          success = true;
        } catch (error) {
          retries++;
          console.error(`Error downloading ${url} (attempt ${retries}/${maxRetries}):`, error.message);

          if (retries < maxRetries) {
            console.log(`Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            console.error(`Failed to download ${url} after ${maxRetries} attempts`);
          }
        }
      }
    }
  }

  // Download placeholder image to public/images/placeholder.jpg
  const placeholderUrl = 'https://placehold.co/300x200?text=Placeholder';
  const placeholderPath = path.join('public', 'images', 'placeholder.jpg');
  let retries = 0;
  let success = false;
  while (retries < maxRetries && !success) {
    try {
      await downloadImage(placeholderUrl, placeholderPath);
      console.log(`Downloaded placeholder image to ${placeholderPath}`);
      success = true;
    } catch (error) {
      retries++;
      console.error(`Error downloading placeholder image (attempt ${retries}/${maxRetries}):`, error.message);
      if (retries < maxRetries) {
        console.log('Retrying in 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.error('Failed to download placeholder image after maximum attempts');
      }
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images (including placeholder) downloaded successfully!');
}).catch((error) => {
  console.error('Error downloading images:', error);
});