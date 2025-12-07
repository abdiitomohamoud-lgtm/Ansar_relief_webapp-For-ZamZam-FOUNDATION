import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserCart } from '../api/user';
import { updateCartItemQuantity, removeFromCart, clearCart } from '../api/cart';

import {
  FaShoppingCart,
  FaHeart,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave,
  FaInfoCircle,
  FaGift,
  FaRegClock
} from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['userCart'],
    queryFn: fetchUserCart
  });
    const [donationFrequency, setDonationFrequency] = useState('one-time');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const cartItems = Array.isArray(cart?.cartItems) ? cart.cartItems : [];
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.amount || item.cardAmount || 0) * (item.quantity || 1), 0);

  // Handle quantity increment/decrement
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItemQuantity(itemId, newQuantity);
    await queryClient.invalidateQueries(['userCart']);
  };
    // Handle clear all items
  const handleClearAll = async () => {
    await clearCart();
    await queryClient.invalidateQueries(['userCart']);
  };

  // Handle remove item
  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
    await queryClient.invalidateQueries(['userCart']);
  };

  // Use system/project color classes
  const bgLight = 'bg-white';
  const paymentMethods = [
    { id: 'card', label: 'Credit Card', icon: FaCreditCard },
    { id: 'paypal', label: 'PayPal', icon: FaPaypal },
    { id: 'bank', label: 'Bank Transfer', icon: FaMoneyBillWave }
  ];

  return (
    <div className={`min-h-screen pt-24 ${bgLight} cart-content-pattern font-poppins`}>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden cart-hero-pattern shadow-md rounded-b-3xl bg-green-700">
        {/* Islamic Patterns */}
        <div className="absolute inset-0 pattern-islamic-star opacity-10"></div>
        <div className="absolute inset-0 pattern-arabesque"></div>
        <div className="absolute inset-0 pattern-dots opacity-5"></div>
        <div className="absolute inset-0 pattern-geometric"></div>
        
        {/* Decorative Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-white/20 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-white/20 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-white/20 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-white/20 rounded-br-3xl"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-green-100 mb-3 tracking-tight drop-shadow-lg">
              <FaShoppingCart className="inline-block mr-2 text-green-200" /> Donation Cart
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto font-medium">
              Review and complete your charitable contributions
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className="container mx-auto max-w-[1600px] px-2 sm:px-4 lg:px-8 py-12 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-dots opacity-5"></div>
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Cart Items */}
          <div className="w-full md:w-[60%] flex-shrink-0">
            <div className="bg-green-50 rounded-3xl shadow-2xl p-8 border border-green-100 h-full flex flex-col min-w-0 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-green-800">
                <FaShoppingCart className="mr-2 text-green-600" />
                Cart Items {cartItems.length > 0 && `(${cartItems.length})`}
              </h2>

              {isLoading && (
                <div className="text-center py-12">Loading cart...</div>
              )}
              {error && (
                <div className="text-center py-12 text-red-600">{error.message || 'Failed to load cart'}</div>
              )}
              {!isLoading && !error && cartItems.length === 0 && (
                <div className="text-center py-12">
                  <FaShoppingCart className="mx-auto text-5xl text-green-200 mb-4" />
                  <p className="text-lg text-green-700 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-6 py-2 text-green-50 rounded-lg font-semibold shadow bg-green-700 hover:bg-green-800 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              )}
              {/* Clear All Button (only if 2 or more items) */}
              {!isLoading && !error && cartItems.length > 1 && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleClearAll}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition-all border border-red-700"
                  >
                    Clear All
                  </button>
                </div>
              )}
              {!isLoading && !error && cartItems.map((item) => (
                <div
                  key={item.itemId}
                  className="flex flex-col md:flex-row items-stretch gap-0 p-0 mb-6 last:mb-0 bg-white/90 rounded-3xl shadow-lg hover:shadow-2xl border border-green-100 transition-all duration-300 group overflow-hidden"
                  style={{ boxShadow: '0 4px 16px 0 rgba(34,197,94,0.10)' }}
                >
                  {/* Image Section */}
                  <div className="flex-shrink-0 flex items-center justify-center bg-green-100 md:w-32 w-full h-32 md:h-auto border-r border-green-100">
                    {item.image ? (
                      <img src={item.image} alt={item.cardTitle || item.title || item.cardName} className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-2 border-green-200 shadow" />
                    ) : (
                      <img src="/images/campaigns/water.jpg" alt="Water Campaign" className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-2 border-green-200 shadow" />
                    )}
                  </div>
                  {/* Content Section */}
                  <div className="flex flex-col justify-between flex-grow p-5 md:p-6 min-w-0">
                    <div>
                      <h3 className="font-extrabold text-xl text-green-800 group-hover:underline tracking-tight mb-1 truncate font-poppins">{item.cardTitle || item.title || item.cardName || 'Donation Item'}</h3>
                      <div className="text-sm text-green-600 mb-1 truncate font-semibold">{item.cardSubtitle || item.subtitle || 'No subtitle provided.'}</div>
                      <p className="text-sm text-green-800 mb-2 truncate font-normal italic">{item.cardDescription || item.description || 'No description available.'}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-green-800 mb-2">
                        <span className="bg-green-100 px-3 py-1 rounded-full font-bold shadow-sm">{item.cardCategory || 'General'}</span>
                        <span className="bg-green-100 px-3 py-1 rounded-full font-bold shadow-sm">{item.cardPage || item.sourcePage || 'Unknown'}</span>
                        <span className="bg-green-100 px-3 py-1 rounded-full font-bold shadow-sm">{item.type || 'N/A'}</span>
                        <span className="bg-green-100 px-3 py-1 rounded-full font-bold shadow-sm">Qty: {item.quantity || 1}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.itemId, (item.quantity || 1) - 1)}
                        className="p-2 rounded-full hover:bg-green-200 border border-green-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        disabled={item.quantity <= 1}
                        title={item.quantity <= 1 ? 'Minimum quantity is 1' : 'Decrease quantity'}
                      >
                        -
                      </button>
                      <span className="font-bold text-green-800 text-base px-2 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                        {(item.amount || item.cardAmount || 0)} USD x {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.itemId, (item.quantity || 1) + 1)}
                        className="p-2 rounded-full hover:bg-green-200 border border-green-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        title="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.itemId)}
                        className="p-2 text-green-50 bg-green-700 hover:bg-green-800 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-400 w-10 h-10 flex items-center justify-center ml-2"
                        title="Remove from cart"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary and Checkout */}
          <div className="w-full md:w-[40%] flex-shrink-0 md:pr-8 lg:pr-12 xl:pr-20">
            <div className="bg-green-50 rounded-3xl shadow-2xl p-10 sticky top-4 border border-green-100 max-w-full min-w-[340px] transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-green-800"><FaGift className="mr-2 text-green-400" /> Donation Summary</h2>

              {/* Donation Frequency */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3 text-green-800">Donation Frequency</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDonationFrequency('one-time')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition ${donationFrequency === 'one-time' ? 'border-green-700 bg-green-700 text-green-50' : 'border-green-200 text-green-800 hover:bg-green-100'}`}
                  >
                    <FaRegClock className="inline-block mr-2" />
                    One-time
                  </button>
                  <button
                    onClick={() => setDonationFrequency('monthly')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition ${donationFrequency === 'monthly' ? 'border-green-800 bg-green-800 text-green-50' : 'border-green-200 text-green-800 hover:bg-green-100'}`}
                  >
                    <FaHeart className="inline-block mr-2" />
                    Monthly
                  </button>
                </div>
              </div>
              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3 text-green-800">Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full py-3 px-4 rounded-lg border-2 flex items-center gap-2 font-semibold transition ${selectedPaymentMethod === method.id ? 'border-green-800 bg-green-100' : 'border-green-200 hover:bg-green-100'}`}
                    >
                      <method.icon className={`mr-2 text-lg ${selectedPaymentMethod === method.id ? 'text-green-800' : 'text-green-400'}`} />
                      <span className={selectedPaymentMethod === method.id ? 'text-green-800 font-bold' : 'text-green-800'}>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Total */}
              <div className="border-t border-green-200 pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-800 font-medium">Subtotal</span>
                  <span className="font-bold text-green-800">{totalAmount} USD</span>
                </div>
                <div className="flex justify-between items-center text-xl font-extrabold">
                  <span className="text-green-800">Total</span>
                  <span className="text-green-800">{totalAmount} USD</span>
                </div>
              </div>
              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/payment')}
                className={`w-full py-4 px-4 text-green-50 rounded-xl font-bold text-lg transition-colors duration-300 flex items-center justify-center shadow-lg bg-green-800 hover:bg-green-900 ${cartItems.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={cartItems.length === 0}
              >
                <FaGift className="mr-2 text-xl" />
                Complete Donation
              </button>
              {/* Additional Info */}
              <div className="mt-6 text-sm text-green-700 flex items-start gap-2">
                <FaInfoCircle className="mt-1 flex-shrink-0 text-green-400" />
                <p>Your donation will be processed securely. A receipt will be emailed to you upon completion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;