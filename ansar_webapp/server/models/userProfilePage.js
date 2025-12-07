const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  type: String,
  icon: String
}, { _id: false });

const DonationSchema = new mongoose.Schema({
  month: String,
  amount: Number
}, { _id: false });

const CampaignSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  description: String,
  progress: Number,
  goal: Number,
  raised: Number,
  daysLeft: Number
}, { _id: false });

const PaymentMethodSchema = new mongoose.Schema({
  type: String,
  last4: String,
  expires: String,
  default: Boolean
}, { _id: false });

const RecentActivitySchema = new mongoose.Schema({
  id: Number,
  icon: String,
  title: String,
  description: String,
  time: String,
  status: String
}, { _id: false });

const ImpactBadgeSchema = new mongoose.Schema({
  level: String,
  score: Number,
  icon: String
}, { _id: false });

const SettingsSchema = new mongoose.Schema({
  notificationPreferences: {
    email: Boolean,
    sms: Boolean,
    push: Boolean
  },
  paymentMethods: [PaymentMethodSchema],
  security: {
    twoFactorEnabled: Boolean
  },
  preferences: {
    darkMode: Boolean,
    language: String,
    currency: String,
    sendReceipts: Boolean,
    receiveUpdates: Boolean,
    showRecommendations: Boolean
  },
  privacy: {
    showDonationsPublicly: Boolean,
    showNameOnDonorLists: Boolean
  }
}, { _id: false });

const UserProfilePageSchema = new mongoose.Schema({
  profileInfo: {
    avatar: String,
    name: String,
    email: String,
    location: String,
    gender: String,
    bio: String,
    joinDate: String,
    badges: [BadgeSchema],
    phone: String,
    address: String,
    dob: String
  },
  stats: {
    totalDonated: Number,
    monthlyAverage: Number,
    campaignsSupported: Number,
    impactScore: Number,
    trend: String,
    trendValue: String,
    recentDonations: [DonationSchema]
  },
  impactBadges: [ImpactBadgeSchema],
  recentActivity: [RecentActivitySchema],
  savedCampaigns: [CampaignSchema],
  settings: SettingsSchema
});

module.exports = mongoose.model('UserProfilePage', UserProfilePageSchema);
