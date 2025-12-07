const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
  try {
    // Log the Authorization header for debugging
    console.log('Authorization header:', req.headers.authorization);

    // 1) Get token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    console.log('Extracted token:', token);

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.'
      });
    }

    // 2) Check for JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables!');
      return res.status(500).json({
        status: 'error',
        message: 'Server misconfiguration: JWT secret missing.'
      });
    }

    // 3) Verify token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token or authorization failed'
      });
    }

    // 4) Check if user still exists
    const mongoose = require('mongoose');
    const UserInfo = require('../../models/UserInfo');
    let currentUser = null;
    try {
      currentUser = await UserInfo.findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
    } catch (err) {
      console.error('User lookup failed:', err.message);
    }
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    console.error('Protect middleware error:', error.message);
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token or authorization failed'
    });
  }
};

exports.admin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'fail',
      message: 'You do not have permission to perform this action'
    });
  }
  next();
};