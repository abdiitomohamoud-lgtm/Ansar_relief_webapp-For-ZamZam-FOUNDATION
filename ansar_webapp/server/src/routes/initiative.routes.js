const express = require('express');
const router = express.Router();
const Initiative = require('../models/Initiative');

// GET /api/initiatives
router.get('/', async (req, res) => {
  try {
    const initiatives = await Initiative.find();
    res.json(initiatives);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
