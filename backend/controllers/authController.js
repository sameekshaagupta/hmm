const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const { validateLoginInput } = require('../utils/validation');
const logger = require('../utils/logger');

const loginUser = async (req, res, next) => {
  try {
    // Validate input
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password, rememberMe } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(401).json({ 
        email: 'No account found with this email address' 
      });
    }

    // Validate password with bcrypt
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    
    if (!isMatch) {
      logger.warn(`Invalid password attempt for user: ${email}`);
      return res.status(401).json({ 
        password: 'Incorrect password' 
      });
    }

    const token = generateToken(user._id);

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      sameSite: 'strict'
    };

    user.passwordHash = undefined;

    // Send response with token
    res.cookie('jwt', token, cookieOptions);
    
    logger.info(`User logged in successfully: ${email}`);
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points
      }
    });

  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  loginUser
};