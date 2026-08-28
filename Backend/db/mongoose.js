/**
 * @file mongoose.js
 * @description
 * Utility for connecting to MongoDB using Mongoose.
 * Reads the MongoDB URI from environment variables.
 * Reuses the active connection and lets the HTTP layer return a useful error
 * when a temporary connection failure occurs.
 */

const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI in process.env.MONGODB_URI.
 */
let connectionPromise;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .then((connection) => {
        console.log('MongoDB connected');
        return connection;
      })
      .catch((error) => {
        connectionPromise = null;
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;
