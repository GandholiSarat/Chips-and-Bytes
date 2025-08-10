/**
 * @file auth.js
 * @description
 * Express router for admin authentication.
 * Handles login and JWT token issuance.
 * 
 * Routes:
 *   POST /api/auth/login - Authenticate admin and return JWT token.
 * 
 * Notes:
 * - Uses a local users.json file for user storage.
 * - Default admin is created if users.json does not exist.
 * - Passwords are hashed using bcrypt.
 */

const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const path = require('path');

const USERS_FILE = path.join(__dirname, '../users.json');
const SECRET_KEY = 'codez_secret_key'; // change for production

// Check and create default admin
if (!fs.existsSync(USERS_FILE)) {
  const defaultAdmin = { username: 'admin', password: bcrypt.hashSync('admin123', 8) };
  fs.writeFileSync(USERS_FILE, JSON.stringify([defaultAdmin], null, 2));
}

/**
 * POST /api/auth/login
 * Authenticates admin user and returns JWT token.
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;