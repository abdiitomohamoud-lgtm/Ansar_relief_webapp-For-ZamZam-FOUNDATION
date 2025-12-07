const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for team members
 */
module.exports = [
  {
    id: uuidv4(),
    name: 'Dr. Ahmed Hassan',
    title: 'Executive Director',
    bio: 'Dr. Ahmed Hassan has over 20 years of experience in humanitarian work and international development. Before joining our organization, he served as a senior advisor for several international NGOs and worked with the United Nations on refugee assistance programs. He holds a Ph.D. in International Relations and has published extensively on humanitarian intervention and sustainable development.',
    image: '/images/team/ahmed-hassan.jpg',
    email: 'ahmed.hassan@example.org',
    department: 'Executive Leadership',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/ahmedhassan',
      twitter: 'https://twitter.com/ahmedhassan'
    },
    isActive: true,
    isFeatured: true,
    order: 1,
    role: 'executive'
  },
  {
    id: uuidv4(),
    name: 'Fatima Al-Zahra',
    title: 'Chairperson, Board of Directors',
    bio: 'Fatima Al-Zahra brings extensive leadership experience from her 25-year career in corporate governance and philanthropy. As the former CEO of a multinational corporation, she has unique insights into organizational management and strategic planning. She now dedicates her expertise to guiding our organization\'s vision and ensuring effective governance. Fatima holds an MBA from Harvard Business School and serves on several nonprofit boards.',
    image: '/images/team/fatima-alzahra.jpg',
    email: 'fatima.alzahra@example.org',
    department: 'Board of Directors',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/fatimaalzahra'
    },
    isActive: true,
    isFeatured: true,
    order: 2,
    role: 'board'
  },
  {
    id: uuidv4(),
    name: 'Dr. Sarah Johnson',
    title: 'Medical Programs Director',
    bio: 'Dr. Sarah Johnson is a physician with specialized training in public health and emergency medicine. She has led medical relief missions in over 15 countries and developed innovative healthcare delivery models for underserved communities. Before joining our team, she worked with Doctors Without Borders for eight years. Sarah holds an MD from Johns Hopkins University and a Master\'s in Public Health from the London School of Hygiene and Tropical Medicine.',
    image: '/images/team/sarah-johnson.jpg',
    email: 'sarah.johnson@example.org',
    department: 'Programs',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/drsarahjohnson'
    },
    isActive: true,
    isFeatured: true,
    order: 3,
    role: 'staff'
  },
  {
    id: uuidv4(),
    name: 'Mohammed Al-Farsi',
    title: 'Chief Financial Officer',
    bio: 'Mohammed Al-Farsi oversees our organization\'s financial operations, ensuring transparency, accountability, and efficient use of resources. With 15 years of experience in nonprofit financial management, he has implemented systems that maximize the impact of every donated dollar. Mohammed is a Certified Public Accountant and holds an MBA with a focus on nonprofit management from the University of Chicago.',
    image: '/images/team/mohammed-alfarsi.jpg',
    email: 'mohammed.alfarsi@example.org',
    department: 'Finance',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/mohammedalfarsi'
    },
    isActive: true,
    isFeatured: false,
    order: 4,
    role: 'executive'
  },
  {
    id: uuidv4(),
    name: 'Aisha Rahman',
    title: 'Education Programs Manager',
    bio: 'Aisha Rahman leads our education initiatives, developing programs that provide quality education to children in crisis-affected areas. Her innovative approaches have increased school enrollment and improved learning outcomes in several countries. With a background in educational psychology and international development, Aisha brings both theoretical knowledge and practical experience to her role. She holds a Master\'s in International Education Policy from Harvard University.',
    image: '/images/team/aisha-rahman.jpg',
    email: 'aisha.rahman@example.org',
    department: 'Programs',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/aisharahman',
      twitter: 'https://twitter.com/aisharahman'
    },
    isActive: true,
    isFeatured: false,
    order: 5,
    role: 'staff'
  },
  {
    id: uuidv4(),
    name: 'Omar Khalid',
    title: 'Water and Sanitation Specialist',
    bio: 'Omar Khalid is an environmental engineer specializing in water and sanitation solutions for humanitarian contexts. He has designed and implemented water systems that serve over 500,000 people in refugee camps and rural communities. His expertise includes water quality testing, well construction, and community-based water management. Omar holds a Master\'s in Environmental Engineering from MIT and has completed specialized training in emergency WASH interventions.',
    image: '/images/team/omar-khalid.jpg',
    email: 'omar.khalid@example.org',
    department: 'Programs',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/omarkhalid'
    },
    isActive: true,
    isFeatured: false,
    order: 6,
    role: 'staff'
  }
]; 