/**
 * User Schema
 * @typedef {Object} User
 * @property {string} _id - Unique identifier for the user
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} phone - User's phone number
 * @property {string} avatar - User's profile picture URL
 * @property {string} role - User's role (admin, partner, donor, volunteer)
 * @property {boolean} isEmailVerified - Email verification status
 * @property {boolean} isPhoneVerified - Phone verification status
 * @property {Object} address - User's address information
 * @property {string} address.street - Street address
 * @property {string} address.city - City
 * @property {string} address.state - State/Province
 * @property {string} address.country - Country
 * @property {string} address.postalCode - Postal/ZIP code
 * @property {Object} preferences - User preferences
 * @property {string} preferences.language - Preferred language
 * @property {string} preferences.currency - Preferred currency
 * @property {boolean} preferences.emailNotifications - Email notification preference
 * @property {boolean} preferences.smsNotifications - SMS notification preference
 * @property {Object} stats - User statistics
 * @property {number} stats.totalDonations - Total number of donations
 * @property {number} stats.totalAmount - Total amount donated
 * @property {number} stats.campaignsCreated - Number of campaigns created
 * @property {Date} lastLogin - Last login timestamp
 * @property {Date} createdAt - Account creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const userSchema = {
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  avatar: String,
  role: String,
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  preferences: {
    language: String,
    currency: String,
    emailNotifications: Boolean,
    smsNotifications: Boolean
  },
  stats: {
    totalDonations: Number,
    totalAmount: Number,
    campaignsCreated: Number
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
};

// User roles enum
export const UserRole = {
  ADMIN: 'admin',
  PARTNER: 'partner',
  DONOR: 'donor',
  VOLUNTEER: 'volunteer'
};

// User preferences
export const UserPreferences = {
  LANGUAGES: ['en', 'ar', 'fr', 'es'],
  CURRENCIES: ['USD', 'EUR', 'GBP', 'SAR'],
  NOTIFICATION_TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push'
  }
}; 