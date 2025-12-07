// server/routes/payment.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
