const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  raised: Number,
  goal: Number,
  category: String,
  daysLeft: Number,
  licenseNumber: String,
  isUrgent: Boolean
}, { _id: false });

const UrgentCaseSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  amount: Number,
  remaining: Number,
  image: String
}, { _id: false });

const ImpactStatsSchema = new mongoose.Schema({
  beneficiaries: Number,
  countries: Number,
  projects: Number,
  volunteers: Number
}, { _id: false });

const ProgramSchema = new mongoose.Schema({
  title: String,
  icon: String,
  link: String,
  color: String,
  bgLight: String,
  border: String,
  textHover: String,
  shadow: String,
  description: String
}, { _id: false });

const SadaqahTypeSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  link: String
}, { _id: false });

const SponsorshipProgramSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  amount: String,
  link: String,
  icon: String,
  benefits: [String]
}, { _id: false });

const HowWeWorkStepSchema = new mongoose.Schema({
  step: Number,
  title: String,
  description: String,
  icon: String,
  color: String,
  bgLight: String,
  textColor: String
}, { _id: false });

const AppInfoSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  appStoreLink: String,
  googlePlayLink: String,
  screenshots: [String]
}, { _id: false });

const HeroSlideSchema = new mongoose.Schema({
  id: Number,
  title: String,
  subtitle: String,
  description: String,
  image: String,
  btnText: String,
  btnLink: String,
  licenseNumber: String,
  color: String,
  textColor: String,
  gradientText: String,
  icon: String,
  highlight: String,
  iconBg: String,
  backgroundPatterns: [String]
}, { _id: false });

const NewsItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  excerpt: String,
  content: String, // Add content field for full article support
  image: String,
  gallery: [String], // Add gallery field for multiple images
  category: String,
  author: String,
  date: String,
  comments: Number,
  featured: Boolean,
  tags: [String],
  readTime: String
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
  id: Number,
  name: String,
  role: String,
  location: String,
  quote: String,
  image: String
}, { _id: false });

const PartnerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  website: String
}, { _id: false });

const HomePageDataSchema = new mongoose.Schema({
  featuredCampaigns: [CampaignSchema],
  impactStats: ImpactStatsSchema,
  urgentCases: [UrgentCaseSchema],
  currentCampaigns: [CampaignSchema],
  programs: [ProgramSchema],
  sadaqahTypes: [SadaqahTypeSchema],
  sponsorshipPrograms: [SponsorshipProgramSchema],
  howWeWorkSteps: [HowWeWorkStepSchema],
  appInfo: AppInfoSchema,
  heroSlides: [HeroSlideSchema],
  news: [NewsItemSchema],
  testimonials: [TestimonialSchema],
  partners: [PartnerSchema]
});

module.exports = mongoose.model('HomePageData', HomePageDataSchema);
