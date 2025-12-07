/**
 * Campaign Schema
 * @typedef {Object} Campaign
 * @property {string} _id - Unique identifier for the campaign
 * @property {string} title - Campaign title
 * @property {string} slug - URL-friendly title
 * @property {string} description - Campaign description
 * @property {string} shortDescription - Brief description
 * @property {string} image - Campaign image URL
 * @property {string[]} gallery - Additional image URLs
 * @property {string} video - Video URL
 * @property {string} category - Campaign category
 * @property {string} type - Campaign type
 * @property {string} status - Campaign status
 * @property {Object} funding - Funding information
 * @property {number} funding.goal - Funding goal
 * @property {number} funding.raised - Amount raised
 * @property {number} funding.donors - Number of donors
 * @property {string} funding.currency - Currency code
 * @property {Object} timeline - Campaign timeline
 * @property {Date} timeline.startDate - Start date
 * @property {Date} timeline.endDate - End date
 * @property {boolean} timeline.isRecurring - Recurring campaign flag
 * @property {Object} location - Campaign location
 * @property {string} location.country - Country
 * @property {string} location.region - Region
 * @property {string} location.city - City
 * @property {Object} impact - Impact metrics
 * @property {number} impact.beneficiaries - Number of beneficiaries
 * @property {Object} impact.metrics - Custom impact metrics
 * @property {Object} updates - Campaign updates
 * @property {Object[]} updates.items - Update items
 * @property {string} updates.items.title - Update title
 * @property {string} updates.items.content - Update content
 * @property {string} updates.items.image - Update image
 * @property {Date} updates.items.date - Update date
 * @property {Object} products - Related products
 * @property {Object[]} products.items - Product items
 * @property {string} products.items.id - Product ID
 * @property {string} products.items.name - Product name
 * @property {number} products.items.price - Product price
 * @property {string} products.items.image - Product image
 * @property {Object} sharing - Social sharing
 * @property {number} sharing.shares - Share count
 * @property {Object} sharing.metrics - Sharing metrics
 * @property {Object} analytics - Campaign analytics
 * @property {number} analytics.views - View count
 * @property {number} analytics.conversions - Conversion count
 * @property {Object} settings - Campaign settings
 * @property {boolean} settings.isPublic - Public visibility
 * @property {boolean} settings.allowComments - Comments enabled
 * @property {boolean} settings.allowUpdates - Updates enabled
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const campaignSchema = {
  _id: String,
  title: String,
  slug: String,
  description: String,
  shortDescription: String,
  image: String,
  gallery: [String],
  video: String,
  category: String,
  type: String,
  status: String,
  funding: {
    goal: Number,
    raised: Number,
    donors: Number,
    currency: String
  },
  timeline: {
    startDate: Date,
    endDate: Date,
    isRecurring: Boolean
  },
  location: {
    country: String,
    region: String,
    city: String
  },
  impact: {
    beneficiaries: Number,
    metrics: Object
  },
  updates: {
    items: [{
      title: String,
      content: String,
      image: String,
      date: Date
    }]
  },
  products: {
    items: [{
      id: String,
      name: String,
      price: Number,
      image: String
    }]
  },
  sharing: {
    shares: Number,
    metrics: Object
  },
  analytics: {
    views: Number,
    conversions: Number
  },
  settings: {
    isPublic: Boolean,
    allowComments: Boolean,
    allowUpdates: Boolean
  },
  createdAt: Date,
  updatedAt: Date
};

// Campaign categories enum
export const CampaignCategory = {
  EMERGENCY: 'emergency',
  DEVELOPMENT: 'development',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  FOOD: 'food',
  WATER: 'water',
  SHELTER: 'shelter',
  ORPHAN: 'orphan',
  OTHER: 'other'
};

// Campaign types enum
export const CampaignType = {
  ONE_TIME: 'one_time',
  RECURRING: 'recurring',
  MATCHING: 'matching',
  CROWDFUNDING: 'crowdfunding',
  SPONSORSHIP: 'sponsorship'
};

// Campaign status enum
export const CampaignStatus = {
  DRAFT: 'draft',
  PENDING: 'pending',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived'
}; 