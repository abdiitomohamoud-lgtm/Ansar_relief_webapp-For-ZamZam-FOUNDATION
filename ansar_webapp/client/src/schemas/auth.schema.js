/**
 * Authentication Schema
 * @typedef {Object} Auth
 * @property {string} _id - Unique identifier for the auth record
 * @property {string} userId - Reference to the user
 * @property {string} email - User email
 * @property {string} password - Hashed password
 * @property {string} role - User role
 * @property {boolean} isEmailVerified - Email verification status
 * @property {boolean} isPhoneVerified - Phone verification status
 * @property {boolean} isTwoFactorEnabled - 2FA status
 * @property {Object} twoFactor - 2FA settings
 * @property {string} twoFactor.method - 2FA method (sms/email/authenticator)
 * @property {string} twoFactor.secret - 2FA secret
 * @property {Object} socialAuth - Social authentication
 * @property {string} socialAuth.provider - Provider name
 * @property {string} socialAuth.providerId - Provider user ID
 * @property {Object} sessions - Active sessions
 * @property {Object[]} sessions.items - Session items
 * @property {string} sessions.items.token - Session token
 * @property {Date} sessions.items.expiresAt - Expiration date
 * @property {string} sessions.items.device - Device info
 * @property {string} sessions.items.ip - IP address
 * @property {Object} security - Security settings
 * @property {Date} security.lastPasswordChange - Last password change
 * @property {number} security.failedLoginAttempts - Failed login count
 * @property {Date} security.lockedUntil - Account lock expiry
 * @property {Object} recovery - Account recovery
 * @property {string} recovery.resetToken - Password reset token
 * @property {Date} recovery.resetExpires - Reset token expiry
 * @property {Date} lastLogin - Last login timestamp
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const authSchema = {
  _id: String,
  userId: String,
  email: String,
  password: String,
  role: String,
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  isTwoFactorEnabled: Boolean,
  twoFactor: {
    method: String,
    secret: String
  },
  socialAuth: {
    provider: String,
    providerId: String
  },
  sessions: {
    items: [{
      token: String,
      expiresAt: Date,
      device: String,
      ip: String
    }]
  },
  security: {
    lastPasswordChange: Date,
    failedLoginAttempts: Number,
    lockedUntil: Date
  },
  recovery: {
    resetToken: String,
    resetExpires: Date
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
};

// User roles enum
export const UserRole = {
  ADMIN: 'admin',
  DONOR: 'donor',
  VOLUNTEER: 'volunteer',
  BENEFICIARY: 'beneficiary',
  PARTNER: 'partner',
  STAFF: 'staff'
};

// 2FA methods enum
export const TwoFactorMethod = {
  SMS: 'sms',
  EMAIL: 'email',
  AUTHENTICATOR: 'authenticator'
};

// Social auth providers enum
export const SocialProvider = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin'
};

// Auth status enum
export const AuthStatus = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  LOCKED: 'locked',
  PENDING: 'pending',
  DELETED: 'deleted'
}; 