const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/assets/patterns');
const destDir = path.join(__dirname, '../public/assets/patterns');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy SVG files
fs.readdirSync(srcDir)
  .filter(file => file.endsWith('.svg'))
  .forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to public directory`);
  });

console.log('Pattern files copied successfully!'); 