import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHandHoldingHeart, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import donationService from '../../services/donation.service';
import { useDonation } from '../../contexts/DonationContext';
import { useCart } from '../../contexts/CartContext';

const QuickDonatePanel = ({ onClose }) => {
  const navigate = useNavigate();
  const { urgentNeed, closeQuickDonate } = useDonation();
  const { addToCart } = useCart();
  const authUser = useSelector(state => state.auth && state.auth.user);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  // If urgentNeed is present, prefill amount with remaining or default
  useEffect(() => {
    if (urgentNeed) {
      setAmount(urgentNeed.remaining ? urgentNeed.remaining.toString() : '');
    }
  }, [urgentNeed]);

  const handleAmountClick = (value) => {
    setAmount(value.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await donationService.processPayment({
        amount: parseFloat(amount),
        type: urgentNeed ? 'urgent' : 'quick',
        urgentNeedId: urgentNeed ? urgentNeed.id : undefined,
      });
      navigate(`/checkout?amount=${amount}&type=${urgentNeed ? 'urgent' : 'quick'}${urgentNeed ? `&urgentNeedId=${urgentNeed.id}` : ''}`);
      if (urgentNeed) closeQuickDonate();
    } catch (err) {
      console.error('Error processing donation:', err);
      setError('Failed to process donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }
    if (!authUser) {
      if (onClose) onClose();
      closeQuickDonate();
      navigate('/login');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      console.log('[QuickDonatePanel] Calling addToCart');
      await addToCart({
        ...(urgentNeed || {}),
        amount: parseFloat(amount),
        type: urgentNeed ? 'urgent' : 'quick',
        urgentNeedId: urgentNeed ? urgentNeed.id : undefined,
      });
      console.log('[QuickDonatePanel] addToCart success');
      // Show alert and ask if user wants to go to cart
      if (window.confirm('Item added to cart!\n\nWould you like to view your cart now?')) {
        if (onClose) onClose();
        closeQuickDonate();
        navigate('/cart');
        return;
      }
      if (onClose) onClose();
      closeQuickDonate();
    } catch (err) {
      console.error('[QuickDonatePanel] addToCart error:', err);
      setError('Failed to add to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-full">
      {/* Urgent Need Summary */}
      {urgentNeed && (
        <div className="mb-4 border-b pb-4">
          <div className="flex items-center gap-4 mb-2">
            {urgentNeed.image ? (
              <img
                src={urgentNeed.image}
                alt={urgentNeed.title || urgentNeed.cardTitle || urgentNeed.cardName}
                className="w-16 h-16 rounded object-cover border bg-gray-100 transition-transform duration-200 hover:scale-105 focus:scale-105"
                onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                tabIndex={0}
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded bg-primary-100 border">
                <FaHandHoldingHeart className="text-primary-600 text-2xl" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-red-600 break-words">{urgentNeed.cardTitle || urgentNeed.title || urgentNeed.cardName}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 break-words">{urgentNeed.cardDescription || urgentNeed.description || urgentNeed.subtitle || urgentNeed.cardSubtitle}</p>
              {urgentNeed.cardCategory && (
                <div className="text-xs text-primary-700 mt-1">Category: {urgentNeed.cardCategory}</div>
              )}
              {urgentNeed.cardPage && (
                <div className="text-xs text-primary-700 mt-1">Page: {urgentNeed.cardPage}</div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span><b>Amount Needed:</b> ${urgentNeed.cardAmount || urgentNeed.amount}</span>
            {urgentNeed.remaining && <span><b>Remaining:</b> ${urgentNeed.remaining}</span>}
          </div>
        </div>
      )}
      <div className="flex items-center mb-4">
        <FaHandHoldingHeart className="text-primary-600 text-2xl mr-2" aria-hidden="true" />
        <h3 className="text-xl font-bold">Quick Donate</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow duration-200 focus:shadow-lg"
            placeholder="Enter amount"
            inputMode="decimal"
            autoComplete="off"
            aria-label="Donation amount"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {predefinedAmounts.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleAmountClick(value)}
              className={`px-3 py-2 border rounded-md text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:z-10 ${
                amount === value.toString()
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              tabIndex={0}
            >
              ${value}
            </button>
          ))}
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4" role="alert">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-150 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            tabIndex={0}
          >
            {isLoading ? 'Processing...' : (
              <>
                Donate Now <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
          {urgentNeed && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 border border-primary-600 rounded-md shadow-sm text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium transition-all duration-150"
              tabIndex={0}
            >
              <FaCartPlus /> Add to Cart
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuickDonatePanel; 