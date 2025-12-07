// Auth Controller (Best Practices)

const UserInfo = require('../../models/UserInfo');
const jwt = require('jsonwebtoken');
const { handleGoogleLogin } = require('./googleAuthHelper');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { name, email, password, location, gender, mobile } = req.body;
  try {
    const existingUser = await UserInfo.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserInfo.create({
      name,
      email,
      password: hashedPassword,
      location,
      gender,
      mobile,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserInfo.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginWithGoogle = async (req, res) => {
  const { credential } = req.body;
  console.log('Google login request credential:', credential);
  try {
    const result = await handleGoogleLogin(credential);
    res.json(result);
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear session or token logic here
    res.clearCookie('token'); // Example for clearing cookies
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};

// Middleware stubs
exports.protect = (req, res, next) => {
  // Dummy protect middleware
  next();
};

exports.getMe = (req, res, next) => {
  // Dummy getMe middleware
  next();
};


exports.getUser = async (req, res) => {
  try {
    // req.user should be set by protect middleware
    const userId = req.user && req.user.id ? req.user.id : (req.user && req.user._id ? req.user._id : null);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const user = await UserInfo.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: { user } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile', details: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateFields = {};
    // Only allow certain fields to be updated
    const allowedFields = ['name', 'email', 'location', 'gender', 'mobile'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });
    const updatedUser = await require('../../models/UserInfo').findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User profile updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  // Implement logic to update user password here
  res.json({ message: 'Password updated (stub)' });
};

exports.forgotPassword = async (req, res) => {
  // Implement logic to handle forgot password here
  res.json({ message: 'Forgot password (stub)' });
};

exports.resetPassword = async (req, res) => {
  // Implement logic to reset password here
  res.json({ message: 'Password reset (stub)' });
};
