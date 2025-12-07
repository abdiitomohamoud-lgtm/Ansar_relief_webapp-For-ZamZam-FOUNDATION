/**
 * Donation Schema
 * @typedef {Object} Donation
 * @property {string} _id - Unique identifier for the donation
 * @property {string} campaignId - Reference to the campaign
 * @property {string} userId - Reference to the donor
 * @property {number} amount - Donation amount
 * @property {string} currency - Currency code (USD, EUR, GBP)
 * @property {string} paymentMethod - Payment method used
 * @property {string} paymentStatus - Payment status
 * @property {string} transactionId - Payment provider transaction ID
 * @property {boolean} anonymous - Whether the donation is anonymous
 * @property {string} message - Optional message from donor
 * @property {Object} donorInfo - Donor information (if anonymous)
 * @property {string} donorInfo.name - Donor's name
 * @property {string} donorInfo.email - Donor's email
 * @property {Object} receipt - Receipt information
 * @property {string} receipt.number - Receipt number
 * @property {Date} receipt.date - Receipt date
 * @property {string} receipt.url - Receipt PDF URL
 * @property {Object} metadata - Additional metadata
 * @property {string} metadata.source - Donation source (web, mobile, etc.)
 * @property {string} metadata.referrer - Referrer information
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const donationSchema = {
  _id: String,
  campaignId: String,
  userId: String,
  amount: Number,
  currency: String,
  paymentMethod: String,
  paymentStatus: String,
  transactionId: String,
  anonymous: Boolean,
  message: String,
  donorInfo: {
    name: String,
    email: String
  },
  receipt: {
    number: String,
    date: Date,
    url: String
  },
  metadata: {
    source: String,
    referrer: String
  },
  createdAt: Date,
  updatedAt: Date
};

// Payment methods enum
export const PaymentMethod = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
  CRYPTO: 'crypto'
};

// Payment status enum
export const PaymentStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
};

// Donation source enum
export const DonationSource = {
  WEB: 'web',
  MOBILE: 'mobile',
  API: 'api',
  PARTNER: 'partner'
};

// Receipt template options
export const ReceiptTemplate = {
  STANDARD: 'standard',
  DETAILED: 'detailed',
  CORPORATE: 'corporate'
}; 