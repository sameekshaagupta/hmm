const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      success: false,
      error: 'Resource not found' 
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: messages
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, token failed'
    });
  }

  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };