// This script creates symlinks or copies a single existing image to the missing filenames for Express static serving.
// It ensures orphans.jpg, mosque.jpg, and zakat.jpg all exist and point to hero-bg.jpg (or another available image).

const fs = require('fs');
const path = require('path');

const heroDir = path.join(__dirname, '../public/images/campaigns/hero');
const existingImage = 'hero-bg.jpg'; // Use this as the fallback image
const targets = ['orphans.jpg', 'mosque.jpg', 'zakat.jpg'];

const src = path.join(heroDir, existingImage);

targets.forEach(target => {
  const dest = path.join(heroDir, target);
  if (!fs.existsSync(dest)) {
    // Copy the fallback image to the target filename
    fs.copyFileSync(src, dest);
    console.log(`Created ${target} from ${existingImage}`);
  } else {
    console.log(`${target} already exists.`);
  }
});
