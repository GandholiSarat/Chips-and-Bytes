require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    mongoose.disconnect();
  });