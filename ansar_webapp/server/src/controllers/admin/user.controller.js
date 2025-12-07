// Admin User Controller (Best Practices)

const logger = require('../../../logger');

exports.getAdminUsers = (req, res) => {
  res.json({ message: 'Get admin users (stub)' });
};

exports.createAdminUser = (req, res) => {
  res.json({ message: 'Create admin user (stub)' });
};

exports.updateAdminUser = (req, res) => {
  res.json({ message: 'Update admin user (stub)' });
};

exports.deleteAdminUser = (req, res) => {
  res.json({ message: 'Delete admin user (stub)' });
};

const UserInfo = require('../../../models/UserInfo');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await UserInfo.find().select('-password');
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserInfo.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ data: user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, location, gender, phone, address, dob } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    const exists = await UserInfo.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already exists' });
    const user = new UserInfo({ name, email, password, role, location, gender, phone, address, dob });
    await user.save();
    res.status(201).json({ data: user });
    // logger.info(`Admin ${req.user.email} created user ${user._id}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, location, gender, phone, address, dob } = req.body;
    const user = await UserInfo.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, role, location, gender, phone, address, dob } },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ data: user });
    // logger.info(`Admin ${req.user.email} updated user ${user._id}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user', details: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserInfo.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
    // logger.info(`Admin ${req.user.email} deleted user ${req.params.id}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err.message });
  }
};
