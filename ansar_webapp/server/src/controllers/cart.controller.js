const Cart = require('../models/cart.model');

// GET /api/cart - Get current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart - Add item to cart
exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    // Support both { item } and direct item in body for compatibility
    let newItem = req.body.item || req.body;
    // Ensure itemId is set for merging
    if (!newItem.itemId) {
      // Fallback: generate itemId from title and timestamp/random (mimic frontend)
      const base = newItem.title || newItem.cardName || 'item';
      newItem.itemId = `${base}-${Date.now()}-${Math.random()}`;
    }

    // Validate quantity
    let addQty = typeof newItem.quantity === 'number' ? newItem.quantity : 1;
    if (isNaN(addQty) || addQty <= 0) {
      return res.status(400).json({ error: 'Invalid quantity. Must be positive.' });
    }

    // Validate availability (if available field is present)
    if (typeof newItem.available === 'number') {
      // Find current quantity in cart for this item
      const existing = cart.items.find(item => item.itemId === newItem.itemId);
      const currentQty = existing ? existing.quantity : 0;
      if (currentQty + addQty > newItem.available) {
        return res.status(400).json({ error: 'Not enough stock/availability for this item.' });
      }
    }

    // Merge logic: match by itemId, or by title+amount+type+urgentNeedId if itemId is not present
    let existingIndex = -1;
    if (newItem.itemId) {
      existingIndex = cart.items.findIndex(item => item.itemId === newItem.itemId);
    }
    if (existingIndex === -1) {
      // Fallback: try to match by title, amount, type, urgentNeedId (for legacy/guest/edge cases)
      existingIndex = cart.items.findIndex(item =>
        item.title === newItem.title &&
        item.amount === newItem.amount &&
        item.type === newItem.type &&
        ((item.urgentNeedId || '') === (newItem.urgentNeedId || ''))
      );
    }
    if (existingIndex !== -1) {
      cart.items[existingIndex].quantity += addQty;
    } else {
      cart.items.push({ ...newItem, quantity: addQty });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:itemId - Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(item => item.itemId !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart - Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
