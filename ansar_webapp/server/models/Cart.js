const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  title: String,
  subtitle: String,
  description: String,
  image: String,
  amount: Number,
  quantity: { type: Number, default: 1 },
  type: String,
  urgentNeedId: String,
  cardName: String,
  cardCategory: String,
  cardPage: String,
  cardAmount: Number,
  cardDescription: String,
  cardTitle: String,
  cardSubtitle: String,
  sourcePage: String
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', CartSchema);
