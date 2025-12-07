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

// Image definitions with updated URLs
const imagesToDownload = [
  // Campaign images
  {
    url: 'https://images.pexels.com/photos/3779199/pexels-photo-3779199.jpeg',
    destination: 'client/src/assets/images/campaigns/emergency.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/2058128/pexels-photo-2058128.jpeg',
    destination: 'client/src/assets/images/campaigns/emergency-1.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/9538690/pexels-photo-9538690.jpeg',
    destination: 'client/src/assets/images/campaigns/emergency-2.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/2742627/pexels-photo-2742627.jpeg',
    destination: 'client/src/assets/images/campaigns/water-project.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg',
    destination: 'client/src/assets/images/campaigns/education.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/19147978/pexels-photo-19147978/free-photo-of-aerial-view-of-mecca-at-night.jpeg',
    destination: 'client/src/assets/images/campaigns/ramadan.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg',
    destination: 'client/src/assets/images/campaigns/orphans.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg',
    destination: 'client/src/assets/images/campaigns/family-support.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  
  // Sadaqah images
  {
    url: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg',
    destination: 'client/src/assets/images/sadaqah/general-sadaqah.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/7249294/pexels-photo-7249294.jpeg',
    destination: 'client/src/assets/images/sadaqah/sadaqah-jariyah.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    destination: 'client/src/assets/images/sadaqah/friday-sadaqah.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
    destination: 'client/src/assets/images/sadaqah/food-sadaqah.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  
  // Sponsorship images
  {
    url: 'https://images.pexels.com/photos/7109274/pexels-photo-7109274.jpeg',
    destination: 'client/src/assets/images/sponsorships/orphan.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/7108339/pexels-photo-7108339.jpeg',
    destination: 'client/src/assets/images/sponsorships/family.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    destination: 'client/src/assets/images/sponsorships/student.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  
  // News images
  {
    url: 'https://images.pexels.com/photos/4021803/pexels-photo-4021803.jpeg',
    destination: 'client/src/assets/images/news/news-1.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/7108476/pexels-photo-7108476.jpeg',
    destination: 'client/src/assets/images/news/news-2.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/6348118/pexels-photo-6348118.jpeg',
    destination: 'client/src/assets/images/news/news-3.jpg',
    params: '?auto=compress&cs=tinysrgb&w=1000&h=600&dpr=1'
  },
  
  // Testimonial images
  {
    url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    destination: 'client/src/assets/images/testimonials/person-1.jpg',
    params: '?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    destination: 'client/src/assets/images/testimonials/person-2.jpg',
    params: '?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    destination: 'client/src/assets/images/testimonials/person-3.jpg',
    params: '?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
  },
  
  // Sample/App images
  {
    url: 'https://images.pexels.com/photos/1542252/pexels-photo-1542252.jpeg',
    destination: 'client/src/assets/images/sample/app-main.jpg',
    params: '?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/9218483/pexels-photo-9218483.jpeg',
    destination: 'client/src/assets/images/sample/app-donate.jpg',
    params: '?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/5650022/pexels-photo-5650022.jpeg',
    destination: 'client/src/assets/images/sample/app-projects.jpg',
    params: '?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
  },
  {
    url: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg',
    destination: 'client/src/assets/images/sample/avatar-placeholder.jpg',
    params: '?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
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
  console.log('Starting download of images...');
  
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