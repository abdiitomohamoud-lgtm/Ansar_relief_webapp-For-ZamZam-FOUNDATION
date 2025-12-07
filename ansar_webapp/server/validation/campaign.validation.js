const Joi = require('joi');

const createCampaignSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  status: Joi.string().valid('active', 'inactive', 'completed').required(),
});

const updateCampaignSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  description: Joi.string().min(10),
  status: Joi.string().valid('active', 'inactive', 'completed'),
});

module.exports = {
  createCampaignSchema,
  updateCampaignSchema,
};
