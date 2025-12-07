const mongoose = require('mongoose');
const { Schema } = mongoose;

const InitiativeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  description: String,
  image: String,
  impact: String,
  location: String,
  status: String,
  progress: Number,
  startDate: String
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
  id: Number,
  name: String,
  role: String,
  quote: String,
  image: String
}, { _id: false });

const ImpactStatSchema = new mongoose.Schema({
  number: String,
  label: String
}, { _id: false });

const WhatWeDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  iconName: String,
  stats: String,
  gradient: String,
  bgPattern: String,
  bgSize: String
}, { _id: false });

const CampaignSchema = new mongoose.Schema({
  title: String,
  image: String,
  ref: String,
  description: String,
  percentFunded: Number
}, { _id: false });

const DonationFieldSchema = new mongoose.Schema({
  name: String,
  iconName: String,
  description: String,
  projects: Number,
  impact: String,
  gradient: String
}, { _id: false });

const DailySadaqaSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  image: String,
  stats: {
    currency: String,
    amount: String,
    label: String
  }
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  image: String,
  title: String,
  subtitle: String,
  description: String,
  buttons: [{ label: String, link: String }],
  stats: [{ label: String, value: String }]
}, { _id: false });

const MembershipSchema = new mongoose.Schema({
  label: String,
  value: String
}, { _id: false });

const InitiativesPageSchema = new mongoose.Schema({
  hero: HeroSchema,
  categories: [{ id: String, name: String, iconName: String }],
  donationCategories: [{ id: String, name: String }],
  initiatives: [InitiativeSchema],
  testimonials: [TestimonialSchema],
  impactStats: [ImpactStatSchema],
  whatWeDo: [WhatWeDoSchema],
  valuesAndPrinciples: [String],
  campaigns: [CampaignSchema],
  donationFields: [DonationFieldSchema],
  dailySadaqa: DailySadaqaSchema,
  memberships: [MembershipSchema],
  uiText: { type: Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model('InitiativesPage', InitiativesPageSchema);
