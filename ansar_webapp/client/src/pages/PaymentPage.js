import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaLock, FaShieldAlt, FaCreditCard, FaPaypal, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { STRIPE_PUBLISHABLE_KEY } from '../config/stripe';


const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function StripePaymentForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Fetch client secret from backend
    async function fetchClientSecret() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/payment/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount, currency: 'usd' })
        });
        const data = await res.json();
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError(data.error || 'Failed to get payment intent');
      } catch (err) {
        setError('Failed to connect to payment server');
      }
      setLoading(false);
    }
    if (totalAmount > 0) fetchClientSecret();
  }, [totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
          email,
          phone,
        },
      },
    });
    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return <div className="text-green-700 font-bold text-center py-8">Payment successful! Thank you for your donation.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 border border-green-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-green-800 font-semibold text-sm mb-1" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className="p-3 border border-green-200 rounded-lg bg-green-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-green-800 font-semibold text-sm mb-1" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="p-3 border border-green-200 rounded-lg bg-green-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-green-800 font-semibold text-sm mb-1" htmlFor="phone">Phone Number (optional)</label>
          <input
            id="phone"
            type="tel"
            className="p-3 border border-green-200 rounded-lg bg-green-50 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Phone Number (optional)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label className="text-green-800 font-semibold text-sm mb-1">Debit or Credit Card</label>
        <div className="p-3 border border-green-200 rounded-lg bg-green-50 focus-within:ring-2 focus-within:ring-green-400 transition-all">
          <CardElement options={{ style: { base: { fontSize: '18px', color: '#166534', '::placeholder': { color: '#a7f3d0' } } } }} />
        </div>
      </div>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 px-4 text-green-50 rounded-xl font-bold text-lg transition-colors duration-300 flex items-center justify-center shadow-lg bg-green-700 hover:bg-green-800 mt-2"
        disabled={!stripe || !clientSecret || loading}
      >
        {loading ? 'Processing...' : 'Pay Securely'}
      </button>
    </form>
  );
}


const PaymentPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useCart();
  const [tab, setTab] = useState('card');

  useEffect(() => {
    if (!cartItems.length) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-28 pb-10 px-2 md:px-6 lg:px-12">
      <div className="w-full max-w-6xl bg-green-50 rounded-3xl shadow-2xl p-0 border border-green-100 flex flex-col md:flex-row gap-0 overflow-hidden">
        {/* Left: Payment Info & Security */}
        <div className="md:w-1/3 p-12 flex flex-col justify-between bg-white/80 min-w-[260px] border-r border-green-100">
          <div>
            <button onClick={() => navigate('/cart')} className="mb-4 flex items-center text-green-700 hover:underline text-sm font-semibold">
              <FaArrowLeft className="mr-2" /> Back to Cart
            </button>
            <h1 className="text-3xl font-extrabold text-green-800 mb-2">Secure Payment</h1>
            <p className="text-green-700 mb-4 text-base">Complete your donation using our 100% secure payment system. We accept all major cards and PayPal.</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-1 text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-full text-xs"><FaLock /> SSL Encrypted</span>
              <span className="flex items-center gap-1 text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-full text-xs"><FaShieldAlt /> PCI Compliant</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <FaCreditCard className="text-2xl text-green-600" />
              <FaPaypal className="text-2xl text-green-600" />
            </div>
            <div className="mt-6 flex items-center gap-2 text-green-700 text-xs">
              <FaInfoCircle />
              <span>Payments are processed securely. You will receive a receipt by email. We never store your card details.</span>
            </div>
          </div>
        </div>
        {/* Middle: Payment Method Tabs & Entry */}
        <div className="md:w-2/4 p-8 flex flex-col bg-white border-r border-green-100 min-w-[320px]">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setTab('card')} className={`px-4 py-2 rounded-t-lg font-bold text-sm border-b-2 ${tab === 'card' ? 'border-green-600 text-green-800 bg-green-50' : 'border-transparent text-green-600 bg-white hover:bg-green-50'}`}>Card</button>
            <button onClick={() => setTab('paypal')} className={`px-4 py-2 rounded-t-lg font-bold text-sm border-b-2 ${tab === 'paypal' ? 'border-green-600 text-green-800 bg-green-50' : 'border-transparent text-green-600 bg-white hover:bg-green-50'}`}>PayPal</button>
            <button onClick={() => setTab('other')} className={`px-4 py-2 rounded-t-lg font-bold text-sm border-b-2 ${tab === 'other' ? 'border-green-600 text-green-800 bg-green-50' : 'border-transparent text-green-600 bg-white hover:bg-green-50'}`}>Other</button>
          </div>
          {tab === 'card' && (
            <Elements stripe={stripePromise}>
              <StripePaymentForm totalAmount={totalAmount} />
            </Elements>
          )}
          {tab === 'paypal' && (
            <div className="flex flex-col items-center justify-center h-full py-10 w-full">
              <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: String(totalAmount),
                          },
                          description: 'Ansar Donation',
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    alert('Thank you for your donation via PayPal! Transaction ID: ' + details.id);
                  }}
                  onError={(err) => {
                    alert('PayPal error: ' + err);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}
          {tab === 'other' && (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <FaCreditCard className="text-4xl text-green-600 mb-4" />
              <p className="text-green-700 mb-2">Other payment methods coming soon.</p>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 mt-2" disabled>Other Methods</button>
            </div>
          )}
        </div>
        {/* Right: Donation Summary */}
        <div className="md:w-1/4 bg-green-50 p-8 flex flex-col justify-between min-w-[220px]">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Donation Summary</h2>
          <ul className="mb-4 divide-y divide-green-100">
            {cartItems.map((item) => (
              <li key={item.itemId || item.id} className="flex justify-between items-center py-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-green-900 text-base">{item.cardTitle || item.title || item.cardName}</span>
                  <span className="text-xs text-green-700">{item.cardSubtitle || item.subtitle}</span>
                </div>
                <span className="font-bold text-green-800">{item.cardAmount || item.amount} USD x {item.quantity || 1}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center font-bold text-green-900 border-t border-green-200 pt-4 text-lg">
            <span>Total</span>
            <span>{totalAmount} USD</span>
          </div>
          <div className="mt-6 text-xs text-green-700">
            <p>Your donation will help us continue our mission. Thank you for your generosity!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
