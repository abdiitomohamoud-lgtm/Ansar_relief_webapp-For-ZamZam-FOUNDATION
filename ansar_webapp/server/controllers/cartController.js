// Update item quantity in cart
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    if (!itemId || typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Invalid itemId or quantity' });
    }
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const item = cart.items.find(i => i.itemId === itemId);
    if (!item) return res.status(404).json({ error: 'Item not found in cart' });
    item.quantity = quantity;
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ cartItems: cart.items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item quantity', details: err.message });
  }
};
const Cart = require('../models/Cart');

// Get current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.json({ cartItems: [] });
    }
    res.json({ cartItems: cart.items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart', details: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    console.log('--- [Cart] Add to Cart called ---');
    console.log('User:', req.user ? req.user._id : 'NO USER');
    let { item } = req.body;
    console.log('Item received:', item);
    // Convert item.id to item.itemId if needed
    if (item.id && !item.itemId) {
      item.itemId = item.id;
      delete item.id;
    }
    // Ensure all new fields are present
    item.title = item.title || item.cardTitle || '';
    item.subtitle = item.subtitle || item.cardSubtitle || '';
    item.description = item.description || item.cardDescription || '';
    item.cardName = item.cardName || '';
    item.cardCategory = item.cardCategory || '';
    item.cardPage = item.cardPage || item.sourcePage || '';
    item.cardAmount = item.cardAmount || item.amount || 0;
    item.sourcePage = item.sourcePage || '';
    let cart = await Cart.findOne({ userId: req.user._id });
    console.log('Cart found:', cart ? 'YES' : 'NO');
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [item] });
      console.log('Creating new cart for user:', req.user._id);
    } else {
      // Merge logic: only compare itemId, amount/cardAmount, type, urgentNeedId
      const existingIndex = cart.items.findIndex(i =>
        i.itemId === item.itemId &&
        ((i.amount || i.cardAmount) === (item.amount || item.cardAmount)) &&
        (i.type === item.type) &&
        ((i.urgentNeedId || null) === (item.urgentNeedId || null))
      );
      if (existingIndex !== -1) {
        cart.items[existingIndex].quantity += item.quantity || 1;
        console.log('Incremented quantity for itemId:', item.itemId);
      } else {
        cart.items.push(item);
        console.log('Added new item to cart:', item.itemId);
      }
    }
    cart.updatedAt = new Date();
    await cart.save();
    console.log('Cart saved to DB. Cart items count:', cart.items.length);
    res.json({ cartItems: cart.items });
  } catch (err) {
    console.error('Error in addToCart:', err);
    res.status(500).json({ error: 'Failed to add to cart', details: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(i => i.itemId !== itemId);
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ cartItems: cart.items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart', details: err.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      cart.updatedAt = new Date();
      await cart.save();
    }
    res.json({ cartItems: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart', details: err.message });
  }
};

// Get cart statistics
exports.getCartStats = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    const totalItems = cart ? cart.items.reduce((sum, i) => sum + i.quantity, 0) : 0;
    const totalAmount = cart ? cart.items.reduce((sum, i) => sum + (i.amount * i.quantity), 0) : 0;
    res.json({ totalItems, totalAmount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cart stats', details: err.message });
  }
};
