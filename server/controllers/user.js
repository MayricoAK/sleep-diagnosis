const User = require('../models/User');
const bcrypt = require('bcrypt');

// Mendapatkan detail pengguna
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

// Memperbarui detail pengguna
exports.updateUserDetails = async (req, res) => {
  try {
    const user = req.user;
    const { name, gender, age, birthDate } = req.body;

    // Validasi input
    if (!name || !gender || !age || !birthDate) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    user.name = name;
    user.gender = gender;
    user.age = age;
    user.birthDate = new Date(birthDate);

    await user.save();

    res.status(200).send({ message: 'User details updated successfully', user });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};

// Memperbarui kata sandi pengguna
exports.updatePassword = async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    // Validasi input
    if (!currentPassword || !newPassword) {
      return res.status(400).send({ message: 'Current password and new password are required' });
    }

    // Periksa apakah kata sandi saat ini benar
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Current password is incorrect' });
    }

    // Hash kata sandi baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).send({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error', error: err.message });
  }
};
