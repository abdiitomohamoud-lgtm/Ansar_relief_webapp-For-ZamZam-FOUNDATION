const UserInfo = require('../models/UserInfo');
const bcrypt = require('bcryptjs');

exports.changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  const user = await UserInfo.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!user.password || !(await bcrypt.compare(oldPassword, user.password))) {
    return res.status(400).json({ error: 'Old password incorrect' });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ success: true });
};

exports.deleteAccount = async (req, res) => {
  const { userId } = req.body;
  await UserInfo.findByIdAndDelete(userId);
  res.json({ success: true });
};

exports.enable2FA = async (req, res) => {
  // For demo, just return success. Real 2FA would use OTP/email/phone.
  res.json({ success: true, message: '2FA enabled (demo)' });
};
