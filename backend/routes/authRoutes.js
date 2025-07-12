const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { loginUser } = require('../controllers/authController');

router.post('/signup', async (req, res) => {
  try {
    const { email, password, phoneNumber, city, state, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      email,
      phoneNumber,
      city,
      state,
      pincode,
      passwordHash: password, // password will be hashed in pre-save hook
      points: 100 // Give 100 bonus points
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: { email, points: newUser.points } });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', loginUser);

module.exports = router;
