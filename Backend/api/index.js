/**
 * @file index.js
 * @description
 * Serverless handler entry point for the backend API.
 * Wraps the Express app using serverless-http for deployment on serverless platforms.
 */

const app = require('../app');
const serverless = require('serverless-http');

module.exports = serverless(app);