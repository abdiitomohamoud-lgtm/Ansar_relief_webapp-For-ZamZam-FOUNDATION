const Event = require('../models/event.model');

// Event controller
exports.getEvents = async (req, res) => {
  try {
    // Fetch all documents (events and page content)
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

exports.getEventById = (req, res) => {
  res.json({ message: 'Get event by id (stub)' });
};

exports.createEvent = (req, res) => {
  res.json({ message: 'Create event (stub)' });
};

exports.updateEvent = (req, res) => {
  res.json({ message: 'Update event (stub)' });
};

exports.deleteEvent = (req, res) => {
  res.json({ message: 'Delete event (stub)' });
};
