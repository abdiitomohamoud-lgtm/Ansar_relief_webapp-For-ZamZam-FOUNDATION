import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  removeFromCart, 
  updateCartItemAmount, 
  clearCart 
} from '../../store/slices/donationSlice';

const Cart = () => {
  const { cart } = useSelector((state) => state.donation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id, type) => {
    dispatch(removeFromCart({ id, type }));
  };

  const handleUpdateAmount = (id, type, amount) => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      dispatch(updateCartItemAmount({ id, type, amount: numAmount }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your donation cart?')) {
      dispatch(clearCart());
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.amount, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Your Donation Cart
        </h1>
        
        {cart.length === 0 ? (
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm text-center">
            <img
              src="https://illustrations.popsy.co/amber/donation-box.svg"
              alt="Empty cart"
              className="mx-auto h-40 w-auto"
            />
            <h2 className="mt-6 text-xl font-medium text-gray-900">Your donation cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Add a donation to a campaign to get started.
            </p>
            <div className="mt-6">
              <Link
                to="/campaigns"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Browse Campaigns
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart items */}
            <div className="lg:col-span-8">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={`${item.type}-${item.id}`} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.category && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
                                {item.category}
                              </span>
                            )}
                            {item.type}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id, item.type)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:items-center">
                          <div className="mt-4 sm:mt-0 sm:ml-0">
                            <label htmlFor={`amount-${item.id}`} className="sr-only">
                              Donation Amount
                            </label>
                            <div className="relative rounded-md">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                name={`amount-${item.id}`}
                                id={`amount-${item.id}`}
                                min="1"
                                value={item.amount}
                                onChange={(e) => handleUpdateAmount(item.id, item.type, e.target.value)}
                                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <label htmlFor={`currency-${item.id}`} className="sr-only">
                                  Currency
                                </label>
                                <select
                                  id={`currency-${item.id}`}
                                  name={`currency-${item.id}`}
                                  className="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                >
                                  <option>USD</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <Link
                            to={`/campaigns/${item.id}`}
                            className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 px-6 py-4">
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="px-6 py-6">
                  <h2 className="text-lg font-medium text-gray-900">Donation Summary</h2>
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Number of donations</dt>
                      <dd className="text-sm font-medium text-gray-900">{cart.length}</dd>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <dt className="text-base font-medium text-gray-900">Total amount</dt>
                      <dd className="text-base font-medium text-gray-900">${calculateTotal()}</dd>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      100% of your donation goes directly to the cause you're supporting.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <Link to="/campaigns" className="text-primary-600 font-medium hover:text-primary-500">
                          Continue Browsing Campaigns
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 