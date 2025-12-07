/**
 * Sponsorship Schema
 * @typedef {Object} Sponsorship
 * @property {string} _id - Unique identifier for the sponsorship
 * @property {string} title - Sponsorship title
 * @property {string} slug - URL-friendly title
 * @property {string} description - Sponsorship description
 * @property {string} shortDescription - Brief description
 * @property {string} image - Sponsorship image URL
 * @property {string[]} gallery - Additional image URLs
 * @property {string} video - Video URL
 * @property {string} category - Sponsorship category
 * @property {string} type - Sponsorship type
 * @property {string} status - Sponsorship status
 * @property {Object} funding - Funding information
 * @property {number} funding.goal - Funding goal
 * @property {number} funding.raised - Amount raised
 * @property {number} funding.sponsors - Number of sponsors
 * @property {string} funding.currency - Currency code
 * @property {Object} timeline - Sponsorship timeline
 * @property {Date} timeline.startDate - Start date
 * @property {Date} timeline.endDate - End date
 * @property {boolean} timeline.isRecurring - Recurring sponsorship flag
 * @property {Object} location - Sponsorship location
 * @property {string} location.country - Country
 * @property {string} location.region - Region
 * @property {string} location.city - City
 * @property {Object} beneficiary - Beneficiary information
 * @property {string} beneficiary.id - Beneficiary ID
 * @property {string} beneficiary.name - Beneficiary name
 * @property {string} beneficiary.type - Beneficiary type
 * @property {Object} beneficiary.details - Beneficiary details
 * @property {Object} sponsor - Sponsor information
 * @property {string} sponsor.id - Sponsor ID
 * @property {string} sponsor.name - Sponsor name
 * @property {string} sponsor.email - Sponsor email
 * @property {Object} sponsor.preferences - Sponsor preferences
 * @property {Object} updates - Sponsorship updates
 * @property {Object[]} updates.items - Update items
 * @property {string} updates.items.title - Update title
 * @property {string} updates.items.content - Update content
 * @property {string} updates.items.image - Update image
 * @property {Date} updates.items.date - Update date
 * @property {Object} communication - Communication settings
 * @property {boolean} communication.allowUpdates - Updates enabled
 * @property {boolean} communication.allowMessages - Messages enabled
 * @property {string} communication.frequency - Update frequency
 * @property {Object} analytics - Sponsorship analytics
 * @property {number} analytics.views - View count
 * @property {number} analytics.engagement - Engagement score
 * @property {Object} settings - Sponsorship settings
 * @property {boolean} settings.isPublic - Public visibility
 * @property {boolean} settings.allowDonations - Donations enabled
 * @property {boolean} settings.allowUpdates - Updates enabled
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const sponsorshipSchema = {
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
    sponsors: Number,
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
  beneficiary: {
    id: String,
    name: String,
    type: String,
    details: Object
  },
  sponsor: {
    id: String,
    name: String,
    email: String,
    preferences: Object
  },
  updates: {
    items: [{
      title: String,
      content: String,
      image: String,
      date: Date
    }]
  },
  communication: {
    allowUpdates: Boolean,
    allowMessages: Boolean,
    frequency: String
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

// Sponsorship categories enum
export const SponsorshipCategory = {
  ORPHAN: 'orphan',
  STUDENT: 'student',
  TEACHER: 'teacher',
  HAFIZ: 'hafiz',
  FAMILY: 'family',
  MEDICAL: 'medical',
  SPECIAL_NEEDS: 'special_needs',
  WIDOW: 'widow',
  OTHER: 'other'
};

// Sponsorship types enum
export const SponsorshipType = {
  ONE_TIME: 'one_time',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom'
};

// Sponsorship status enum
export const SponsorshipStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived'
};

// Beneficiary types enum
export const BeneficiaryType = {
  INDIVIDUAL: 'individual',
  FAMILY: 'family',
  GROUP: 'group',
  COMMUNITY: 'community',
  ORGANIZATION: 'organization'
};

// Communication frequency enum
export const CommunicationFrequency = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom'
}; 