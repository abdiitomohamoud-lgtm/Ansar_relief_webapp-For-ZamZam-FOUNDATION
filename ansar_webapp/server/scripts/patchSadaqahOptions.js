// Utility to update fullSadaqahOptions.json with valid categorySlug values
// Run this script to patch the file for backend seeding

const fs = require('fs');
const path = require('path');
const categories = require('../src/database/seedData/categories');
const optionsPath = path.join(__dirname, 'fullSadaqahOptions.json');

const categoryMap = {
  general: 'general',
  immediate: 'emergency',
  periodic: 'general',
  kafarat: 'general',
  aqiqah: 'food',
  specific: {
    'Water Wells': 'water',
    'Mosque Construction': 'general',
    'Educational Support': 'education'
  }
};

const options = JSON.parse(fs.readFileSync(optionsPath, 'utf8'));

function getCategorySlug(type, option) {
  if (type === 'specific') {
    return categoryMap.specific[option.title] || 'general';
  }
  return categoryMap[type] || 'general';
}

for (const type of Object.keys(options)) {
  for (const option of options[type]) {
    option.categorySlug = getCategorySlug(type, option);
  }
}

fs.writeFileSync(optionsPath, JSON.stringify(options, null, 2));
console.log('Patched fullSadaqahOptions.json with categorySlug values.');
