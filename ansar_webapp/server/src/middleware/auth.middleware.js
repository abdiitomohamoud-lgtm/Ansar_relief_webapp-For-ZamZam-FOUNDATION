const jwt = require('jsonwebtoken');
const path = require('path');
const UserInfo = require(path.join(__dirname, '../../models/UserInfo'));

/**
 * Protect routes - Authentication middleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
exports.protect = async (req, res, next) => {
  try {
    let token;
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('[auth.middleware] Authorization header:', req.headers.authorization);
      console.log('[auth.middleware] Extracted token:', token);
    } else {
      console.warn('[auth.middleware] No Authorization header or not Bearer');
    }
    // Check if token exists
    if (!token) {
      console.warn('[auth.middleware] No token found in request');
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('[auth.middleware] Decoded JWT:', decoded);
    } catch (jwtErr) {
      console.error('[auth.middleware] JWT verification failed:', jwtErr);
      return res.status(401).json({ message: 'Not authorized, token invalid', error: jwtErr.message });
    }
    // Get user from token
    const user = await UserInfo.findById(decoded.id).select('-password');
    if (!user) {
      console.warn(`[auth.middleware] No user found for id: ${decoded.id}`);
      return res.status(401).json({ message: 'Not authorized, user not found', userId: decoded.id });
    }
    // Set user in request object
    req.user = user;
    next();
  } catch (error) {
    console.error('[auth.middleware] General error:', error);
    res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
  }
};

/**
 * Admin middleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};