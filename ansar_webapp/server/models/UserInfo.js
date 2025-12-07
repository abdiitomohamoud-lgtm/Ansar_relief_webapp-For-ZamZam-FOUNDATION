
const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  region: {
    type: String,
    required: false,
    trim: true,
  },
  country: {
    type: String,
    required: false,
    trim: true,
  },
  // Support for all profile tabs
  emails: {
    type: [String],
    default: [],
  },
  events: {
    type: [mongoose.Schema.Types.Mixed], // Array of event form objects
    default: [],
  },
  contacts: {
    type: [mongoose.Schema.Types.Mixed], // Array of contact form objects
    default: [],
  },
  volunteers: {
    type: [mongoose.Schema.Types.Mixed], // Array of volunteer form objects
    default: [],
  },
  cart: {
    type: [mongoose.Schema.Types.Mixed], // Array of cart item objects
    default: [],
  },
  donations: {
    type: [mongoose.Schema.Types.Mixed], // Array of donation objects
    default: [],
  },
  wishlist: {
    type: [mongoose.Schema.Types.Mixed], // Array of wishlist item objects
    default: [],
  },
  passwordHistory: {
    type: [String], // Array of previous password hashes
    default: [],
  },
  comments: {
    type: [mongoose.Schema.Types.Mixed], // Array of comment objects
    default: [],
  },
  settings: {
    type: mongoose.Schema.Types.Mixed, // User settings/preferences
    default: {},
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'volunteer'],
    default: 'user',
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: false,
    default: undefined,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  dob: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verificationCode: {
    type: String,
    required: false,
  },
  verificationCodeExpires: {
    type: Date,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);