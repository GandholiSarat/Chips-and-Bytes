const mongoose = require('mongoose');

const pastEventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  reportLink: { type: String },
  resourcesLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PastEvent', pastEventSchema);