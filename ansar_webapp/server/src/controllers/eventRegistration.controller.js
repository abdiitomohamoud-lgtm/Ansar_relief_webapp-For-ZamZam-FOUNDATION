const EventRegistration = require('../models/eventRegistration.model');

// POST /api/event-registration
exports.createRegistration = async (req, res) => {
  try {
    const registration = new EventRegistration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ message: 'Failed to save registration', error: error.message });
  }
};
