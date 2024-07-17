const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  try {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const idToken = authorizationHeader.split('Bearer ')[1];
    const decoded = jwt.verify(idToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Unauthorized:', err.message);
    res.status(400).send({ message: 'Invalid token.' });
  }
};