const path = require('path');
const UserInfo = require(path.join(__dirname, '../../models/UserInfo'));

// Update the current user's profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateFields = { ...req.body };
    // Prevent updating _id, email, or password directly here for safety
    delete updateFields._id;
    delete updateFields.email;
    delete updateFields.password;
    const updated = await UserInfo.findByIdAndUpdate(userId, updateFields, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get the current user's profile
exports.getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
