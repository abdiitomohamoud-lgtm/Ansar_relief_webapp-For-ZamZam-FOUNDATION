const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
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
    goal: {
      type: Number,
      required: true,
      min: 0,
    },
    raised: {
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
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    content: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    gallery: [String],
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search
campaignSchema.index({ title: 'text', description: 'text', shortDescription: 'text' });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign; 