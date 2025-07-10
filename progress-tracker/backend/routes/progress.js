const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const authMiddleware = require('../middleware/auth');

// Get progress
router.get('/', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.userId });
    if (!progress) {
      const newProgress = new Progress({ userId: req.user.userId });
      await newProgress.save();
      return res.json(newProgress);
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update counter
router.put('/counter/:key', authMiddleware, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const update = { [`counters.${key}`]: Math.max(0, value) };
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: update, $push: { history: { action: 'update_counter', key, value } } },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update checkbox
router.put('/checkbox/:key', authMiddleware, async (req, res) => {
  try {
    const { key } = req.params;
    const { checked } = req.body;
    const update = { [`checkboxes.${key}`]: checked };
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: update, $push: { history: { action: 'update_checkbox', key, value: checked } } },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add goal
router.post('/goal', authMiddleware, async (req, res) => {
  try {
    const { title, target, key, deadline } = req.body;
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { goals: { title, target, key, deadline } } },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete goal
router.delete('/goal/:index', authMiddleware, async (req, res) => {
  try {
    const { index } = req.params;
    const progress = await Progress.findOne({ userId: req.user.userId });
    if (!progress || !progress.goals[index]) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    progress.goals.splice(index, 1);
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.userId });
    res.json(progress ? progress.history : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;