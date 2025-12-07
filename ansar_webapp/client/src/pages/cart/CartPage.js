import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaArrowRight, 
  FaArrowLeft, 
  FaShoppingCart,
  FaMoneyCheckAlt,
  FaRegCreditCard,
  FaLock
} from 'react-icons/fa';

const CartPage = () => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Educational Support',
      amount: 100,
      category: 'education',
      quantity: 1
    },
    {
      id: 2,
      title: 'Water and Wells Project',
      amount: 300,
      category: 'water',
      quantity: 1
    },
    {
      id: 3,
      title: 'Orphan Sponsorship',
      amount: 50,
      category: 'orphans',
      quantity: 1
    }
  ]);

  useEffect(() => {
    // Get actual navbar height for precise calculations
    const navbar = document.querySelector('header') || document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    
    // Initialize event listener for resize to update navbar height
    const handleResize = () => {
      const navbar = document.querySelector('header') || document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Set document title
    document.title = "Your Cart | Ansar Organization";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.amount * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  return (
    <div className="cart-page">
      {/* Page Header */}
      <section 
        className="relative bg-primary-900 overflow-hidden" 
        style={{ 
          marginTop: `${navbarHeight}px`,
          paddingTop: "3rem",
          paddingBottom: "3rem"
        }}
      >
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-700"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Your Donation Cart</h1>
              <p className="text-white/80 mt-1">Review your selected charitable contributions</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-2 text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary-700">1</span>
                <span className="text-sm">Cart</span>
                <span className="w-8 h-1 bg-white/30"></span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/30 text-white">2</span>
                <span className="text-sm text-white/70">Checkout</span>
                <span className="w-8 h-1 bg-white/30"></span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/30 text-white">3</span>
                <span className="text-sm text-white/70">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Items in Your Cart</h2>
                    <span className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
                  </div>
                </div>
                
                {cartItems.length > 0 ? (
                  <div>
                    {/* Cart Items List */}
                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-grow">
                              <h3 className="font-medium text-gray-800">{item.title}</h3>
                              <p className="text-sm text-gray-500">Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button 
                                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                                  onClick={() => handleDecreaseQuantity(item.id)}
                                  disabled={item.quantity <= 1}
                                >
                                  <FaMinus size={10} />
                                </button>
                                <span className="w-10 text-center">{item.quantity}</span>
                                <button 
                                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
                                  onClick={() => handleIncreaseQuantity(item.id)}
                                >
                                  <FaPlus size={10} />
                                </button>
                              </div>
                              
                              {/* Item Price */}
                              <div className="text-right min-w-[80px]">
                                <div className="font-medium text-gray-800">${(item.amount * item.quantity).toLocaleString()}</div>
                                <div className="text-xs text-gray-500">${item.amount} each</div>
                              </div>
                              
                              {/* Remove Button */}
                              <button 
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Continue Shopping */}
                    <div className="p-6 bg-gray-50">
                      <Link 
                        to="/donate" 
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <FaArrowLeft className="mr-2" /> 
                        Continue Donating
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">
                      <FaShoppingCart className="inline-block" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't added any donations to your cart yet.
                    </p>
                    <Link 
                      to="/donate" 
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors shadow-md"
                    >
                      Browse Donation Options
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-primary-600">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Secure Checkout Notice */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <div className="text-primary-600 mr-3">
                        <FaLock />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Secure Donation</h4>
                        <p className="text-xs text-gray-600">All donation transactions are secure and encrypted.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Options */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Payment Methods</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                        <FaRegCreditCard className="text-gray-600" />
                      </div>
                      <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                        <FaMoneyCheckAlt className="text-gray-600" />
                      </div>
                      <div className="w-12 h-8 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">
                        PayPal
                      </div>
                    </div>
                  </div>
                  
                  {/* Checkout Button */}
                  {cartItems.length > 0 && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        to="/checkout" 
                        className="block w-full py-3 px-4 bg-primary-600 text-white text-center rounded-md font-medium hover:bg-primary-700 transition-colors shadow-md"
                      >
                        Proceed to Checkout
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Suggested Donations */}
      {cartItems.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">You May Also Be Interested In</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'Emergency Relief Fund',
                  description: 'Provide immediate assistance to communities affected by natural disasters and conflicts.',
                  amount: 100,
                  image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Child Education Program',
                  description: 'Support education for underprivileged children and help build a brighter future.',
                  amount: 75,
                  image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Healthcare for All',
                  description: 'Provide essential healthcare services to those who cannot afford it.',
                  amount: 150,
                  image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80'
                }
              ].map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={suggestion.image} 
                      alt={suggestion.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 mb-2">{suggestion.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-primary-600">${suggestion.amount}</span>
                      <button className="px-4 py-2 bg-primary-100 text-primary-600 rounded-md font-medium hover:bg-primary-200 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage; 