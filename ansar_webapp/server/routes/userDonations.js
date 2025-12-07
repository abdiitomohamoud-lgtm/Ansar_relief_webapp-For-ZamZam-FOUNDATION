const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // You need to create this model

// GET /api/user-donations?email=...
router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const donations = await Donation.find({ email });
  // Group by category if needed
  res.json({ donations });
});

// POST /api/donations/receipt
router.post('/receipt', async (req, res) => {
  const { donationId } = req.body;
  // Implement receipt generation logic
  res.json({ success: true, receiptUrl: `/receipts/${donationId}.pdf` });
});

// POST /api/donations/cancel
router.post('/cancel', async (req, res) => {
  const { donationId } = req.body;
  // Implement cancel logic
  res.json({ success: true });
});

module.exports = router;
