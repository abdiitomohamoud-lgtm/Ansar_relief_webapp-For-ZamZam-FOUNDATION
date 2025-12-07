// Example Sponsorship controller
exports.getSponsorships = (req, res) => {
  res.json({ message: 'Get all sponsorships (stub)' });
};

exports.getSponsorshipById = (req, res) => {
  res.json({ message: 'Get sponsorship by ID (stub)' });
};

exports.createSponsorship = (req, res) => {
  const Sponsorship = require('../../models/Sponsorship');
  Sponsorship.create(req.body)
    .then(sponsorship => res.status(201).json({ message: 'Sponsorship created', sponsorship }))
    .catch(error => res.status(500).json({ error: 'Failed to create sponsorship', details: error.message }));
};

exports.updateSponsorship = (req, res) => {
  const Sponsorship = require('../../models/Sponsorship');
  const { id } = req.params;
  Sponsorship.findByIdAndUpdate(id, req.body, { new: true })
    .then(sponsorship => {
      if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });
      res.json({ message: 'Sponsorship updated', sponsorship });
    })
    .catch(error => res.status(500).json({ error: 'Failed to update sponsorship', details: error.message }));
};

exports.deleteSponsorship = (req, res) => {
  const Sponsorship = require('../../models/Sponsorship');
  const { id } = req.params;
  Sponsorship.findByIdAndDelete(id)
    .then(sponsorship => {
      if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });
      res.json({ message: 'Sponsorship deleted' });
    })
    .catch(error => res.status(500).json({ error: 'Failed to delete sponsorship', details: error.message }));
};

exports.sponsor = (req, res) => {
  res.json({ message: 'Sponsor (stub)' });
};

exports.getSponsorshipsByType = (req, res) => {
  res.json({ message: 'Get sponsorships by type (stub)' });
};
