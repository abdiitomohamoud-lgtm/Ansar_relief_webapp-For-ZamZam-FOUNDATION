const express = require('express');
const router = express.Router();
const UserProfilePage = require('../models/userProfilePage');

// Middleware to require authentication and get user id from token
const requireAuth = (req, res, next) => {
  // Example: decode JWT and set req.userId
  // You should replace this with your actual auth logic
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  // TODO: decode token and set req.userId
  // For now, simulate userId
  req.userId = 'demo-user-id';
  next();
};

// GET /api/user-profile-page
router.get('/', requireAuth, async (req, res) => {
  try {
    // Find user profile by email
    const email = req.query.email;
    console.log('UserProfilePage request for email:', email);
    let profile = await UserProfilePage.findOne({ 'profileInfo.email': email });
    if (!profile) {
      // If not found, return user info from userInfos
      const UserInfo = require('../models/UserInfo');
      const userInfo = await UserInfo.findOne({ email });
      console.log('UserInfo found:', userInfo);
      if (!userInfo) return res.status(404).json({ error: 'User not found in userInfos' });
      // Return userInfo in profileInfo format
      const result = {
        profileInfo: {
          avatar: userInfo.avatar || '',
          name: userInfo.name,
          email: userInfo.email,
          location: userInfo.location || '',
          joinDate: userInfo.createdAt ? userInfo.createdAt.toISOString().slice(0, 10) : '',
          badges: []
        },
        stats: {},
        impactBadges: [],
        recentActivity: [],
        savedCampaigns: [],
        settings: {}
      };
      console.log('Returning userInfo as profile:', result);
      return res.json(result);
    }
    console.log('Returning userProfilePage profile:', profile);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT /api/user-profile-page
router.put('/', requireAuth, async (req, res) => {
  try {
    const { email, name, location, gender, bio, avatar, phone, address, dob } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    // Update UserProfilePage
    let profile = await UserProfilePage.findOneAndUpdate(
      { 'profileInfo.email': email },
      {
        $set: {
          'profileInfo.name': name,
          'profileInfo.location': location,
          'profileInfo.gender': gender,
          'profileInfo.avatar': avatar,
          'profileInfo.bio': bio,
          'profileInfo.phone': phone,
          'profileInfo.address': address,
          'profileInfo.dob': dob
        }
      },
      { new: true }
    );
    // Also update UserInfo for core fields
    const UserInfo = require('../models/UserInfo');
    await UserInfo.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          location,
          gender,
          avatar,
          bio,
          phone,
          address,
          dob
        }
      }
    );
    // If no profile, create one
    if (!profile) {
      profile = await UserProfilePage.create({
        profileInfo: {
          name,
          email,
          location,
          gender,
          avatar,
          bio,
          phone,
          address,
          dob
        }
      });
    }
    res.json(profile.profileInfo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

module.exports = router;
