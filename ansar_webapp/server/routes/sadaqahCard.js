const express = require('express');
const router = express.Router();
const SadaqahCard = require('../models/SadaqahCard');

// GET /api/sadaqah/card/:id
router.get('/card/:id', async (req, res) => {
  try {
    const card = await SadaqahCard.findOne({ id: req.params.id });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
