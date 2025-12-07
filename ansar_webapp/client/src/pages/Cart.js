import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrash, 
  FaArrowLeft, 
  FaArrowRight, 
  FaHeart, 
  FaGift, 
  FaHandHoldingHeart, 
  FaHandHoldingUsd, 
  FaShieldAlt, 
  FaRegCheckCircle,
  FaInfoCircle,
  FaLock,
  FaCreditCard,
  FaWater,
  FaBreadSlice,
  FaGraduationCap
} from 'react-icons/fa';
import { Button } from '../components/common';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserCart } from '../api/user';


const Cart = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['userCart'],
    queryFn: fetchUserCart
  });
  const cartItems = Array.isArray(cart?.cartItems) ? cart.cartItems : [];
  console.log('[Cart.js] cartItems:', cartItems);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.amount || 0) * (item.quantity || 1), 0);
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [showImpact, setShowImpact] = useState(true);
  
  useEffect(() => {
    // Set page title
    document.title = 'Your Donation Cart | Ansar Humanitarian Relief';
    
    // Set navbar height
    const navbar = document.querySelector('header');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);
  
  // Example mutation functions (replace with your actual API calls)


  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    // Use fetch to backend (same as CartTab)
    await fetch('/api/cart/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ itemId: id, quantity: newQuantity })
    });
    await queryClient.invalidateQueries(['userCart']);
  };


  const handleRemoveItem = async (id) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      await fetch(`/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      await queryClient.invalidateQueries(['userCart']);
    }
  };


  const clearCart = async () => {
    await fetch('/api/cart/clear', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    await queryClient.invalidateQueries(['userCart']);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // Suggested donation items
  const suggestedItems = [
    {
      id: 'water-project',
      name: 'Clean Water Project',
      description: 'Provide clean water to communities in need',
      image: '/images/projects/water-project.jpg',
      type: 'project',
      amount: 50,
      icon: <FaWater className="text-blue-500" />
    },
    {
      id: 'food-aid',
      name: 'Emergency Food Aid',
      description: 'Help feed families facing food insecurity',
      image: '/images/projects/food-aid.jpg',
      type: 'aid',
      amount: 30,
      icon: <FaBreadSlice className="text-amber-500" />
    },
    {
      id: 'edu-support',
      name: 'Education Support',
      description: 'Help children access quality education',
      image: '/images/projects/education.jpg',
      type: 'program',
      amount: 25,
      icon: <FaGraduationCap className="text-purple-500" />
    }
  ];
  
  // Display empty cart message
  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div className="text-red-600">{error.message || 'Failed to load cart'}</div>;
  if (cartItems.length === 0) {
    return (
      <div 
        className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
        style={{ paddingTop: `${navbarHeight + 20}px` }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-8 max-w-lg mx-auto text-center"
          >
            <div className="text-primary-100 bg-primary-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Donation Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't added any donations to your cart yet. Explore our campaigns and make a difference today.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Link to="/campaigns">
              <Button variant="primary" fullWidth>
                Browse Campaigns
              </Button>
            </Link>
              <Link to="/sadaqah">
                <Button variant="outline" fullWidth>
                  Explore Sadaqah
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Suggested Donations</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {suggestedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
                    <div className="text-sm text-gray-500 mb-1">${item.amount}</div>
                    <Link to={`/donate?project=${item.id}`} className="mt-2 text-xs text-primary-600 hover:text-primary-700">
                      Donate Now
                    </Link>
                  </motion.div>
                ))}
              </div>
          </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
      style={{ paddingTop: `${navbarHeight + 20}px` }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Donation Cart</h1>
            <p className="text-gray-600 text-sm">
              Review and manage your donations
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/campaigns" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
              <FaArrowLeft className="mr-1" />
              Continue Browsing
            </Link>
            
          <button
            onClick={() => clearCart()}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors underline"
          >
            Clear Cart
          </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="space-y-5">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.itemId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex flex-col sm:flex-row border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                    >
                      <div className="sm:w-28 sm:h-28 mb-4 sm:mb-0 flex-shrink-0">
                        <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={item.image && item.image !== '' ? item.image : '/images/placeholder.jpg'}
                            alt={item.name || item.title}
                            className="w-full h-full object-cover"
                            onError={e => {
                              if (e.target.src.indexOf('placeholder.jpg') === -1) {
                                e.target.src = '/images/placeholder.jpg';
                              } else {
                                e.target.onerror = null;
                              }
                            }}
                          />
                          <div className="absolute top-0 left-0 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs py-1 px-2 rounded-br-md">
                            {item.type === 'campaign' ? 'Campaign' : item.type === 'project' ? 'Project' : 'General'}
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow sm:ml-5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-gray-800">{item.name || item.title}</h3>
                            <span className="text-primary-600 font-bold">${(item.amount || item.cardAmount || 0) * (item.quantity || 1)}</span>
                          </div>
                          <div className="text-gray-500 mb-1">{item.description || item.cardDescription}</div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Quantity: {item.quantity || 1}</span>
                            <span>Type: {item.type || 'General'}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.itemId, (item.quantity || 1) - 1)}
                              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="mx-2 w-6 text-center">{item.quantity || 1}</span>
                            <button
                              onClick={() => handleQuantityChange(item.itemId, (item.quantity || 1) + 1)}
                              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ${((item.amount || item.cardAmount || 0) * (item.quantity || 1)).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              ${(item.amount || item.cardAmount || 0).toFixed(2)} each
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.itemId)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                            aria-label="Remove item"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {showImpact && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-5 shadow-sm relative"
              >
                <button 
                  onClick={() => setShowImpact(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  aria-label="Close impact information"
                >
                  ×
                </button>
                <h3 className="font-semibold text-gray-800 flex items-center text-lg mb-3">
                  <FaHandHoldingHeart className="text-primary-600 mr-2" />
                  The Impact of Your Donation
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                    <FaWater className="text-blue-500 text-xl mb-2" />
                    <h4 className="font-medium text-gray-800 mb-1">Clean Water</h4>
                    <p className="text-sm text-gray-600">Can provide safe drinking water for 10 families</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                    <FaBreadSlice className="text-amber-500 text-xl mb-2" />
                    <h4 className="font-medium text-gray-800 mb-1">Food Security</h4>
                    <p className="text-sm text-gray-600">Can feed 20 children nutritious meals for a week</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                    <FaGraduationCap className="text-purple-500 text-xl mb-2" />
                    <h4 className="font-medium text-gray-800 mb-1">Education</h4>
                    <p className="text-sm text-gray-600">Can provide school supplies for 15 students</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">You Might Also Consider</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {suggestedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-all"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                    <div className="text-sm text-gray-800 font-semibold mb-3">${item.amount}</div>
                    <Link to={`/donate?project=${item.id}`} className="text-xs bg-primary-50 text-primary-600 hover:bg-primary-100 py-1 px-3 rounded-full transition-colors">
                      Add to Cart
              </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-28">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaGift className="text-primary-600 mr-2" /> Donation Summary
                </h2>
                
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                      <div className="flex items-start">
                        <span className="text-gray-700">{item.name} </span>
                        <span className="text-gray-500 ml-1">x{item.quantity}</span>
                      </div>
                      <span className="text-gray-800">${(item.amount * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 -mx-6 px-6 py-4 mt-6">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary-600">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                    className="py-3"
                  onClick={handleCheckout}
                >
                  <FaHeart className="mr-2" />
                  Proceed to Checkout
                </Button>
                  
                  <div className="flex items-center justify-center text-xs text-gray-500 gap-1 mt-3">
                    <FaLock className="text-gray-400" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FaShieldAlt className="text-primary-600 mr-2" /> Donation Security
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <FaRegCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>100% secure payment processing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaRegCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Your information is protected with encryption</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaRegCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Donations are tax-deductible where applicable</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <FaCreditCard className="text-gray-400" />
                    <span className="text-xs text-gray-500">We accept all major credit cards</span>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  By proceeding, you agree to our <Link to="/terms-of-service" className="text-primary-600 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 