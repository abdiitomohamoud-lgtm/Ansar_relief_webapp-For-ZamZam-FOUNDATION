const logger = require('../../../logger');
const Volunteer = require('../models/Volunteer');

// Create a new volunteer
exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    logger.info(`Admin ${req.user.email} created volunteer ${volunteer._id} at ${new Date().toISOString()}`);
    res.status(201).send(volunteer);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update an existing volunteer
exports.updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!volunteer) {
      return res.status(404).send();
    }
    logger.info(`Admin ${req.user.email} updated volunteer ${req.params.id} at ${new Date().toISOString()}`);
    res.send(volunteer);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) {
      return res.status(404).send();
    }
    logger.info(`Admin ${req.user.email} deleted volunteer ${req.params.id} at ${new Date().toISOString()}`);
    res.send(volunteer);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.send(volunteers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single volunteer by ID
exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).send();
    }
    res.send(volunteer);
  } catch (error) {
    res.status(500).send(error);
  }
};