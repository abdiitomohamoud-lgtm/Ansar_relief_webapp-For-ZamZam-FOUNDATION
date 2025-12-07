const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for categories
 */
module.exports = [
  {
    id: uuidv4(),
    name: 'Emergency',
    slug: 'emergency',
    description: 'Urgent humanitarian aid for crisis situations',
    icon: 'FaFire',
    color: 'red',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Water',
    slug: 'water',
    description: 'Clean water projects and solutions',
    icon: 'FaWater',
    color: 'blue',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Education',
    slug: 'education',
    description: 'Educational programs and school support',
    icon: 'FaSchool',
    color: 'yellow',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Food',
    slug: 'food',
    description: 'Food distribution and nutrition programs',
    icon: 'FaUtensils',
    color: 'green',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Medical services and healthcare programs',
    icon: 'FaHospital',
    color: 'teal',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Orphans',
    slug: 'orphans',
    description: 'Support for orphaned children',
    icon: 'FaChild',
    color: 'purple',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Family',
    slug: 'family',
    description: 'Support for families in need',
    icon: 'FaHome',
    color: 'pink',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Ramadan',
    slug: 'ramadan',
    description: 'Ramadan charity programs',
    icon: 'FaMosque',
    color: 'orange',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Zakat',
    slug: 'zakat',
    description: 'Zakat collection and distribution',
    icon: 'FaPrayingHands',
    color: 'indigo',
    isActive: true
  },
  {
    id: uuidv4(),
    name: 'Sadaqah',
    slug: 'sadaqah',
    description: 'General charity and donations',
    icon: 'FaHandshake',
    color: 'cyan',
    isActive: true
  }
]; 