/**
 * Volunteer Schema
 * @typedef {Object} Volunteer
 * @property {string} _id - Unique identifier for the volunteer
 * @property {string} userId - Reference to the user
 * @property {Object} personal - Personal information
 * @property {string} personal.firstName - First name
 * @property {string} personal.lastName - Last name
 * @property {string} personal.email - Email address
 * @property {string} personal.phone - Phone number
 * @property {Date} personal.dateOfBirth - Date of birth
 * @property {string} personal.gender - Gender
 * @property {string} personal.nationality - Nationality
 * @property {Object} address - Address information
 * @property {string} address.street - Street address
 * @property {string} address.city - City
 * @property {string} address.state - State/Province
 * @property {string} address.country - Country
 * @property {string} address.postalCode - Postal/ZIP code
 * @property {Object} skills - Skills and qualifications
 * @property {string[]} skills.languages - Languages spoken
 * @property {string[]} skills.expertise - Areas of expertise
 * @property {string[]} skills.certifications - Professional certifications
 * @property {Object} availability - Availability information
 * @property {string[]} availability.days - Available days
 * @property {string[]} availability.times - Available times
 * @property {string} availability.timezone - Timezone
 * @property {Object} experience - Volunteer experience
 * @property {Object[]} experience.items - Experience items
 * @property {string} experience.items.organization - Organization name
 * @property {string} experience.items.role - Role/position
 * @property {Date} experience.items.startDate - Start date
 * @property {Date} experience.items.endDate - End date
 * @property {string} experience.items.description - Experience description
 * @property {Object} documents - Required documents
 * @property {Object} documents.resume - Resume document
 * @property {string} documents.resume.url - Resume URL
 * @property {string} documents.resume.type - Document type
 * @property {Object} documents.idDocument - ID document
 * @property {string} documents.idDocument.url - Document URL
 * @property {string} documents.idDocument.type - Document type
 * @property {Object} emergencyContact - Emergency contact
 * @property {string} emergencyContact.name - Contact name
 * @property {string} emergencyContact.relationship - Relationship
 * @property {string} emergencyContact.phone - Contact phone
 * @property {string} emergencyContact.email - Contact email
 * @property {Object} preferences - Volunteer preferences
 * @property {string[]} preferences.areas - Preferred areas
 * @property {string[]} preferences.activities - Preferred activities
 * @property {string} preferences.availability - Preferred availability
 * @property {Object} status - Application status
 * @property {string} status.current - Current status
 * @property {Date} status.lastUpdated - Last status update
 * @property {string} status.notes - Status notes
 * @property {Object} assignments - Volunteer assignments
 * @property {Object[]} assignments.items - Assignment items
 * @property {string} assignments.items.id - Assignment ID
 * @property {string} assignments.items.type - Assignment type
 * @property {Date} assignments.items.startDate - Start date
 * @property {Date} assignments.items.endDate - End date
 * @property {string} assignments.items.status - Assignment status
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const volunteerSchema = {
  _id: String,
  userId: String,
  personal: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    nationality: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  skills: {
    languages: [String],
    expertise: [String],
    certifications: [String]
  },
  availability: {
    days: [String],
    times: [String],
    timezone: String
  },
  experience: {
    items: [{
      organization: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String
    }]
  },
  documents: {
    resume: {
      url: String,
      type: String
    },
    idDocument: {
      url: String,
      type: String
    }
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  preferences: {
    areas: [String],
    activities: [String],
    availability: String
  },
  status: {
    current: String,
    lastUpdated: Date,
    notes: String
  },
  assignments: {
    items: [{
      id: String,
      type: String,
      startDate: Date,
      endDate: Date,
      status: String
    }]
  },
  createdAt: Date,
  updatedAt: Date
};

// Volunteer status enum
export const VolunteerStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

// Assignment types enum
export const AssignmentType = {
  FIELD_WORK: 'field_work',
  ADMINISTRATIVE: 'administrative',
  FUNDRAISING: 'fundraising',
  TEACHING: 'teaching',
  MEDICAL: 'medical',
  LOGISTICS: 'logistics',
  OTHER: 'other'
};

// Assignment status enum
export const AssignmentStatus = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Document types enum
export const VolunteerDocumentType = {
  RESUME: 'resume',
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  CERTIFICATION: 'certification',
  OTHER: 'other'
}; 