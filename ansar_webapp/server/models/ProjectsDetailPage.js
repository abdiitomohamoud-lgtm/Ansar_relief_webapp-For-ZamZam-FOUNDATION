const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  completion: { type: Number, required: true }
}, { _id: false });

const UpdateSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const ProjectsDetailPageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  raisedAmount: { type: Number, required: true },
  beneficiaries: { type: Number, required: true },
  donors: { type: Number, required: true },
  volunteers: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  goals: [{ type: String, required: true }],
  impact: { type: String, required: true },
  timeline: [TimelineSchema],
  updates: [UpdateSchema],
  gallery: [{ type: String, required: true }],
  volunteers: { type: Number, required: false },
  relatedProjects: [{ type: String, required: true }]
});

module.exports = mongoose.model('ProjectsDetailPage', ProjectsDetailPageSchema);
