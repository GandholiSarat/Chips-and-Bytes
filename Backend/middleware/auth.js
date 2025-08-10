/**
 * @file auth.js
 * @description
 * Express middleware for authenticating JWT tokens.
 * Verifies the token and attaches the decoded user to the request object.
 * Returns 401 if no token is provided, 403 if token is invalid.
 */

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'codez_secret_key';

/**
 * Middleware to authenticate JWT token in the Authorization header.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;