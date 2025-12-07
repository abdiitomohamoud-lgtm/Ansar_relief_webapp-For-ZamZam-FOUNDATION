/**
 * Program Schema
 * @typedef {Object} Program
 * @property {string} _id - Unique identifier for the program
 * @property {string} title - Program title
 * @property {string} slug - URL-friendly title
 * @property {string} description - Program description
 * @property {string} shortDescription - Brief description
 * @property {string} image - Program image URL
 * @property {string[]} gallery - Additional image URLs
 * @property {string} video - Video URL
 * @property {string} category - Program category
 * @property {string} type - Program type
 * @property {string} status - Program status
 * @property {Object} funding - Funding information
 * @property {number} funding.goal - Funding goal
 * @property {number} funding.raised - Amount raised
 * @property {number} funding.donors - Number of donors
 * @property {string} funding.currency - Currency code
 * @property {Object} timeline - Program timeline
 * @property {Date} timeline.startDate - Start date
 * @property {Date} timeline.endDate - End date
 * @property {boolean} timeline.isOngoing - Ongoing program flag
 * @property {Object} location - Program location
 * @property {string} location.country - Country
 * @property {string} location.region - Region
 * @property {string} location.city - City
 * @property {Object} impact - Impact metrics
 * @property {number} impact.beneficiaries - Number of beneficiaries
 * @property {Object} impact.metrics - Custom impact metrics
 * @property {Object} updates - Program updates
 * @property {Object[]} updates.items - Update items
 * @property {string} updates.items.title - Update title
 * @property {string} updates.items.content - Update content
 * @property {string} updates.items.image - Update image
 * @property {Date} updates.items.date - Update date
 * @property {Object} partners - Partner organizations
 * @property {Object[]} partners.items - Partner items
 * @property {string} partners.items.id - Partner ID
 * @property {string} partners.items.name - Partner name
 * @property {string} partners.items.logo - Partner logo
 * @property {Object} resources - Program resources
 * @property {Object[]} resources.items - Resource items
 * @property {string} resources.items.title - Resource title
 * @property {string} resources.items.type - Resource type
 * @property {string} resources.items.url - Resource URL
 * @property {Object} analytics - Program analytics
 * @property {number} analytics.views - View count
 * @property {number} analytics.engagement - Engagement score
 * @property {Object} settings - Program settings
 * @property {boolean} settings.isPublic - Public visibility
 * @property {boolean} settings.allowDonations - Donations enabled
 * @property {boolean} settings.allowUpdates - Updates enabled
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const programSchema = {
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
    isOngoing: Boolean
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
  partners: {
    items: [{
      id: String,
      name: String,
      logo: String
    }]
  },
  resources: {
    items: [{
      title: String,
      type: String,
      url: String
    }]
  },
  analytics: {
    views: Number,
    engagement: Number
  },
  settings: {
    isPublic: Boolean,
    allowDonations: Boolean,
    allowUpdates: Boolean
  },
  createdAt: Date,
  updatedAt: Date
};

// Program categories enum
export const ProgramCategory = {
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  FOOD_SECURITY: 'food_security',
  WATER_SANITATION: 'water_sanitation',
  SOCIAL_WELFARE: 'social_welfare',
  SOCIAL_COHESION: 'social_cohesion',
  SOCIAL_HOUSING: 'social_housing',
  ECONOMIC_EMPOWERMENT: 'economic_empowerment',
  HUMANITARIAN_ASSISTANCE: 'humanitarian_assistance',
  OTHER: 'other'
};

// Program types enum
export const ProgramType = {
  DEVELOPMENT: 'development',
  RELIEF: 'relief',
  CAPACITY_BUILDING: 'capacity_building',
  ADVOCACY: 'advocacy',
  RESEARCH: 'research',
  OTHER: 'other'
};

// Program status enum
export const ProgramStatus = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived'
};

// Resource types enum
export const ResourceType = {
  DOCUMENT: 'document',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  LINK: 'link',
  OTHER: 'other'
}; 