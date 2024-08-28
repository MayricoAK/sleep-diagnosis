const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  try {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'No token provided.' });
    }

    const idToken = authorizationHeader.split('Bearer ')[1];
    
    let decoded;
    try {
      decoded = jwt.verify(idToken, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token has expired.' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Invalid token.' });
      } else {
        return res.status(401).send({ message: 'Token verification failed.' });
      }
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authorization error:', err.message);
    res.status(500).send({ message: 'Internal server error.' });
  }
};