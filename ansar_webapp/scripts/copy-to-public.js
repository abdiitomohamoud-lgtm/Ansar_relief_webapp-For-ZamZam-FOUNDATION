const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceBaseDir = 'client/src/assets/images';
const destBaseDir = 'client/public/assets/images';

// Create function to copy file
function copyFile(source, destination) {
  try {
    // Create destination directory if it doesn't exist
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy the file
    fs.copyFileSync(source, destination);
    console.log(`Copied: ${source} -> ${destination}`);
    return true;
  } catch (error) {
    console.error(`Error copying ${source} to ${destination}: ${error.message}`);
    return false;
  }
}

// Function to recursively copy all files in a directory
function copyAllFiles(sourceDir, destDir) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Read source directory
  const files = fs.readdirSync(sourceDir);
  
  let copiedCount = 0;
  
  // Loop through all files and directories
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // If it's a directory, recursively copy its contents
      copiedCount += copyAllFiles(sourcePath, destPath);
    } else {
      // If it's a file, copy it
      if (copyFile(sourcePath, destPath)) {
        copiedCount++;
      }
    }
  }
  
  return copiedCount;
}

// Copy all image files
console.log('Starting to copy images from src to public...');
const totalCopied = copyAllFiles(sourceBaseDir, destBaseDir);
console.log(`Completed! ${totalCopied} files copied.`); 