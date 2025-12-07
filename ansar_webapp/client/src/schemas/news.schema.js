/**
 * News Schema
 * @typedef {Object} News
 * @property {string} _id - Unique identifier for the news item
 * @property {string} title - News title
 * @property {string} slug - URL-friendly title
 * @property {string} content - News content
 * @property {string} excerpt - Brief excerpt
 * @property {string} image - Featured image URL
 * @property {string[]} gallery - Additional image URLs
 * @property {string} video - Video URL
 * @property {string} category - News category
 * @property {string} type - News type
 * @property {string} status - Publication status
 * @property {Object} author - Author information
 * @property {string} author.id - Author ID
 * @property {string} author.name - Author name
 * @property {string} author.avatar - Author avatar
 * @property {Object} metadata - Additional metadata
 * @property {string[]} metadata.tags - Content tags
 * @property {string[]} metadata.keywords - SEO keywords
 * @property {string} metadata.description - SEO description
 * @property {Object} location - Location information
 * @property {string} location.country - Country
 * @property {string} location.region - Region
 * @property {string} location.city - City
 * @property {Object} campaign - Related campaign
 * @property {string} campaign.id - Campaign ID
 * @property {string} campaign.title - Campaign title
 * @property {Object} analytics - Content analytics
 * @property {number} analytics.views - View count
 * @property {number} analytics.shares - Share count
 * @property {number} analytics.comments - Comment count
 * @property {Object} social - Social sharing
 * @property {Object} social.facebook - Facebook metrics
 * @property {Object} social.twitter - Twitter metrics
 * @property {Object} social.linkedin - LinkedIn metrics
 * @property {Object} comments - Comments section
 * @property {Object[]} comments.items - Comment items
 * @property {string} comments.items.id - Comment ID
 * @property {string} comments.items.userId - User ID
 * @property {string} comments.items.content - Comment content
 * @property {Date} comments.items.createdAt - Comment date
 * @property {Object} settings - Content settings
 * @property {boolean} settings.isPublic - Public visibility
 * @property {boolean} settings.allowComments - Comments enabled
 * @property {boolean} settings.isFeatured - Featured content
 * @property {Date} publishedAt - Publication date
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

export const newsSchema = {
  _id: String,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  image: String,
  gallery: [String],
  video: String,
  category: String,
  type: String,
  status: String,
  author: {
    id: String,
    name: String,
    avatar: String
  },
  metadata: {
    tags: [String],
    keywords: [String],
    description: String
  },
  location: {
    country: String,
    region: String,
    city: String
  },
  campaign: {
    id: String,
    title: String
  },
  analytics: {
    views: Number,
    shares: Number,
    comments: Number
  },
  social: {
    facebook: Object,
    twitter: Object,
    linkedin: Object
  },
  comments: {
    items: [{
      id: String,
      userId: String,
      content: String,
      createdAt: Date
    }]
  },
  settings: {
    isPublic: Boolean,
    allowComments: Boolean,
    isFeatured: Boolean
  },
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
};

// News categories enum
export const NewsCategory = {
  EMERGENCY: 'emergency',
  CAMPAIGN: 'campaign',
  IMPACT: 'impact',
  STORY: 'story',
  UPDATE: 'update',
  ANNOUNCEMENT: 'announcement',
  OTHER: 'other'
};

// News types enum
export const NewsType = {
  ARTICLE: 'article',
  PRESS_RELEASE: 'press_release',
  BLOG_POST: 'blog_post',
  CASE_STUDY: 'case_study',
  REPORT: 'report',
  UPDATE: 'update'
};

// News status enum
export const NewsStatus = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted'
};

// Social platform enum
export const SocialPlatform = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube'
}; 