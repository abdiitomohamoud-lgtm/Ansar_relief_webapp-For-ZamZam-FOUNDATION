const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId: { type: String }, // Added to support frontend unique key
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  description: String,
  date: String,
  quantity: { type: Number, default: 1 },
  price: Number
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
