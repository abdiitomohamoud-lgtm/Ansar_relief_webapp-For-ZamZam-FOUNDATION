/**
 * Static campaign data for fallback when API is unavailable
 */
const campaigns = [
  {
    id: '1',
    title: 'Clean Water Initiative',
    slug: 'clean-water-initiative',
    description: 'Provide clean water to communities in need',
    shortDescription: 'Help us provide clean water to communities in need around the world.',
    image: '/images/campaigns/water-project.jpg',
    goal: 25000,
    raised: 15000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    category: {
      id: '1',
      name: 'Water',
      slug: 'water'
    },
    location: 'Multiple Countries'
  },
  {
    id: '2',
    title: 'Education for All',
    slug: 'education-for-all',
    description: 'Support education for underprivileged children',
    shortDescription: 'Help provide quality education to underprivileged children around the world.',
    image: '/images/campaigns/education.jpg',
    goal: 20000,
    raised: 8500,
    startDate: '2024-02-15',
    endDate: '2024-12-15',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    category: {
      id: '2',
      name: 'Education',
      slug: 'education'
    },
    location: 'Global'
  },
  {
    id: '3',
    title: 'Emergency Relief: Gaza',
    slug: 'emergency-relief-gaza',
    description: 'Provide urgent humanitarian aid to families in Gaza',
    shortDescription: 'Help provide emergency relief to families affected by the crisis in Gaza.',
    image: '/images/campaigns/emergency.jpg',
    goal: 100000,
    raised: 45000,
    startDate: '2024-01-10',
    endDate: '2024-07-10',
    isActive: true,
    isFeatured: true,
    isUrgent: true,
    category: {
      id: '3',
      name: 'Emergency',
      slug: 'emergency'
    },
    location: 'Gaza, Palestine'
  },
  {
    id: '4',
    title: 'Orphan Sponsorship Program',
    slug: 'orphan-sponsorship-program',
    description: 'Help provide care and education for orphaned children',
    shortDescription: 'Support orphaned children with care, education, and a chance for a better future.',
    image: '/images/campaigns/orphans.jpg',
    goal: 50000,
    raised: 12000,
    startDate: '2023-12-01',
    endDate: null,
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    category: {
      id: '4',
      name: 'Orphans',
      slug: 'orphans'
    },
    location: 'Multiple Countries'
  },
  {
    id: '5',
    title: 'Empowering Poor Families',
    slug: 'empowering-poor-families',
    description: 'Help families rise out of poverty through sustainable support',
    shortDescription: 'Support families with sustainable solutions to escape the cycle of poverty.',
    image: '/images/campaigns/family-support.jpg',
    goal: 50000,
    raised: 24000,
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    isActive: true,
    isFeatured: false,
    isUrgent: false,
    category: {
      id: '5',
      name: 'Family',
      slug: 'family'
    },
    location: 'Multiple Regions'
  }
];

export default campaigns; 