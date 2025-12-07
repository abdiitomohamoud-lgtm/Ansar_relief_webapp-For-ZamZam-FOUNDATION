const mongoose = require('mongoose');

/**
 * Event model
 */
const EventSchema = new mongoose.Schema({
  // Discriminator for event or page content
  type: { type: String, enum: ['event', 'pageContent'], default: 'event' },
  // Event fields (all optional for pageContent)
  title: { type: String },
  slug: { type: String },
  description: { type: String },
  shortDescription: { type: String, maxlength: 500 },
  image: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  location: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  isVirtual: { type: Boolean },
  virtualLink: { type: String },
  isActive: { type: Boolean },
  isFeatured: { type: Boolean },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer' },
  organizer: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  registrationRequired: { type: Boolean },
  registrationUrl: { type: String },
  maxAttendees: { type: Number },
  currentAttendees: { type: Number },
  metaTitle: { type: String },
  metaDescription: { type: String },
  // Legacy/mock fields
  id: { type: Number },
  date: { type: String },
  time: { type: String },
  category: { type: String },
  registered: { type: Number },
  featured: { type: Boolean },
  capacity: { type: Number },
  // Page-level content fields (for type: 'pageContent')
  hero: { type: Object },
  filter: { type: Object },
  featuredSection: { type: Object },
  allEvents: { type: Object },
  newsletter: { type: Object },
  gallery: { type: Object }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);