/**
 * @file server.js
 * @description
 * Starts the Express server for the Chips & Bytes backend API.
 * Listens on the specified port (default: 3001).
 */

const app = require('./app');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});