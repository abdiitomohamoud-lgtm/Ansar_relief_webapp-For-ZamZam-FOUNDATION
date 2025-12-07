/**
 * Dashboard Schema
 * @typedef {Object} Dashboard
 * @property {string} _id - Unique identifier for the dashboard
 * @property {string} userId - Reference to the user
 * @property {Object} overview - Dashboard overview
 * @property {number} overview.totalDonations - Total donations made
 * @property {number} overview.totalAmount - Total amount donated
 * @property {number} overview.activeSponsorships - Active sponsorships
 * @property {number} overview.volunteerHours - Total volunteer hours
 * @property {Object} recentActivity - Recent user activity
 * @property {Object[]} recentActivity.items - Activity items
 * @property {string} recentActivity.items.type - Activity type
 * @property {string} recentActivity.items.id - Activity ID
 * @property {Date} recentActivity.items.date - Activity date
 * @property {string} recentActivity.items.title - Activity title
 * @property {string} recentActivity.items.description - Activity description
 * @property {Object} campaigns - Campaign information
 * @property {Object[]} campaigns.active - Active campaigns
 * @property {string} campaigns.active.id - Campaign ID
 * @property {string} campaigns.active.title - Campaign title
 * @property {number} campaigns.active.progress - Campaign progress
 * @property {Date} campaigns.active.endDate - Campaign end date
 * @property {Object[]} campaigns.completed - Completed campaigns
 * @property {string} campaigns.completed.id - Campaign ID
 * @property {string} campaigns.completed.title - Campaign title
 * @property {number} campaigns.completed.impact - Campaign impact
 * @property {Date} campaigns.completed.completionDate - Completion date
 * @property {Object} notifications - User notifications
 * @property {Object[]} notifications.items - Notification items
 * @property {string} notifications.items.type - Notification type
 * @property {string} notifications.items.title - Notification title
 * @property {string} notifications.items.message - Notification message
 * @property {Date} notifications.items.date - Notification date
 * @property {boolean} notifications.items.read - Read status
 * @property {Object} preferences - Dashboard preferences
 * @property {string[]} preferences.widgets - Enabled widgets
 * @property {Object} preferences.layout - Layout preferences
 * @property {Date} lastUpdated - Last update timestamp
 * @property {Date} createdAt - Creation timestamp
 */

export const dashboardSchema = {
  _id: String,
  userId: String,
  overview: {
    totalDonations: Number,
    totalAmount: Number,
    activeSponsorships: Number,
    volunteerHours: Number
  },
  recentActivity: {
    items: [{
      type: String,
      id: String,
      date: Date,
      title: String,
      description: String
    }]
  },
  campaigns: {
    active: [{
      id: String,
      title: String,
      progress: Number,
      endDate: Date
    }],
    completed: [{
      id: String,
      title: String,
      impact: Number,
      completionDate: Date
    }]
  },
  notifications: {
    items: [{
      type: String,
      title: String,
      message: String,
      date: Date,
      read: Boolean
    }]
  },
  preferences: {
    widgets: [String],
    layout: Object
  },
  lastUpdated: Date,
  createdAt: Date
};

// Dashboard activity types enum
export const DashboardActivityType = {
  DONATION: 'donation',
  SPONSORSHIP: 'sponsorship',
  VOLUNTEER: 'volunteer',
  CAMPAIGN: 'campaign',
  UPDATE: 'update',
  NOTIFICATION: 'notification'
};

// Dashboard widget types enum
export const DashboardWidgetType = {
  OVERVIEW: 'overview',
  RECENT_ACTIVITY: 'recent_activity',
  ACTIVE_CAMPAIGNS: 'active_campaigns',
  COMPLETED_CAMPAIGNS: 'completed_campaigns',
  NOTIFICATIONS: 'notifications',
  IMPACT_METRICS: 'impact_metrics'
};

// Notification types enum
export const DashboardNotificationType = {
  DONATION_RECEIPT: 'donation_receipt',
  SPONSORSHIP_UPDATE: 'sponsorship_update',
  CAMPAIGN_UPDATE: 'campaign_update',
  VOLUNTEER_OPPORTUNITY: 'volunteer_opportunity',
  SYSTEM: 'system'
}; 