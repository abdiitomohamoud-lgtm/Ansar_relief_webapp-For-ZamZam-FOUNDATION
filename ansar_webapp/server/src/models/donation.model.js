const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: ['one-time', 'weekly', 'monthly', 'quarterly', 'yearly'],
      default: 'one-time',
    },
    note: {
      type: String,
    },
    donorName: {
      type: String,
    },
    donorEmail: {
      type: String,
    },
    donorPhone: {
      type: String,
    },
    donationType: {
      type: String,
      enum: ['campaign', 'project', 'sponsorship', 'sadaqah', 'general'],
      required: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'donationType',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    nextPaymentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation; 