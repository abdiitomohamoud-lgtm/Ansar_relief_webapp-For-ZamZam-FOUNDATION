// PUT /api/user-profile-page
exports.updateUserProfilePage = async (req, res) => {
  const { email, name, avatar, location, gender, phone } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const profile = await UserProfilePage.findOneAndUpdate(
    { 'profileInfo.email': email },
    { $set: {
        'profileInfo.name': name,
        'profileInfo.avatar': avatar,
        'profileInfo.location': location,
        'profileInfo.gender': gender,
        'profileInfo.phone': phone
      }
    },
    { new: true, upsert: true }
  );
  res.json(profile);
};
const UserProfilePage = require('../../models/userProfilePage');

// GET /api/user-profile-page
exports.getUserProfilePage = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    let profile = await UserProfilePage.findOne({ 'profileInfo.email': email });
    if (!profile) {
      // Fallback to userInfos
      const UserInfo = require('../../models/UserInfo');
      const userInfo = await UserInfo.findOne({ email });
      if (!userInfo) return res.status(404).json({ error: 'User not found in userInfos' });
      // Return userInfo in profileInfo format
      return res.json({
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
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile page data', details: error.message });
  }
};
