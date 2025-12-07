const { v4: uuidv4 } = require('uuid');

// Get category IDs from categories.js
const categories = require('./categories');

// Map category names to their IDs
const categoryMap = categories.reduce((map, category) => {
  map[category.slug] = category.id;
  return map;
}, {});

/**
 * Seed data for campaigns
 */
module.exports = [
  {
    id: uuidv4(),
    title: 'Clean Water Initiative',
    slug: 'clean-water-initiative',
    description: 'Provide clean water to communities in need',
    shortDescription: 'Help us provide clean water to communities in need around the world.',
    image: '/images/campaigns/water-project.jpg',
    goal: 25000,
    raised: 15000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    categoryId: categoryMap['water'],
    location: 'Multiple Countries',
    licenseNumber: '2024',
    content: `
      <h2>About the Clean Water Initiative</h2>
      <p>Access to clean water is a fundamental human right, yet millions of people around the world still lack this basic necessity. Our Clean Water Initiative aims to address this critical issue by implementing sustainable water solutions in communities facing water scarcity and contamination.</p>
      
      <h3>The Problem</h3>
      <p>Over 2 billion people worldwide lack access to safely managed drinking water services. Contaminated water and poor sanitation are linked to transmission of diseases such as cholera, diarrhea, dysentery, hepatitis A, typhoid, and polio.</p>
      
      <h3>Our Solution</h3>
      <p>Through this campaign, we will:</p>
      <ul>
        <li>Construct water wells in villages without access to clean water</li>
        <li>Install water filtration systems in communities with contaminated water sources</li>
        <li>Provide water storage solutions for areas with seasonal water availability</li>
        <li>Educate communities on water conservation and hygiene practices</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Your donation will help:</p>
      <ul>
        <li>Reduce waterborne diseases by up to 80% in target communities</li>
        <li>Decrease the time spent collecting water, especially for women and children</li>
        <li>Improve school attendance rates as children spend less time collecting water</li>
        <li>Enable agricultural activities, improving food security and livelihoods</li>
      </ul>
    `
  },
  {
    id: uuidv4(),
    title: 'Education for All',
    slug: 'education-for-all',
    description: 'Support education for underprivileged children',
    shortDescription: 'Help provide quality education to underprivileged children around the world.',
    image: '/images/campaigns/education.jpg',
    goal: 20000,
    raised: 8500,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-12-15'),
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    categoryId: categoryMap['education'],
    location: 'Global',
    licenseNumber: '2024',
    content: `
      <h2>About Education for All</h2>
      <p>Education is a powerful tool that can break the cycle of poverty and create opportunities for a better future. Our Education for All campaign aims to provide quality education to underprivileged children who might otherwise be denied this fundamental right.</p>
      
      <h3>The Problem</h3>
      <p>Over 258 million children and youth are out of school worldwide. Poverty, conflict, discrimination, and lack of infrastructure prevent many children from accessing education.</p>
      
      <h3>Our Solution</h3>
      <p>Through this campaign, we will:</p>
      <ul>
        <li>Build and renovate schools in underserved communities</li>
        <li>Provide scholarships to children from low-income families</li>
        <li>Supply educational materials, books, and technology</li>
        <li>Train teachers and improve the quality of education</li>
        <li>Implement after-school programs and learning centers</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Your donation will help:</p>
      <ul>
        <li>Enable children to attend school regularly</li>
        <li>Improve literacy and numeracy rates</li>
        <li>Increase graduation rates and future employment opportunities</li>
        <li>Empower communities through education</li>
      </ul>
    `
  },
  {
    id: uuidv4(),
    title: 'Emergency Relief: Gaza',
    slug: 'emergency-relief-gaza',
    description: 'Provide urgent humanitarian aid to families in Gaza',
    shortDescription: 'Help provide emergency relief to families affected by the crisis in Gaza.',
    image: '/images/campaigns/emergency.jpg',
    goal: 100000,
    raised: 45000,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-07-10'),
    isActive: true,
    isFeatured: true,
    isUrgent: true,
    categoryId: categoryMap['emergency'],
    location: 'Gaza, Palestine',
    licenseNumber: '2024',
    content: `
      <h2>Gaza Emergency Relief</h2>
      <p>The humanitarian situation in Gaza has reached a critical point. Families are facing severe shortages of food, water, medicine, and shelter. Our emergency relief campaign aims to provide immediate assistance to those affected by the ongoing crisis.</p>
      
      <h3>The Crisis</h3>
      <p>Thousands of families have been displaced, with many losing their homes and livelihoods. Essential services have been disrupted, and access to basic necessities is severely limited.</p>
      
      <h3>Our Response</h3>
      <p>Through this campaign, we will provide:</p>
      <ul>
        <li>Emergency food packages for families</li>
        <li>Clean drinking water and hygiene kits</li>
        <li>Medical supplies and support for healthcare facilities</li>
        <li>Emergency shelter for displaced families</li>
        <li>Psychosocial support for affected children</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Your donation will help:</p>
      <ul>
        <li>Provide immediate relief to families in crisis</li>
        <li>Save lives through emergency medical care</li>
        <li>Support children traumatized by conflict</li>
        <li>Help families survive during this difficult time</li>
      </ul>
    `
  },
  {
    id: uuidv4(),
    title: 'Orphan Sponsorship Program',
    slug: 'orphan-sponsorship-program',
    description: 'Help provide care and education for orphaned children',
    shortDescription: 'Support orphaned children with care, education, and a chance for a better future.',
    image: '/images/campaigns/orphans.jpg',
    goal: 50000,
    raised: 12000,
    startDate: new Date('2023-12-01'),
    endDate: null,
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    categoryId: categoryMap['orphans'],
    location: 'Multiple Countries',
    licenseNumber: '2025',
    content: `
      <h2>Orphan Sponsorship Program</h2>
      <p>Orphaned children are among the most vulnerable members of society. Without proper care and support, they face numerous challenges that can affect their development and future prospects. Our Orphan Sponsorship Program aims to provide these children with the care, education, and opportunities they need to thrive.</p>
      
      <h3>The Need</h3>
      <p>There are an estimated 140 million orphans worldwide. Many lack access to basic necessities, education, healthcare, and the emotional support needed for healthy development.</p>
      
      <h3>Our Program</h3>
      <p>Through this campaign, we will:</p>
      <ul>
        <li>Provide monthly stipends for food, clothing, and basic necessities</li>
        <li>Cover educational expenses including school fees, books, and supplies</li>
        <li>Ensure access to healthcare and regular medical check-ups</li>
        <li>Offer psychosocial support and counseling</li>
        <li>Create a nurturing environment for growth and development</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Your sponsorship will help:</p>
      <ul>
        <li>Give an orphaned child stability and security</li>
        <li>Provide education that can break the cycle of poverty</li>
        <li>Ensure proper nutrition and healthcare</li>
        <li>Offer emotional support and guidance</li>
        <li>Give a child hope for a brighter future</li>
      </ul>
    `
  },
  {
    id: uuidv4(),
    title: 'Empowering Poor Families',
    slug: 'empowering-poor-families',
    description: 'Help families rise out of poverty through sustainable support',
    shortDescription: 'Support families with sustainable solutions to escape the cycle of poverty.',
    image: '/images/campaigns/family-support.jpg',
    goal: 50000,
    raised: 24000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-12-15'),
    isActive: true,
    isFeatured: false,
    isUrgent: false,
    categoryId: categoryMap['family'],
    location: 'Multiple Regions',
    licenseNumber: '2024',
    content: `
      <h2>Empowering Poor Families</h2>
      <p>Poverty affects millions of families worldwide, limiting their access to basic necessities and opportunities for advancement. Our Empowering Poor Families campaign aims to provide sustainable solutions that help families break the cycle of poverty and achieve self-sufficiency.</p>
      
      <h3>The Challenge</h3>
      <p>Many families struggle with multiple challenges including food insecurity, inadequate housing, limited access to healthcare and education, and lack of stable income sources.</p>
      
      <h3>Our Approach</h3>
      <p>Through this campaign, we will:</p>
      <ul>
        <li>Provide immediate relief through food and essential supplies</li>
        <li>Offer vocational training and skills development for adults</li>
        <li>Support microenterprise development with small business grants</li>
        <li>Ensure children's education through school supplies and tuition assistance</li>
        <li>Improve housing conditions through repairs and renovations</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Your donation will help:</p>
      <ul>
        <li>Alleviate immediate suffering through emergency assistance</li>
        <li>Create sustainable income sources through skills training</li>
        <li>Improve living conditions for vulnerable families</li>
        <li>Ensure children receive education and break the cycle of poverty</li>
        <li>Empower families to become self-sufficient</li>
      </ul>
    `
  }
]; 