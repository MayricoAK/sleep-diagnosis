const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { calculateAgeFromBirthDate } = require('../utils/Utils');

exports.register = async (req, res) => {
  try {
    const { name, email, password, gender, birthDate } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Calculate age from birthDate
    const age = calculateAgeFromBirthDate(birthDate);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      birthDate: new Date(birthDate)
    });

    await newUser.save();

    // Create a token
    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).send({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

exports.logout = (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    blacklist.add(token); // Add token to blacklist
    res.status(200).send({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};