// filepath: /backend-app/backend-app/api/index.js
const app = require('../app');
const serverless = require('serverless-http');

module.exports = serverless(app);