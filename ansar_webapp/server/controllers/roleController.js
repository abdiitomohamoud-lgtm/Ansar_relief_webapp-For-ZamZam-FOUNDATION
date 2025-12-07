const UserInfo = require('../models/UserInfo');

exports.getRole = async (req, res) => {
  const { userId } = req.params;
  const user = await UserInfo.findById(userId);
  res.json(user?.role || 'user');
};

exports.updateRole = async (req, res) => {
  const { userId, role } = req.body;
  const user = await UserInfo.findByIdAndUpdate(userId, { role }, { new: true });
  res.json(user?.role || 'user');
};
