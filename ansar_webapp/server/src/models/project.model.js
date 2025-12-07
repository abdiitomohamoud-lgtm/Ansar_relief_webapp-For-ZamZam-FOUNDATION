const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    spent: {
      type: Number,
      default: 0,
      min: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'completed', 'cancelled'],
      default: 'planning',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    licenseNumber: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    gallery: [String],
    beneficiaries: {
      type: Map,
      of: Number,
      default: {},
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    media: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    }],
  },
  {
    timestamps: true,
  }
);

// Create index for search
projectSchema.index({ title: 'text', description: 'text', location: 'text', country: 'text' });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 