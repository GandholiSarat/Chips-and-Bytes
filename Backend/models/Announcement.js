/**
 * @file Announcement.js
 * @description
 * Mongoose model for storing announcements in the database.
 * Each announcement contains a text field.
 */

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true }          // Announcement text
}, { timestamps: true });                         // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Announcement', announcementSchema);