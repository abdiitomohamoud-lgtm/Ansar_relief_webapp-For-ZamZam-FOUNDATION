// Donation Controller (Best Practices)

exports.createDonation = (req, res) => {
  const Donation = require('../../models/Donation');
  const donationData = req.body;
  Donation.create(donationData)
    .then(donation => res.status(201).json({ message: 'Donation created', donation }))
    .catch(error => res.status(500).json({ error: 'Failed to create donation', details: error.message }));
};

exports.updateDonationStatus = (req, res) => {
  const Donation = require('../../models/Donation');
  const { id } = req.params;
  const { status } = req.body;
  Donation.findByIdAndUpdate(id, { status }, { new: true })
    .then(donation => {
      if (!donation) return res.status(404).json({ error: 'Donation not found' });
      res.json({ message: 'Donation status updated', donation });
    })
    .catch(error => res.status(500).json({ error: 'Failed to update donation status', details: error.message }));
};

exports.getUserDonations = (req, res) => {
  const Donation = require('../../models/Donation');
  const userId = req.user._id;
  Donation.find({ user: userId })
    .then(donations => res.json({ donations }))
    .catch(error => res.status(500).json({ error: 'Failed to fetch user donations', details: error.message }));
};

exports.getDonationById = (req, res) => {
  const Donation = require('../../models/Donation');
  const { id } = req.params;
  Donation.findById(id)
    .then(donation => {
      if (!donation) return res.status(404).json({ error: 'Donation not found' });
      res.json({ donation });
    })
    .catch(error => res.status(500).json({ error: 'Failed to fetch donation', details: error.message }));
};

exports.getRecentDonations = (req, res) => {
  res.json({ message: 'Get recent donations (stub)' });
};

exports.getDonationStats = (req, res) => {
  res.json({ message: 'Get donation stats (stub)' });
};

exports.processQuickDonation = (req, res) => {
  const Donation = require('../../models/Donation');
  const donationData = req.body;
  Donation.create(donationData)
    .then(donation => res.status(201).json({ message: 'Quick donation processed', donation }))
    .catch(error => res.status(500).json({ error: 'Failed to process quick donation', details: error.message }));
};

exports.getDonations = (req, res) => {
  const Donation = require('../../models/Donation');
  Donation.find({})
    .then(donations => res.json({ donations }))
    .catch(error => res.status(500).json({ error: 'Failed to fetch donations', details: error.message }));
};
