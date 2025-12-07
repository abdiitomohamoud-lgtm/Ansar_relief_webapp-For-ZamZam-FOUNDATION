const LoginHistory = require('../models/LoginHistory');

exports.getLoginHistory = async (req, res) => {
  const { userId } = req.params;
  const history = await LoginHistory.find({ userId }).sort({ date: -1 });
  res.json(history);
};
