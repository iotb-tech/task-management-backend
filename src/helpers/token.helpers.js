const jwt = require('jsonwebtoken');
const User = require('../models/User')

const generateAccessToken = async (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, full_name: user.full_name },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );
  return token;
};

const verifyAccessToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = user;
    next();
  });
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  // await User.findByIdAndUpdate(user._id, { refresh_token: token });

  return token;
};


const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return reject(new Error('Invalid refresh token'));
      }
      resolve(user);
    });
  });
};
module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
