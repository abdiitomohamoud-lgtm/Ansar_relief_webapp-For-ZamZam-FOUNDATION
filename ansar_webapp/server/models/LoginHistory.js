const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
  date: { type: Date, default: Date.now },
  ip: { type: String }
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
