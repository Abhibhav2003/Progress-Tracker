const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Get progress
router.get('/', async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: 'default_user' });
    if (!progress) {
      const newProgress = new Progress({ userId: 'default_user' });
      await newProgress.save();
      return res.json(newProgress);
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update counter
router.put('/counter/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const update = { [`counters.${key}`]: Math.max(0, value) };
    const progress = await Progress.findOneAndUpdate(
      { userId: 'default_user' },
      { $set: update },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update checkbox
router.put('/checkbox/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { checked } = req.body;
    const update = { [`checkboxes.${key}`]: checked };
    const progress = await Progress.findOneAndUpdate(
      { userId: 'default_user' },
      { $set: update },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;