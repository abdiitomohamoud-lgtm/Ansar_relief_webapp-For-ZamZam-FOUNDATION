import { 
  FaHandHoldingHeart,
  FaGift,
  FaBuilding,
  FaBullhorn,
  FaUsers,
  FaMedkit,
  FaHeart,
  FaMosque,
  FaGraduationCap,
  FaWater,
  FaHome,
  FaHandHoldingUsd,
  FaHandsHelping,
  FaChild,
  FaRegBell
} from 'react-icons/fa';

// Donation categories data
export const donationCategories = {
  sadaqah: {
    name: 'Sadaqah',
    icon: <FaHandHoldingHeart />,
    subcategories: ['General Sadaqah', 'Daily Sadaqah', 'Friday Sadaqah', 'Food Distribution']
  },
  general: {
    name: 'General Donation',
    icon: <FaGift />,
    subcategories: ['Where Most Needed', 'Zakat Fund', 'Emergency Relief']
  },
  projects: {
    name: 'Projects',
    icon: <FaBuilding />,
    subcategories: ['Masjid Construction', 'Water Wells', 'Schools', 'Medical Clinics']
  },
  campaigns: {
    name: 'Current Campaigns',
    icon: <FaBullhorn />,
    subcategories: ['Gaza Emergency', 'Syria Relief', 'Yemen Crisis', 'Turkey Earthquake']
  },
  sponsorship: {
    name: 'Sponsorships',
    icon: <FaUsers />,
    subcategories: ['Orphan Sponsorship', 'Family Support', 'Student Sponsorship', 'Widow Care']
  },
  immediate: {
    name: 'Immediate Needs',
    icon: <FaMedkit />,
    subcategories: ['Debtors', 'Widows', 'Sick', 'No Income', 'Divorced', 'Limited Income']
  }
};

// Subcategory icons
export const subcategoryIcons = {
  // Sadaqah subcategory icons
  'General Sadaqah': <FaHandHoldingHeart />,
  'Daily Sadaqah': <FaHeart />,
  'Friday Sadaqah': <FaMosque />,
  'Food Distribution': <FaGift />,
  
  // General Donation subcategory icons
  'Where Most Needed': <FaRegBell />,
  'Zakat Fund': <FaHandHoldingHeart />,
  'Emergency Relief': <FaMedkit />,
  
  // Projects subcategory icons
  'Masjid Construction': <FaMosque />,
  'Water Wells': <FaWater />,
  'Schools': <FaGraduationCap />,
  'Medical Clinics': <FaMedkit />,
  
  // Campaigns subcategory icons
  'Gaza Emergency': <FaRegBell />,
  'Syria Relief': <FaHandsHelping />,
  'Yemen Crisis': <FaMedkit />,
  'Turkey Earthquake': <FaBuilding />,
  
  // Sponsorship subcategory icons
  'Orphan Sponsorship': <FaChild />,
  'Family Support': <FaUsers />,
  'Student Sponsorship': <FaGraduationCap />,
  'Widow Care': <FaHeart />
};

// Donation type options
export const donationTypeOptions = [
  { 
    id: 'one-time', 
    name: 'Single Donation', 
    description: 'One-time payment' 
  },
  { 
    id: 'periodic', 
    name: 'Periodic Donation', 
    description: 'Recurring payments' 
  }
];

// Donation frequency options
export const frequencyOptions = [
  'Daily',
  'Weekly',
  'Monthly',
  'Every Friday',
  'Yearly',
  'Mon & Thu'
];

// Pre-defined donation amounts
export const predefinedAmounts = [25, 50, 100, 200, 300, 500, 1000, 2000];

// Payment method options
export const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: 'FaRegCreditCard'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: 'FaBuilding'
  }
]; 