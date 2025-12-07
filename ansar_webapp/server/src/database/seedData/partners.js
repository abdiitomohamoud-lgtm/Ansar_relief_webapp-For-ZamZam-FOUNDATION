const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for partners
 */
module.exports = [
  {
    id: uuidv4(),
    name: 'Global Relief Foundation',
    description: 'An international humanitarian organization focused on emergency relief and long-term development projects.',
    logo: '/images/logos/partner-1.png',
    website: 'https://example.com/global-relief',
    partnerSince: new Date('2018-03-15'),
    isActive: true,
    isFeatured: true,
    type: 'NGO',
    contactEmail: 'contact@globalrelief.org',
    contactPhone: '+1-555-123-4567'
  },
  {
    id: uuidv4(),
    name: 'Hope International',
    description: 'A global charity working to empower communities through sustainable development and education initiatives.',
    logo: '/images/logos/partner-2.png',
    website: 'https://example.com/hope-international',
    partnerSince: new Date('2019-01-10'),
    isActive: true,
    isFeatured: true,
    type: 'NGO',
    contactEmail: 'info@hopeintl.org',
    contactPhone: '+1-555-234-5678'
  },
  {
    id: uuidv4(),
    name: 'Universal Healthcare Initiative',
    description: 'Dedicated to providing medical services and healthcare training in underserved communities worldwide.',
    logo: '/images/logos/partner-3.png',
    website: 'https://example.com/universal-healthcare',
    partnerSince: new Date('2020-06-22'),
    isActive: true,
    isFeatured: true,
    type: 'Healthcare',
    contactEmail: 'contact@universalhealthcare.org',
    contactPhone: '+1-555-345-6789'
  },
  {
    id: uuidv4(),
    name: 'Education For All',
    description: 'Working to ensure quality education for children in conflict zones and impoverished regions.',
    logo: '/images/logos/partner-4.png',
    website: 'https://example.com/education-for-all',
    partnerSince: new Date('2017-09-05'),
    isActive: true,
    isFeatured: false,
    type: 'Education',
    contactEmail: 'info@educationforall.org',
    contactPhone: '+1-555-456-7890'
  },
  {
    id: uuidv4(),
    name: 'Clean Water Access',
    description: 'Specializing in water infrastructure projects and sanitation training in water-scarce regions.',
    logo: '/images/logos/partner-5.png',
    website: 'https://example.com/clean-water-access',
    partnerSince: new Date('2019-11-18'),
    isActive: true,
    isFeatured: false,
    type: 'Infrastructure',
    contactEmail: 'projects@cleanwateraccess.org',
    contactPhone: '+1-555-567-8901'
  },
  {
    id: uuidv4(),
    name: 'Refugee Support Network',
    description: 'Providing essential services and advocacy for refugees and displaced persons worldwide.',
    logo: '/images/logos/partner-6.png',
    website: 'https://example.com/refugee-support',
    partnerSince: new Date('2021-02-03'),
    isActive: true,
    isFeatured: false,
    type: 'Humanitarian',
    contactEmail: 'help@refugeesupport.org',
    contactPhone: '+1-555-678-9012'
  }
];