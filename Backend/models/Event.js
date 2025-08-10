/**
 * @file Event.js
 * @description
 * Mongoose model for storing event details in the database.
 * Each event includes title, speaker, date, time, location, and description.
 */

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Event title
  speaker: { type: String, required: true },      // Event speaker
  date: { type: Date, required: true },           // Event date
  time: { type: String, required: true },         // Event time
  location: { type: String, required: true },     // Event location
  description: { type: String, required: true }   // Event description
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;