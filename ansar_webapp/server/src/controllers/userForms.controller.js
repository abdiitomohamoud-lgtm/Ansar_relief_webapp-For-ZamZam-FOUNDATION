const eventRegistrationModel = require('../models/eventRegistration.model');
const contactUserInfoModel = require('../models/contactUserInfo.model');
const volunteerModel = require('../models/volunteer.model'); // You may need to create this if missing

// GET /api/user/forms?type=event|volunteer|contact
exports.getUserForms = async (req, res) => {
  const userId = req.user?._id || req.user?.id; // depends on your auth
  const { type } = req.query;
  try {
    let forms = [];
    if (type === 'event') {
      forms = await eventRegistrationModel.find({ user: userId });
    } else if (type === 'volunteer') {
      forms = await volunteerModel.find({ user: userId });
    } else if (type === 'contact') {
      forms = await contactUserInfoModel.find({ user: userId });
    } else {
      return res.status(400).json({ error: 'Invalid form type' });
    }
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
