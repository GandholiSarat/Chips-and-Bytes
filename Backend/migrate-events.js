require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import your Event model
const Event = require('./models/Event');

// Read events from JSON file
const eventsPath = path.join(__dirname, 'db', 'events.json');
const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    // Remove existing events if you want a clean import
    await Event.deleteMany({});
    // Insert events
    await Event.insertMany(eventsData);
    console.log('Events migrated successfully!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Migration failed:', err);
    mongoose.disconnect();
  });