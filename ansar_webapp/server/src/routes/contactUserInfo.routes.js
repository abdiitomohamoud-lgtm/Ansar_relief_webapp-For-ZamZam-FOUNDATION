const express = require('express');
const router = express.Router();
const ContactUserInfo = require('../models/contactUserInfo.model');

// POST /api/contact-user-info
router.post('/', async (req, res) => {
  try {
    const userInfo = new ContactUserInfo(req.body);
    await userInfo.save();
    res.status(201).json({ message: 'User info saved successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
