const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PastEvent = require('../models/PastEvent');

// Get all past events (public)
router.get('/', async (req, res) => {
  try {
    const events = await PastEvent.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new past event (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { date, title, reportLink, resourcesLink } = req.body;
    const event = new PastEvent({ date, title, reportLink, resourcesLink });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Edit past event (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { date, title, reportLink, resourcesLink } = req.body;
    const updated = await PastEvent.findByIdAndUpdate(
      req.params.id,
      { date, title, reportLink, resourcesLink },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Delete past event (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await PastEvent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;