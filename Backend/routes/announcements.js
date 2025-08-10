/**
 * @file announcements.js
 * @description
 * Express router for managing announcements.
 * Supports CRUD operations for announcements, with admin authentication for write actions.
 * 
 * Routes:
 *   GET    /api/announcements        - Get all announcements (public)
 *   POST   /api/announcements        - Add new announcement (admin only)
 *   PUT    /api/announcements/:id    - Edit an announcement (admin only)
 *   DELETE /api/announcements/:id    - Delete an announcement (admin only)
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Announcement = require('../models/Announcement');

// Get all announcements (public)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new announcement (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const announcement = new Announcement({ text: req.body.text });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Edit announcement (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Announcement not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Delete announcement (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;