const validator = require('validator');
const logger = require('./logger');

const validateLoginInput = (data) => {
  const errors = {};
  const { email, password } = data;

  // Email validation
  if (!email || validator.isEmpty(email)) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  // Password validation
  if (!password || validator.isEmpty(password)) {
    errors.password = 'Password is required';
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = {
  validateLoginInput
};