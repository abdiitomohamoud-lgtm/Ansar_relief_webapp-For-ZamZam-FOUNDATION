// Delete current user's account
exports.deleteMyAccount = async (req, res) => {
  try {
    const user = await UserInfo.findByIdAndDelete(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Optionally: remove avatar file if exists
    if (user.avatar) {
      const path = require('path');
      const fs = require('fs');
      const avatarPath = path.join(__dirname, '../../public', user.avatar);
      if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Account deletion failed', error: err.message });
  }
};

const path = require('path');
const fs = require('fs');
const UserInfo = require(path.join(__dirname, '../../models/UserInfo'));
const mongoose = require('mongoose'); // Ensure this is imported

// Get current user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserInfo.findById(req.user._id).select('-password -passwordHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update current user's profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = (({ username, name, email, phone, city, region, country, gender, address, dob, bio }) => ({ username, name, email, phone, city, region, country, gender, address, dob, bio }))(req.body);
    const user = await UserInfo.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password -passwordHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    // Optionally: delete old avatar file if exists
    const user = await UserInfo.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.avatar) {
      const oldPath = path.join(__dirname, '../../public', user.avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();
    res.json({ avatar: user.avatar });
  } catch (err) {
    console.error('[uploadAvatar] Error:', err);
    res.status(500).json({ message: 'Avatar upload failed', error: err.message, stack: err.stack });
  }
};

// Delete avatar
exports.deleteAvatar = async (req, res) => {
  try {
    const user = await UserInfo.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.avatar) {
      const avatarPath = path.join(__dirname, '../../public', user.avatar);
      if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
      user.avatar = undefined;
      await user.save();
    }
    res.json({ message: 'Avatar deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Avatar delete failed', error: err.message });
  }
};

// Fetch a specific user's profile by ID with validation and authorization
exports.getUserProfileById = async (req, res) => {
  try {
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Fetch the user profile
    const user = await UserInfo.findById(req.params.id).select('-password -passwordHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Authorization: Ensure the logged-in user is authorized to view this profile
    if (req.user._id !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
