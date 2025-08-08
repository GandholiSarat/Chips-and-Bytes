const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const auth = require('../middleware/auth');

const EVENTS_FILE = path.join(__dirname, '../db/events.json');

// Helper to read data
const readEvents = () => {
  return fs.existsSync(EVENTS_FILE)
    ? JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'))
    : [];
};

// Helper to write data
const writeEvents = (data) => {
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(data, null, 2));
};

// ✅ GET all events (Public)
router.get('/', (req, res) => {
  const data = readEvents();
  res.json(data);
});

// ✅ POST new event (Admin only)
router.post('/', auth, (req, res) => {
  const data = readEvents();

  const newEvent = {
    id: Date.now(), // numeric ID
    ...req.body
  };

  data.push(newEvent);
  writeEvents(data);
  res.status(201).json(newEvent);
});

// ✅ PUT update event by ID (Admin only)
router.put('/:id', auth, (req, res) => {
  let data = readEvents();
  const id = parseInt(req.params.id);

  let found = false;
  data = data.map(event => {
    if (event.id === id) {
      found = true;
      return { ...event, ...req.body };
    }
    return event;
  });

  if (!found) {
    return res.status(404).json({ message: 'Event not found' });
  }

  writeEvents(data);
  res.json({ message: 'Event updated successfully', updated: req.body });
});

// ✅ DELETE event by ID (Admin only)
router.delete('/:id', auth, (req, res) => {
  let data = readEvents();
  const id = parseInt(req.params.id);

  const newData = data.filter(event => event.id !== id);

  if (newData.length === data.length) {
    return res.status(404).json({ message: 'Event not found' });
  }

  writeEvents(newData);
  res.json({ message: 'Event deleted successfully' });
});

module.exports = router;
