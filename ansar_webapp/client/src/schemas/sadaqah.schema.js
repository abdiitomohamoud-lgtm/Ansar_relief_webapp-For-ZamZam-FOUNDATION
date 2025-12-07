/**
 * Sadaqah Schema
 * @typedef {Object} Sadaqah
 * @property {string} _id - Unique identifier for the sadaqah
 * @property {string} title - Sadaqah title
 * @property {string} slug - URL-friendly title
 * @property {string} description - Sadaqah description
 * @property {string} shortDescription - Brief description
 * @property {string} image - Sadaqah image URL
 * @property {string[]} gallery - Additional image URLs
 * @property {string} video - Video URL
 * @property {string} category - Sadaqah category
 * @property {string} type - Sadaqah type
 * @property {string} status - Sadaqah status
 * @property {Object} funding - Funding information
 * @property {number} funding.goal - Funding goal
 * @property {number} funding.raised - Amount raised
 * @property {number} funding.donors - Number of donors
 * @property {string} funding.currency - Currency code
 * @property {Object} timeline - Sadaqah timeline
 * @property {Date} timeline.startDate - Start date
 * @property {Date} timeline.endDate - End date
 * @property {boolean} timeline.isRecurring - Recurring sadaqah flag
 * @property {Object} location - Sadaqah location
 * @property {string} location.country - Country
 * @property {string} location.region - Region
 * @property {string} location.city - City
 * @property {Object} impact - Impact metrics
 * @property {number} impact.beneficiaries - Number of beneficiaries
 * @property {Object} impact.metrics - Custom impact metrics
 * @property {Object} updates - Sadaqah updates
 * @property {Object[]} updates.items - Update items
 * @property {string} updates.items.title - Update title
 * @property {string} updates.items.content - Update content
 * @property {string} updates.items.image - Update image
 * @property {Date} updates.items.date - Update date
 * @property {Object} donor - Donor information
 * @property {string} donor.id - Donor ID
 * @property {string} donor.name - Donor name
 * @property {string} donor.email - Donor email
 * @property {Object} donor.preferences - Donor preferences
 * @property {Object} payment - Payment information
 * @property {string} payment.method - Payment method
 * @property {string} payment.status - Payment status
 * @property {string} payment.transactionId - Transaction ID
 * @property {Object} receipt - Receipt information
 * @property {string} receipt.template - Receipt template
 * @property {boolean} receipt.isAnonymous - Anonymous receipt flag
 * @property {Object} analytics - Sadaqah analytics
 * @property {number} analytics.views - View count
 * @property {number} analytics.engagement - Engagement score
 * @property {Object} settings - Sadaqah settings
 * @property {boolean} settings.isPublic - Public visibility
 * @property {boolean} settings.allowDonations - Donations enabled
 * @property {boolean} settings.allowUpdates - Updates enabled
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const sadaqahSchema = {
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
  donor: {
    id: String,
    name: String,
    email: String,
    preferences: Object
  },
  payment: {
    method: String,
    status: String,
    transactionId: String
  },
  receipt: {
    template: String,
    isAnonymous: Boolean
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

// Sadaqah categories enum
export const SadaqahCategory = {
  GENERAL: 'general',
  FOOD: 'food',
  WATER: 'water',
  EDUCATION: 'education',
  HEALTHCARE: 'healthcare',
  SHELTER: 'shelter',
  ORPHAN: 'orphan',
  WIDOW: 'widow',
  STUDENT: 'student',
  SICK: 'sick',
  DEBTOR: 'debtor',
  OTHER: 'other'
};

// Sadaqah types enum
export const SadaqahType = {
  ONE_TIME: 'one_time',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
  ZAKAT: 'zakat',
  AQIQAH: 'aqiqah',
  SACRIFICE: 'sacrifice',
  PURIFICATION: 'purification',
  FRIDAY: 'friday',
  SADAKAT: 'sadakat'
};

// Sadaqah status enum
export const SadaqahStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived'
};

// Payment methods enum
export const PaymentMethod = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  PAYPAL: 'paypal',
  CRYPTO: 'crypto',
  OTHER: 'other'
};

// Payment status enum
export const PaymentStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
};

// Receipt template enum
export const ReceiptTemplate = {
  STANDARD: 'standard',
  DETAILED: 'detailed',
  SIMPLE: 'simple',
  CUSTOM: 'custom'
}; 