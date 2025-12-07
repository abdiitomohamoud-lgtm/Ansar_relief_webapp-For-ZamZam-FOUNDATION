const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const VolunteerPageData = require('../models/VolunteerPageData');

// GET all volunteers
router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch volunteers.' });
  }
});

// GET volunteer page data
router.get('/volunteer-page', async (req, res) => {
  try {
    const pageData = await VolunteerPageData.findOne();
    res.json(pageData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch volunteer page data.' });
  }
});

// POST new volunteer
router.post('/volunteers', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit volunteer.' });
  }
});

module.exports = router;
