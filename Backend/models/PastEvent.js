/**
 * @file PastEvent.js
 * @description
 * Mongoose model for storing past event details in the database.
 * Each past event includes a date, title, report link, and resources link.
 */

const mongoose = require('mongoose');

const pastEventSchema = new mongoose.Schema({
  date: { type: String, required: true },         // Date of the event (as string)
  title: { type: String, required: true },        // Title of the event
  reportLink: { type: String },                   // Optional link to event report
  resourcesLink: { type: String }                 // Optional link to event resources
}, { timestamps: true });                         // Adds createdAt and updatedAt fields

module.exports = mongoose.model('PastEvent', pastEventSchema);