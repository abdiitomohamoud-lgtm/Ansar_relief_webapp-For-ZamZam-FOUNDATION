// Seed script for userProfilePage collection in ansar_db_2025
const mongoose = require('mongoose');
const UserProfilePage = require('../models/userProfilePage');

const seedData = {
  profileInfo: {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Ahmed Yusuf',
    email: 'ahmed.yusuf@example.com',
    location: 'Hargeisa, Somaliland',
    joinDate: 'Feb 2022',
    badges: [
      { type: 'Verified Donor', icon: 'FaMedal' },
      { type: 'Top Supporter', icon: 'FaRegThumbsUp' },
      { type: 'Community Builder', icon: 'FaGlobe' }
    ]
  },
  stats: {
    totalDonated: 4200,
    monthlyAverage: 350,
    campaignsSupported: 15,
    impactScore: 92,
    trend: 'up',
    trendValue: '18% from last month',
    recentDonations: [
      { month: 'Jan', amount: 400 },
      { month: 'Feb', amount: 350 },
      { month: 'Mar', amount: 500 },
      { month: 'Apr', amount: 600 },
      { month: 'May', amount: 700 },
      { month: 'Jun', amount: 800 }
    ]
  },
  impactBadges: [
    { level: 'Compassionate Donor', score: 1200, icon: 'FaHandHoldingHeart' },
    { level: 'Regular Supporter', score: 950, icon: 'FaRegStar' },
    { level: 'Community Builder', score: 800, icon: 'FaGlobe' },
    { level: 'Education Advocate', score: 700, icon: 'FaRegLightbulb' }
  ],
  recentActivity: [
    {
      id: 1,
      icon: 'FaHandHoldingHeart',
      title: 'Donated to Orphan Sponsorship',
      description: 'Contributed $500 to Orphan Sponsorship Program',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 2,
      icon: 'FaRegBookmark',
      title: 'Saved Campaign',
      description: 'Saved "Water for All" to your watchlist',
      time: '2 days ago',
      status: 'completed'
    },
    {
      id: 3,
      icon: 'FaRegCreditCard',
      title: 'Updated Payment Method',
      description: 'Added a new Mastercard ending in 5678',
      time: '5 days ago',
      status: 'completed'
    },
    {
      id: 4,
      icon: 'FaRegThumbsUp',
      title: 'Campaign Supported',
      description: 'Supported "Education for All" campaign',
      time: '1 week ago',
      status: 'completed'
    }
  ],
  savedCampaigns: [
    {
      id: 1,
      name: 'Water for All',
      image: '/images/campaigns/water-for-all.jpg',
      description: 'Building wells and water purification systems in rural Somaliland.',
      progress: 80,
      goal: 60000,
      raised: 48000,
      daysLeft: 10
    },
    {
      id: 2,
      name: 'Orphan Sponsorship Program',
      image: '/images/campaigns/orphan.jpg',
      description: 'Supporting orphaned children with food, education, and healthcare.',
      progress: 65,
      goal: 120000,
      raised: 78000,
      daysLeft: 25
    },
    {
      id: 3,
      name: 'Education for All',
      image: '/images/campaigns/education.jpg',
      description: 'Providing scholarships and resources to underprivileged children.',
      progress: 95,
      goal: 35000,
      raised: 33250,
      daysLeft: 3
    },
    {
      id: 4,
      name: 'Emergency Relief: Gaza',
      image: '/images/campaigns/emergency-relief.jpg',
      description: 'Providing essential supplies and medical aid to families affected by the crisis.',
      progress: 50,
      goal: 100000,
      raised: 50000,
      daysLeft: 40
    },
    {
      id: 5,
      name: 'Women Empowerment',
      image: '/images/campaigns/women-empowerment.jpg',
      description: 'Empowering women through education and entrepreneurship.',
      progress: 70,
      goal: 40000,
      raised: 28000,
      daysLeft: 20
    }
  ],
  settings: {
    notificationPreferences: {
      email: true,
      sms: true,
      push: false
    },
    paymentMethods: [
      {
        type: 'Visa',
        last4: '4242',
        expires: '12/24',
        default: true
      },
      {
        type: 'Mastercard',
        last4: '5678',
        expires: '09/25',
        default: false
      },
      {
        type: 'Amex',
        last4: '1234',
        expires: '05/27',
        default: false
      }
    ],
    security: {
      twoFactorEnabled: true
    },
    preferences: {
      darkMode: true,
      language: 'so',
      currency: 'usd',
      sendReceipts: true,
      receiveUpdates: true,
      showRecommendations: true
    },
    privacy: {
      showDonationsPublicly: true,
      showNameOnDonorLists: false
    }
  }
};

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
  await UserProfilePage.deleteMany({});
  await UserProfilePage.create(seedData);
  console.log('Seeded userProfilePage data!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
