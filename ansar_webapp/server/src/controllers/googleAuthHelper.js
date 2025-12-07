const { OAuth2Client } = require('google-auth-library');
const UserInfo = require('../../models/UserInfo');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(credential) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (err) {
    console.error('Google token verification error:', err);
    throw err;
  }
}

async function handleGoogleLogin(credential) {
  const payload = await verifyGoogleToken(credential);
  let user = await UserInfo.findOne({ email: payload.email });
  if (!user) {
    const userData = {
      name: payload.name || payload.email,
      email: payload.email,
      password: undefined, // No password for Google users
      location: undefined,
      mobile: undefined,
    };
    // Only set gender if present and valid
    if (payload.gender && ['male', 'female'].includes(payload.gender)) {
      userData.gender = payload.gender;
    }
    user = await UserInfo.create(userData);
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user };
}

module.exports = { handleGoogleLogin };
