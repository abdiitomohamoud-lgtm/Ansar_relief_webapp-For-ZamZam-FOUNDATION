const fs = require('fs');
const path = require('path');
const patternsDir = path.join(__dirname, '../src/assets/images/patterns');

// Function to fix SVG files
function fixSvgFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add XML declaration if missing
    if (!content.includes('<?xml version="1.0"')) {
      content = '<?xml version="1.0" encoding="UTF-8"?>\n' + content;
    }
    
    // Fix duplicate closing tags (remove double closings)
    content = content.replace(/<\/(path|circle|rect|line|polygon|polyline)><\/\1>/g, '</$1>');
    
    // Fix self-closing tags - convert /> to proper closing tags
    content = content.replace(/<(path|circle|rect|line|polygon|polyline)([^>]*?)\s*\/>/g, '<$1$2></$1>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error fixing ${path.basename(filePath)}:`, error.message);
  }
}

// Get all SVG files in the patterns directory
fs.readdir(patternsDir, (err, files) => {
  if (err) {
    console.error('Error reading patterns directory:', err.message);
    return;
  }
  
  // Filter for SVG files and fix each one
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  console.log(`Found ${svgFiles.length} SVG files to fix`);
  
  svgFiles.forEach(file => {
    const filePath = path.join(patternsDir, file);
    fixSvgFile(filePath);
  });
  
  console.log('SVG fixing complete');
}); 