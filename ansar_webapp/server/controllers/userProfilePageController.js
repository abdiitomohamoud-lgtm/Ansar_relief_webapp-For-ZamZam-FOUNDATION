const UserProfilePage = require('../models/userProfilePage');
const UserInfo = require('../models/UserInfo');

// GET /api/user-profile-page
exports.getUserProfilePage = async (req, res) => {
  try {
    const email = req.query.email;
    console.log('[GET user-profile-page] email:', email);
    if (!email) return res.status(400).json({ error: 'Email is required' });
    // Always fetch from UserInfo for account management
    const userInfo = await UserInfo.findOne({ email });
    if (!userInfo) {
      console.log('[GET user-profile-page] User not found in UserInfo');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('[GET user-profile-page] Returning UserInfo:', userInfo);
    return res.json({
      profileInfo: {
        avatar: userInfo.avatar || '',
        name: userInfo.name,
        email: userInfo.email,
        location: userInfo.location || '',
        joinDate: userInfo.createdAt ? userInfo.createdAt.toISOString().slice(0, 10) : '',
        badges: [],
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        dob: userInfo.dob || '',
        gender: userInfo.gender || '',
        bio: userInfo.bio || ''
      },
      stats: {},
      impactBadges: [],
      recentActivity: [],
      savedCampaigns: [],
      settings: {}
    });
  } catch (err) {
    console.error('[GET user-profile-page] Error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile', details: err.message });
  }
};

// PUT /api/user-profile-page
exports.updateUserProfilePage = async (req, res) => {
  try {
    const { email, name, location, gender, bio, avatar, phone, address, dob } = req.body;
    console.log('[PUT user-profile-page] Body:', req.body);
    if (!email) return res.status(400).json({ error: 'Email is required' });
    // Always update UserInfo for account management
    const userInfoResult = await UserInfo.findOneAndUpdate(
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
      },
      { new: true }
    );
    if (!userInfoResult) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Optionally, update UserProfilePage for analytics, etc.
    await UserProfilePage.findOneAndUpdate(
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
      { new: true, upsert: true }
    );
    console.log('[PUT user-profile-page] Updated UserInfo:', userInfoResult);
    res.json({
      avatar: userInfoResult.avatar || '',
      name: userInfoResult.name,
      email: userInfoResult.email,
      location: userInfoResult.location || '',
      joinDate: userInfoResult.createdAt ? userInfoResult.createdAt.toISOString().slice(0, 10) : '',
      badges: [],
      phone: userInfoResult.phone || '',
      address: userInfoResult.address || '',
      dob: userInfoResult.dob || '',
      gender: userInfoResult.gender || '',
      bio: userInfoResult.bio || ''
    });
  } catch (err) {
    console.error('[PUT user-profile-page] Error:', err);
    res.status(500).json({ error: 'Failed to update user profile', details: err.message });
  }
};
