const mongoose = require('mongoose');

const BlogPreviewSchema = new mongoose.Schema(
  {
    sourceUrl: { type: String, required: true, unique: true, index: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    author: { type: String, default: '' },
    date: { type: Date, default: null },
    image: { type: String, default: '' },
    refreshedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('BlogPreview', BlogPreviewSchema);
