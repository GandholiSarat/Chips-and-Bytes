require('dotenv').config();  // Load env vars first!

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose'); // import

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();  // connect to MongoDB

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Chips and Bytes Backend</title>
        <style>
          body { font-family: sans-serif; background: #f5f5f5; text-align: center; margin-top: 10vh; }
          h1 { color: #2d7be5; }
          p { color: #444; }
        </style>
      </head>
      <body>
        <h1>Chips and Bytes Backend 🚀</h1>
        <p>Your backend is deployed and running on Vercel!</p>
        <p>Try <a href="/api/events">/api/events</a> to see events data.</p>
      </body>
    </html>
  `);
});

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
