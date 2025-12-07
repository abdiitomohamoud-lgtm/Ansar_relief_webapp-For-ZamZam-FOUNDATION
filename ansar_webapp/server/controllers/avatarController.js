const UserInfo = require('../models/UserInfo');
const path = require('path');
const fs = require('fs');

// POST /api/user/avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const email = req.body.email;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    // Save file path to user
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    await UserInfo.findOneAndUpdate(
      { email },
      { $set: { avatar: avatarPath } },
      { new: true }
    );
    res.json({ avatar: avatarPath });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload avatar', details: err.message });
  }
};
