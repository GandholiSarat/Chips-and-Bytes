require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const announcementRoutes = require('./routes/announcements');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);

module.exports = app;