const express = require('express');
const router = express.Router();
const UserProfilePage = require('../models/userProfilePage');

// GET /api/user-payment-methods?email=...
router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const profile = await UserProfilePage.findOne({ 'profileInfo.email': email });
  res.json({ paymentMethods: profile ? profile.settings?.paymentMethods || [] : [] });
});

// POST /api/user-payment-methods/add
router.post('/add', async (req, res) => {
  const { email, paymentMethod } = req.body;
  if (!email || !paymentMethod) return res.status(400).json({ error: 'Email and paymentMethod required' });
  const profile = await UserProfilePage.findOneAndUpdate(
    { 'profileInfo.email': email },
    { $push: { 'settings.paymentMethods': paymentMethod } },
    { new: true }
  );
  res.json({ paymentMethods: profile ? profile.settings?.paymentMethods || [] : [] });
});

// POST /api/user-payment-methods/delete
router.post('/delete', async (req, res) => {
  const { email, last4 } = req.body;
  if (!email || !last4) return res.status(400).json({ error: 'Email and last4 required' });
  const profile = await UserProfilePage.findOneAndUpdate(
    { 'profileInfo.email': email },
    { $pull: { 'settings.paymentMethods': { last4 } } },
    { new: true }
  );
  res.json({ paymentMethods: profile ? profile.settings?.paymentMethods || [] : [] });
});

// POST /api/user-payment-methods/set-default
router.post('/set-default', async (req, res) => {
  const { email, last4 } = req.body;
  if (!email || !last4) return res.status(400).json({ error: 'Email and last4 required' });
  const profile = await UserProfilePage.findOne({ 'profileInfo.email': email });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  profile.settings.paymentMethods.forEach(pm => pm.default = (pm.last4 === last4));
  await profile.save();
  res.json({ paymentMethods: profile.settings.paymentMethods });
});

module.exports = router;
