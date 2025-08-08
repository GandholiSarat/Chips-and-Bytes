// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Root route so visiting "/" works
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

module.exports = app; // Export app for both local and serverless use
