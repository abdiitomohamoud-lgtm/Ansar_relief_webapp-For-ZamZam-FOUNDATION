const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Create directories if they don't exist
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Function to download an image using Axios
const downloadImage = async (url, filepath) => {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Failed to download ${url}: ${error.message}`);
  }
};

// Placeholder image URLs (using picsum.photos)
const images = {
  hero: 'https://picsum.photos/1920/1080',
  communityMembers: [
    'https://picsum.photos/150/150?random=1',
    'https://picsum.photos/150/150?random=2',
    'https://picsum.photos/150/150?random=3',
    'https://picsum.photos/150/150?random=4'
  ],
  teamMembers: [
    'https://picsum.photos/300/300?random=5',
    'https://picsum.photos/300/300?random=6',
    'https://picsum.photos/300/300?random=7',
    'https://picsum.photos/300/300?random=8'
  ],
  boardMembers: [
    'https://picsum.photos/400/400?random=9',
    'https://picsum.photos/400/400?random=10',
    'https://picsum.photos/400/400?random=11'
  ],
  timeline: [
    'https://picsum.photos/800/400?random=12',
    'https://picsum.photos/800/400?random=13',
    'https://picsum.photos/800/400?random=14',
    'https://picsum.photos/800/400?random=15'
  ]
};

// Main function to download all images
async function downloadAllImages() {
  const baseDir = path.join(__dirname, '..', 'assets', 'images', 'about');
  createDirIfNotExists(baseDir);

  try {
    // Download hero image
    await downloadImage(images.hero, path.join(baseDir, 'about-hero.jpg'));
    console.log('Downloaded hero image');

    // Download community member images
    for (let i = 0; i < images.communityMembers.length; i++) {
      await downloadImage(images.communityMembers[i], path.join(baseDir, `community-member-${i + 1}.jpg`));
      console.log(`Downloaded community member image ${i + 1}`);
    }

    // Download team member images
    for (let i = 0; i < images.teamMembers.length; i++) {
      await downloadImage(images.teamMembers[i], path.join(baseDir, `team-member-${i + 1}.jpg`));
      console.log(`Downloaded team member image ${i + 1}`);
    }

    // Download board member images
    for (let i = 0; i < images.boardMembers.length; i++) {
      await downloadImage(images.boardMembers[i], path.join(baseDir, `board-member-${i + 1}.jpg`));
      console.log(`Downloaded board member image ${i + 1}`);
    }

    // Download timeline images
    for (let i = 0; i < images.timeline.length; i++) {
      await downloadImage(images.timeline[i], path.join(baseDir, `timeline-${2005 + (i * 5)}.jpg`));
      console.log(`Downloaded timeline image ${2005 + (i * 5)}`);
    }

    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error.message);
  }
}

// Run the download
downloadAllImages(); 