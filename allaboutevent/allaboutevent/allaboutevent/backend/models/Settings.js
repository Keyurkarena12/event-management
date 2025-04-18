const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  theme: { type: String, default: 'light' }, // e.g., 'light' or 'dark'
  language: { type: String, default: 'en' }, // e.g., 'en' or 'es'
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Setting', settingsSchema);