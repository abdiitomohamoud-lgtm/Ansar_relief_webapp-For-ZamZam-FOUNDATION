const mongoose = require('mongoose');

const ValueSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String
}, { _id: false });

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  bio: String,
  linkedin: String
}, { _id: false });

const ImpactStatSchema = new mongoose.Schema({
  label: String,
  value: String
}, { _id: false });

const CTAActionSchema = new mongoose.Schema({
  label: String,
  link: String,
  type: String
}, { _id: false });

const BoardMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  image: String,
  linkedin: String
}, { _id: false });

const CommitteeSchema = new mongoose.Schema({
  name: String,
  description: String
}, { _id: false });

const ProgramSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String
}, { _id: false });

const TimelineEventSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String,
  image: String
}, { _id: false });

const AboutPageSchema = new mongoose.Schema({
  hero: {
    title: String,
    subtitle: String,
    description: String,
    image: String
  },
  story: {
    title: String,
    whoWeAre: String,
    mission: String,
    approaches: String,
    paragraphs: [String],
    image: String,
    missionLink: String
  },
  values: [ValueSchema],
  team: {
    title: String,
    description: String,
    members: [TeamMemberSchema]
  },
  fullTeamLink: String,
  impactStats: [ImpactStatSchema],
  cta: {
    title: String,
    description: String,
    actions: [CTAActionSchema]
  },
  mission: {
    description: String,
    statement: String,
    vision: String,
    values: [ValueSchema]
  },
  governance: {
    description: String,
    structure: {
      board: [BoardMemberSchema],
      committees: [CommitteeSchema]
    }
  },
  overview: {
    programs: [ProgramSchema]
  },
  history: {
    title: String,
    description: String,
    events: [TimelineEventSchema]
  },
  transparency: {
    description: String,
    reports: [
      {
        title: String,
        year: String,
        downloadUrl: String,
        summary: String
      }
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
        description: String,
        image: String,
        verificationLink: String,
        category: String,
        certNumber: String,
        expiryDate: String,
        criteria: [String]
      }
    ],
    financials: {
      programExpenses: String,
      administrative: String,
      fundraising: String
    }
  }
});

module.exports = mongoose.model('AboutPage', AboutPageSchema);
