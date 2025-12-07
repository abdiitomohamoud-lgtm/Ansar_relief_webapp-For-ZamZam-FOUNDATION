const mongoose = require('mongoose');

const campaignPageBaseOptions = {
  discriminatorKey: 'type',
  collection: 'campaignPage'
};

const CampaignPageBaseSchema = new mongoose.Schema({
  type: { type: String, required: true }
}, campaignPageBaseOptions);

const CampaignPage = mongoose.models.CampaignPage || mongoose.model('CampaignPage', CampaignPageBaseSchema);

// Content document
const CampaignPageContentSchema = new mongoose.Schema({
  hero: {
    headline: String,
    subheading: String,
    badge: String,
    ctaDonate: String,
    ctaVolunteer: String,
    backgroundImage: String
  },
  ctaBottom: {
    heading: String,
    subtext: String,
    contact: String,
    initiatives: String
  }
}, campaignPageBaseOptions);

// Campaign card document
const CampaignPageCampaignSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  image: String,
  raised: Number,
  goal: Number,
  category: String,
  daysLeft: Number,
  licenseNumber: String,
  isUrgent: Boolean,
  longDescription: String,
  gallery: [String],
  country: String,
  location: String,
  donorsCount: Number,
  createdAt: String,
  updates: [
    {
      id: Number,
      date: String,
      title: String,
      content: String
    }
  ]
}, campaignPageBaseOptions);

// Category document
const CampaignPageCategorySchema = new mongoose.Schema({
  id: String,
  name: String,
  icon: String,
  count: Number
}, campaignPageBaseOptions);

// Register discriminators with unique names
CampaignPage.discriminator('CampaignPageContent', CampaignPageContentSchema);
CampaignPage.discriminator('CampaignPageCampaign', CampaignPageCampaignSchema);
CampaignPage.discriminator('CampaignPageCategory', CampaignPageCategorySchema);

module.exports = CampaignPage;
