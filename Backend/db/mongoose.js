/**
 * @file mongoose.js
 * @description
 * Utility for connecting to MongoDB using Mongoose.
 * Reads the MongoDB URI from environment variables.
 * Logs connection status and exits process on failure.
 */

const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI in process.env.MONGODB_URI.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;