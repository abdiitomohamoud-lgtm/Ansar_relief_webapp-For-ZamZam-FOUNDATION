const { v4: uuidv4 } = require('uuid');

// Get category IDs from categories.js
const categories = require('./categories');

// Map category names to their IDs
const categoryMap = categories.reduce((map, category) => {
  map[category.slug] = category.id;
  return map;
}, {});

/**
 * Seed data for sadaqah
 */
module.exports = [
  {
    id: uuidv4(),
    title: 'General Sadaqah',
    slug: 'general-sadaqah',
    description: 'Your donation will be used where it is needed most to help those in need.',
    shortDescription: 'Support our humanitarian efforts where the need is greatest.',
    image: '/images/sadaqah/general-sadaqah.jpg',
    type: 'general',
    isActive: true,
    isFeatured: true,
    categoryId: categoryMap['sadaqah'],
    suggestedAmounts: [10, 25, 50, 100, 250, 500],
    minimumAmount: 5,
    content: `
      <h2>General Sadaqah</h2>
      <p>Sadaqah is a voluntary charitable act that stems from the heart with the intention of pleasing Allah and helping those in need. It is not limited to a specific amount, time, or place, making it a flexible form of giving that can be practiced at any moment.</p>
      
      <h3>The Virtues of Sadaqah</h3>
      <p>The Prophet Muhammad (peace be upon him) said: "Sadaqah extinguishes sin as water extinguishes fire." (Tirmidhi)</p>
      
      <p>By giving Sadaqah, you can:</p>
      <ul>
        <li>Earn continuous rewards (especially when your donation helps establish sustainable projects)</li>
        <li>Protect yourself from calamities</li>
        <li>Purify your wealth</li>
        <li>Express gratitude for Allah's blessings</li>
        <li>Help those in desperate need</li>
      </ul>
      
      <h3>How Your Donation Helps</h3>
      <p>Your General Sadaqah donation allows us to direct funds where they are needed most urgently. This might include:</p>
      <ul>
        <li>Emergency relief during crises</li>
        <li>Food for hungry families</li>
        <li>Medical care for the sick</li>
        <li>Clean water projects</li>
        <li>Education for children</li>
        <li>Support for orphans and widows</li>
        <li>Shelter for the homeless</li>
      </ul>
      
      <h3>The Impact of Your Generosity</h3>
      <p>When you donate General Sadaqah, you're providing a lifeline to those in desperate situations. Your contribution, combined with others, creates a powerful force for good that can transform lives and communities.</p>
      
      <p>Remember, no amount is too small. The Prophet Muhammad (peace be upon him) said: "Protect yourself from Hellfire even with half a date." (Bukhari)</p>
    `
  },
  {
    id: uuidv4(),
    title: 'Food Sadaqah',
    slug: 'food-sadaqah',
    description: 'Provide nutritious meals to hungry families and individuals in need.',
    shortDescription: 'Help feed hungry families and individuals around the world.',
    image: '/images/sadaqah/food-sadaqah.jpg',
    type: 'food',
    isActive: true,
    isFeatured: true,
    categoryId: categoryMap['food'],
    suggestedAmounts: [25, 50, 100, 250, 500, 1000],
    minimumAmount: 10,
    content: `
      <h2>Food Sadaqah</h2>
      <p>Hunger is a daily reality for millions of people worldwide. Your Food Sadaqah donation helps us provide nutritious meals to those facing food insecurity due to poverty, conflict, displacement, or natural disasters.</p>
      
      <h3>The Importance of Feeding the Hungry</h3>
      <p>The Prophet Muhammad (peace be upon him) said: "Feed the hungry, visit the sick, and set free the captives." (Bukhari)</p>
      
      <p>In another hadith, he said: "He is not a believer who eats his fill while his neighbor beside him goes hungry." (Bukhari)</p>
      
      <h3>How Your Donation Helps</h3>
      <p>Your Food Sadaqah donation supports:</p>
      <ul>
        <li>Emergency food packages for families in crisis</li>
        <li>Community kitchens in impoverished areas</li>
        <li>School meal programs for children</li>
        <li>Food distribution during Ramadan and Eid</li>
        <li>Sustainable food security projects</li>
        <li>Nutritional support for malnourished children</li>
      </ul>
      
      <h3>The Impact of Your Generosity</h3>
      <p>Here's what your donation can provide:</p>
      <ul>
        <li>$25 can feed a family for a week</li>
        <li>$50 can provide a month of school meals for a child</li>
        <li>$100 can supply emergency food packages to two families</li>
        <li>$250 can support a community kitchen for a month</li>
        <li>$500 can help establish a sustainable food garden</li>
      </ul>
      
      <p>Remember, the Prophet Muhammad (peace be upon him) said: "Whoever feeds a fasting person will have a reward like that of the fasting person, without any reduction in the reward of the fasting person." (Tirmidhi)</p>
    `
  },
  {
    id: uuidv4(),
    title: 'Water Sadaqah',
    slug: 'water-sadaqah',
    description: 'Provide clean water solutions to communities suffering from water scarcity.',
    shortDescription: 'Help provide clean water access to communities in need.',
    image: '/images/sadaqah/water-sadaqah.jpg',
    type: 'water',
    isActive: true,
    isFeatured: true,
    categoryId: categoryMap['water'],
    suggestedAmounts: [50, 100, 250, 500, 1000, 5000],
    minimumAmount: 20,
    content: `
      <h2>Water Sadaqah</h2>
      <p>Water is essential for life, yet millions of people worldwide lack access to clean, safe drinking water. Your Water Sadaqah donation helps us implement sustainable water solutions in communities suffering from water scarcity.</p>
      
      <h3>The Virtues of Providing Water</h3>
      <p>The Prophet Muhammad (peace be upon him) said: "The best charity is giving water to drink." (Ahmad)</p>
      
      <p>He also said: "Whoever digs a well will receive reward for that from Allah on the Day of Judgment when anyone amongst jinn, mankind, and birds drinks from it." (Bukhari)</p>
      
      <h3>How Your Donation Helps</h3>
      <p>Your Water Sadaqah donation supports:</p>
      <ul>
        <li>Construction of deep water wells</li>
        <li>Installation of water pumps and filtration systems</li>
        <li>Rainwater harvesting projects</li>
        <li>Water storage solutions</li>
        <li>Emergency water distribution in crisis situations</li>
        <li>Water conservation and hygiene education</li>
      </ul>
      
      <h3>The Impact of Your Generosity</h3>
      <p>Here's what your donation can provide:</p>
      <ul>
        <li>$50 can provide emergency water to a family for a month</li>
        <li>$100 can install a water filter for a household</li>
        <li>$250 can contribute to a community water storage system</li>
        <li>$500 can help install a water pump</li>
        <li>$5,000 can fund a complete water well project</li>
      </ul>
      
      <p>Remember, providing water is a source of continuous reward (Sadaqah Jariyah) as long as people benefit from it.</p>
    `
  },
  {
    id: uuidv4(),
    title: 'Education Sadaqah',
    slug: 'education-sadaqah',
    description: 'Support educational opportunities for underprivileged children and youth.',
    shortDescription: 'Help provide education to children who would otherwise be denied this opportunity.',
    image: '/images/sadaqah/education-sadaqah.jpg',
    type: 'education',
    isActive: true,
    isFeatured: false,
    categoryId: categoryMap['education'],
    suggestedAmounts: [25, 50, 100, 250, 500, 1000],
    minimumAmount: 10,
    content: `
      <h2>Education Sadaqah</h2>
      <p>Education is a powerful tool that can break the cycle of poverty and create opportunities for a better future. Your Education Sadaqah donation helps us provide educational opportunities to underprivileged children and youth who might otherwise be denied this fundamental right.</p>
      
      <h3>The Importance of Seeking Knowledge</h3>
      <p>The Prophet Muhammad (peace be upon him) said: "Seeking knowledge is obligatory upon every Muslim." (Ibn Majah)</p>
      
      <p>He also said: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him." (Muslim)</p>
      
      <h3>How Your Donation Helps</h3>
      <p>Your Education Sadaqah donation supports:</p>
      <ul>
        <li>School fees and scholarships for underprivileged students</li>
        <li>Educational materials, books, and supplies</li>
        <li>Teacher training and quality improvement programs</li>
        <li>School infrastructure and classroom equipment</li>
        <li>Adult literacy programs</li>
        <li>Vocational training for youth</li>
      </ul>
      
      <h3>The Impact of Your Generosity</h3>
      <p>Here's what your donation can provide:</p>
      <ul>
        <li>$25 can provide school supplies for a student</li>
        <li>$50 can cover a month of school fees</li>
        <li>$100 can supply textbooks for a classroom</li>
        <li>$250 can fund a scholarship for a semester</li>
        <li>$500 can support teacher training</li>
        <li>$1,000 can help equip a classroom</li>
      </ul>
      
      <p>Remember, the Prophet Muhammad (peace be upon him) said: "When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (continuous charity), knowledge from which benefit is gained, or a righteous child who prays for him." (Muslim)</p>
    `
  },
  {
    id: uuidv4(),
    title: 'Medical Sadaqah',
    slug: 'medical-sadaqah',
    description: 'Provide healthcare services and medical assistance to those who cannot afford it.',
    shortDescription: 'Help provide medical care to those who cannot afford healthcare services.',
    image: '/images/sadaqah/medical-sadaqah.jpg',
    type: 'medical',
    isActive: true,
    isFeatured: false,
    categoryId: categoryMap['healthcare'],
    suggestedAmounts: [50, 100, 250, 500, 1000, 2500],
    minimumAmount: 25,
    content: `
      <h2>Medical Sadaqah</h2>
      <p>Access to healthcare is a basic human need, yet millions of people worldwide cannot afford medical treatment when they fall ill. Your Medical Sadaqah donation helps us provide healthcare services and medical assistance to those who would otherwise go without essential care.</p>
      
      <h3>The Virtue of Caring for the Sick</h3>
      <p>The Prophet Muhammad (peace be upon him) said: "Visit the sick, feed the hungry, and free the captives." (Bukhari)</p>
      
      <p>He also said: "There is no disease that Allah has created, except that He also has created its treatment." (Bukhari)</p>
      
      <h3>How Your Donation Helps</h3>
      <p>Your Medical Sadaqah donation supports:</p>
      <ul>
        <li>Medical treatment for those who cannot afford it</li>
        <li>Essential medications and supplies</li>
        <li>Medical equipment for clinics and hospitals</li>
        <li>Mobile medical clinics for remote areas</li>
        <li>Emergency medical response in crisis situations</li>
        <li>Preventive healthcare and vaccination programs</li>
        <li>Maternal and child health services</li>
      </ul>
      
      <h3>The Impact of Your Generosity</h3>
      <p>Here's what your donation can provide:</p>
      <ul>
        <li>$50 can provide essential medications for a patient</li>
        <li>$100 can fund a medical check-up and treatment</li>
        <li>$250 can support a day of mobile clinic operations</li>
        <li>$500 can cover a minor surgical procedure</li>
        <li>$1,000 can help purchase medical equipment</li>
        <li>$2,500 can fund comprehensive treatment for a serious condition</li>
      </ul>
      
      <p>Remember, the Prophet Muhammad (peace be upon him) said: "Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter." (Muslim)</p>
    `
  }
]; 