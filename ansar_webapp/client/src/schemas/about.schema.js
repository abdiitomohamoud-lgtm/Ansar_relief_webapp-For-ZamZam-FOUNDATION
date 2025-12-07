/**
 * About Page Schema
 * @typedef {Object} AboutPage
 * @property {string} _id - Unique identifier for the about page
 * @property {string} title - Page title
 * @property {string} slug - URL-friendly title
 * @property {string} description - Page description
 * @property {string} shortDescription - Brief description
 * @property {string} image - Hero image URL
 * @property {string[]} gallery - Additional image URLs
 * @property {string} video - Video URL
 * @property {Object} content - Page content sections
 * @property {Object[]} content.sections - Content sections
 * @property {string} content.sections.title - Section title
 * @property {string} content.sections.content - Section content
 * @property {string} content.sections.image - Section image
 * @property {string} content.sections.type - Section type
 * @property {Object} content.sections.layout - Section layout
 * @property {Object} mission - Mission information
 * @property {string} mission.statement - Mission statement
 * @property {string[]} mission.values - Core values
 * @property {Object} vision - Vision information
 * @property {string} vision.statement - Vision statement
 * @property {Object} history - History information
 * @property {string} history.content - History content
 * @property {Object[]} history.timeline - Timeline items
 * @property {string} history.timeline.year - Year
 * @property {string} history.timeline.event - Event description
 * @property {Object} team - Team information
 * @property {Object[]} team.members - Team members
 * @property {string} team.members.name - Member name
 * @property {string} team.members.role - Member role
 * @property {string} team.members.image - Member image
 * @property {string} team.members.bio - Member bio
 * @property {Object} partners - Partner information
 * @property {Object[]} partners.items - Partner items
 * @property {string} partners.items.name - Partner name
 * @property {string} partners.items.logo - Partner logo
 * @property {string} partners.items.url - Partner URL
 * @property {Object} impact - Impact information
 * @property {Object[]} impact.stats - Impact statistics
 * @property {string} impact.stats.label - Stat label
 * @property {number} impact.stats.value - Stat value
 * @property {Object} contact - Contact information
 * @property {string} contact.address - Contact address
 * @property {string} contact.phone - Contact phone
 * @property {string} contact.email - Contact email
 * @property {Object} social - Social media links
 * @property {string} social.facebook - Facebook URL
 * @property {string} social.twitter - Twitter URL
 * @property {string} social.instagram - Instagram URL
 * @property {string} social.linkedin - LinkedIn URL
 * @property {Object} settings - Page settings
 * @property {boolean} settings.isPublic - Public visibility
 * @property {boolean} settings.showTeam - Show team section
 * @property {boolean} settings.showPartners - Show partners section
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const aboutSchema = {
  _id: String,
  title: String,
  slug: String,
  description: String,
  shortDescription: String,
  image: String,
  gallery: [String],
  video: String,
  content: {
    sections: [{
      title: String,
      content: String,
      image: String,
      type: String,
      layout: Object
    }]
  },
  mission: {
    statement: String,
    values: [String]
  },
  vision: {
    statement: String
  },
  history: {
    content: String,
    timeline: [{
      year: String,
      event: String
    }]
  },
  team: {
    members: [{
      name: String,
      role: String,
      image: String,
      bio: String
    }]
  },
  partners: {
    items: [{
      name: String,
      logo: String,
      url: String
    }]
  },
  impact: {
    stats: [{
      label: String,
      value: Number
    }]
  },
  contact: {
    address: String,
    phone: String,
    email: String
  },
  social: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  settings: {
    isPublic: Boolean,
    showTeam: Boolean,
    showPartners: Boolean
  },
  createdAt: Date,
  updatedAt: Date
};

// Content section types enum
export const ContentSectionType = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  GALLERY: 'gallery',
  TIMELINE: 'timeline',
  TEAM: 'team',
  PARTNERS: 'partners',
  IMPACT: 'impact',
  CONTACT: 'contact'
};

// Section layout types enum
export const SectionLayoutType = {
  FULL_WIDTH: 'full_width',
  TWO_COLUMN: 'two_column',
  THREE_COLUMN: 'three_column',
  GRID: 'grid',
  CAROUSEL: 'carousel',
  ACCORDION: 'accordion'
};

// Team member roles enum
export const TeamRole = {
  EXECUTIVE: 'executive',
  DIRECTOR: 'director',
  MANAGER: 'manager',
  COORDINATOR: 'coordinator',
  SPECIALIST: 'specialist',
  VOLUNTEER: 'volunteer',
  OTHER: 'other'
};

// Partner types enum
export const PartnerType = {
  CORPORATE: 'corporate',
  NONPROFIT: 'nonprofit',
  GOVERNMENT: 'government',
  EDUCATIONAL: 'educational',
  MEDIA: 'media',
  OTHER: 'other'
}; 