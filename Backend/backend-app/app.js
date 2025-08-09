require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;