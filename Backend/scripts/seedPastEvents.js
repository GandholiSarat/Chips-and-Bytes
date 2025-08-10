/**
 * @file seedPastEvents.js
 * @description
 * Script to seed the database with initial past events data.
 * Connects to MongoDB, clears existing PastEvent documents, and inserts sample events.
 * 
 * Usage:
 *   MONGODB_URI=<your_mongo_uri> node seedPastEvents.js
 */

const mongoose = require('mongoose');
const PastEvent = require('../models/PastEvent');

const events = [
  {
    date: "2025-07-26",
    title: "“The PC Builder Challenge” – System Fundamentals and PC Building Workshop",
    reportLink: "https://drive.google.com/file/d/14rrIuCom7amLkbolOILVtzG1hFJlhPW1/view?usp=drive_link",
    resourcesLink: "https://drive.google.com/drive/folders/1WQaSN3Oi6kHMR5ogUtprUuxLQ7t8Nl9g?usp=drive_link"
  },
  {
    date: "2025-08-02",
    title: "Visit to SAI HiPC",
    reportLink: "https://drive.google.com/file/d/1K4NeZU8Cbdr_WuKwkZFmZntq9E61Bco_/view?usp=drive_link",
    resourcesLink: "https://drive.google.com/drive/folders/10T8PJSt8KK2FokBF2OmTI2jjjrPXRCVA?usp=drive_link"
  }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await PastEvent.deleteMany({});
    await PastEvent.insertMany(events);
    console.log('Seeded past events!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });