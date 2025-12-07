const mongoose = require('mongoose');


const MockProjectSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  image: String,
  location: String,
  targetAmount: Number,
  raisedAmount: mongoose.Schema.Types.Mixed,
  beneficiaries: mongoose.Schema.Types.Mixed,
  status: String
});


const ProjectsPageSchema = new mongoose.Schema({
  pageMeta: {
    title: String
  },
  hero: {
    headline: String,
    subheading: String,
    description: String,
    backgroundImage: String,
    patternImage: String,
    buttons: [{
      label: String,
      icon: String,
      to: String
    }]
  },
  impactHighlights: {
    title: String,
    stats: [{
      icon: String,
      value: String,
      label: String
    }]
  },
  categoriesSection: {
    title: String,
    description: String,
    categories: [{
      id: String,
      title: String,
      icon: String,
      description: String,
      count: Number,
      color: String,
      image: String
    }],
    button: {
      label: String,
      icon: String,
      to: String
    }
  },
  featuredProjectsSection: {
    title: String,
    headline: String,
    description: String,
    button: {
      label: String,
      icon: String,
      to: String
    }
  },
  mockProjects: [MockProjectSchema],
  filters: {
    statusOptions: [String],
    sortOptions: [String]
  },
  projectStatusStyles: {
    active: String,
    completed: String,
    default: String
  },
  projectCard: {
    fundingLabel: String,
    beneficiariesLabel: String,
    progressBarColor: String
  },
  processSection: {
    title: String,
    steps: [{
      icon: String,
      title: String,
      description: String,
      color: String,
      image: String
    }]
  },
  timelineSection: {
    title: String,
    steps: [{
      icon: String,
      title: String,
      description: String
    }]
  },
  callToActionSection: {
    headline: String,
    description: String,
    buttons: [{
      label: String,
      icon: String,
      to: String
    }],
    background: String
  }
});

module.exports = mongoose.model('ProjectsPage', ProjectsPageSchema);
