const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

router.post('/api/settings', async (req, res) => {
  try {
    const { theme, language } = req.body;
    let setting = await Settings.findOne();

    if (setting) {
      setting.theme = theme || setting.theme;
      setting.language = language || setting.language;
      await setting.save();
    } else {
      setting = new Settings({ theme, language });
      await setting.save();
    }

    res.status(200).json({ success: true, message: 'Settings saved successfully', data: setting });
  } catch (err) {
    console.error('Error saving settings:', err);
    res.status(500).json({ success: false, message: 'Error saving settings', error: err.message });
  }
});

module.exports = router;