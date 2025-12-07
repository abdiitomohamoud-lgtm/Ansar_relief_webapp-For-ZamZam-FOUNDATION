const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserInfo = require('../models/UserInfo');

// In-memory store for demo (replace with DB in production)
// Remove in-memory store, use MongoDB

// POST /api/send-verification-code
router.post('/send-verification-code', async (req, res) => {
  // Accept all signup data
  const { name, email, password, location, gender } = req.body;
  if (!email || !name || !password) return res.status(400).json({ error: 'Required fields missing' });

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Hash password before storing
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);
  // Store code and signup data in DB
  await UserInfo.findOneAndUpdate(
    { email },
    {
      name,
      email,
      password: hashedPassword,
      location,
      gender,
      verificationCode: code,
      verificationCodeExpires: expires
    },
    { upsert: true }
  );

  // Send email using nodemailer (Gmail recommended settings)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your code is: ${code}`
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Nodemailer error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// POST /api/verify-code
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email and code required' });

  // Find user and check code
  const user = await UserInfo.findOne({ email });
  if (!user || !user.verificationCode || !user.verificationCodeExpires) {
    return res.status(400).json({ error: 'No code found for this email.' });
  }
  if (user.verificationCode !== code) {
    return res.status(400).json({ error: 'Invalid code.' });
  }
  if (user.verificationCodeExpires < new Date()) {
    return res.status(400).json({ error: 'Code expired.' });
  }
  // Mark user as verified and permanently remove verification fields
  await UserInfo.updateOne(
    { email },
    {
      $set: { verified: true },
      $unset: { verificationCode: "", verificationCodeExpires: "" }
    }
  );
  res.json({ success: true });
});

module.exports = router;
