const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

// GET /api/cart - Get current user's cart
router.get('/', cartController.getCart);

// POST /api/cart - Add item to cart
router.post('/', cartController.addToCart);

// DELETE /api/cart/:itemId - Remove item from cart
router.delete('/:itemId', cartController.removeFromCart);

// DELETE /api/cart - Clear cart
router.delete('/', cartController.clearCart);

module.exports = router;
