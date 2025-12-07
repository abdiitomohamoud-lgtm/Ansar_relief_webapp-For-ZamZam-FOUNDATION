const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../src/middleware/auth');

// All routes require authentication
router.use(protect);


router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:itemId', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);
router.post('/update', cartController.updateCartItemQuantity);
router.get('/stats', cartController.getCartStats);

module.exports = router;
