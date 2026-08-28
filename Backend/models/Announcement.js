/**
 * @file Announcement.js
 * @description
 * Mongoose model for storing announcements in the database.
 * Each announcement contains a text field.
 */

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  // `text` is retained for announcements created before the structured editor.
  text: { type: String, trim: true },
  title: { type: String, trim: true, maxlength: 120 },
  message: { type: String, trim: true, maxlength: 600 },
  actionLabel: { type: String, trim: true, maxlength: 48 },
  actionUrl: { type: String, trim: true, maxlength: 2048 },
  category: {
    type: String,
    enum: ['notice', 'event', 'opportunity', 'update'],
    default: 'notice'
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

announcementSchema.pre('validate', function validateAnnouncement(next) {
  if (!this.message && this.text) this.message = this.text;
  if (!this.text && this.message) this.text = this.message;
  if (!this.message && !this.text) {
    this.invalidate('message', 'An announcement message is required.');
  }
  next();
});

module.exports = mongoose.model('Announcement', announcementSchema);
