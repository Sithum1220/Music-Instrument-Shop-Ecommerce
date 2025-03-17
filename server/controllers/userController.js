const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const user = new User({ name, username, email, password, role });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ message: 'Invalid login credentials' });
    }

    const token = user.generateAuthToken();
    res.json({ user, token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

// module.exports = { signup, login };
const searchUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }); // Search for user by email

    if (user) {
      res.status(200).json({ exists: true, user });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error('Error searching user by email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login, searchUserByEmail };

