/**
 * Partner Organization Schema
 * @typedef {Object} Partner
 * @property {string} _id - Unique identifier for the partner
 * @property {string} name - Organization name
 * @property {string} logo - Organization logo URL
 * @property {string} website - Organization website
 * @property {string} email - Organization email
 * @property {string} phone - Organization phone
 * @property {string} description - Organization description
 * @property {string} type - Organization type
 * @property {string} status - Partnership status
 * @property {Object} address - Organization address
 * @property {string} address.street - Street address
 * @property {string} address.city - City
 * @property {string} address.state - State/Province
 * @property {string} address.country - Country
 * @property {string} address.postalCode - Postal/ZIP code
 * @property {Object} contactPerson - Primary contact person
 * @property {string} contactPerson.name - Contact name
 * @property {string} contactPerson.position - Position/Title
 * @property {string} contactPerson.email - Contact email
 * @property {string} contactPerson.phone - Contact phone
 * @property {string[]} focusAreas - Areas of focus
 * @property {string[]} regions - Operating regions
 * @property {Object} partnership - Partnership details
 * @property {Date} partnership.startDate - Partnership start date
 * @property {Date} partnership.endDate - Partnership end date
 * @property {string} partnership.type - Partnership type
 * @property {Object} stats - Organization statistics
 * @property {number} stats.totalCampaigns - Total campaigns
 * @property {number} stats.totalDonations - Total donations
 * @property {number} stats.totalImpact - Total impact
 * @property {Object[]} documents - Partnership documents
 * @property {string} documents.type - Document type
 * @property {string} documents.url - Document URL
 * @property {Date} documents.expiryDate - Document expiry date
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const partnerSchema = {
  _id: String,
  name: String,
  logo: String,
  website: String,
  email: String,
  phone: String,
  description: String,
  type: String,
  status: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  contactPerson: {
    name: String,
    position: String,
    email: String,
    phone: String
  },
  focusAreas: [String],
  regions: [String],
  partnership: {
    startDate: Date,
    endDate: Date,
    type: String
  },
  stats: {
    totalCampaigns: Number,
    totalDonations: Number,
    totalImpact: Number
  },
  documents: [{
    type: String,
    url: String,
    expiryDate: Date
  }],
  createdAt: Date,
  updatedAt: Date
};

// Partner types enum
export const PartnerType = {
  NGO: 'ngo',
  CORPORATE: 'corporate',
  GOVERNMENT: 'government',
  EDUCATIONAL: 'educational',
  RELIGIOUS: 'religious',
  OTHER: 'other'
};

// Partnership status enum
export const PartnershipStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  TERMINATED: 'terminated',
  EXPIRED: 'expired'
};

// Partnership types enum
export const PartnershipType = {
  STRATEGIC: 'strategic',
  OPERATIONAL: 'operational',
  FUNDING: 'funding',
  TECHNICAL: 'technical',
  VOLUNTEER: 'volunteer'
};

// Document types enum
export const DocumentType = {
  MOU: 'mou',
  AGREEMENT: 'agreement',
  LICENSE: 'license',
  CERTIFICATE: 'certificate',
  INSURANCE: 'insurance',
  OTHER: 'other'
}; 