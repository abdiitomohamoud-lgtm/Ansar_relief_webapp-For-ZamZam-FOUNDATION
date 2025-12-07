import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaGoogle, 
  FaFacebook, 
  FaApple,
  FaEye,
  FaEyeSlash,
  FaChevronLeft
} from 'react-icons/fa';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Determine if this is login or register based on URL
    const path = location.pathname;
    if (path.includes('register') || path.includes('signup')) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

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
    document.title = isLogin 
      ? 'Sign In | Ansar Organization' 
      : 'Create an Account | Ansar Organization';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname, isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing in a field with error
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin) {
      // Validation for signup form
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    // Common validations for both forms
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just log the form data and redirect
      console.log('Form submission:', isLogin ? 'Login' : 'Signup', formData);
      
      // Reset form and redirect (this would be handled by your auth system in a real app)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect to home or the page they were trying to access
      navigate('/');
      
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({
        form: 'Authentication failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    navigate(isLogin ? '/register' : '/login');
  };

  return (
    <div className="auth-page">
      <section 
        className="relative min-h-screen bg-gray-50"
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <div className="absolute inset-0 bg-primary-50 opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FaChevronLeft className="mr-2" />
                Back
              </button>
            </div>
            
            {/* Auth Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Card Header */}
              <div className="relative h-28 bg-primary-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-800 opacity-20"></div>
                <h1 className="text-2xl md:text-3xl font-bold text-white relative z-10">
                  {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h1>
              </div>
              
              {/* Card Body */}
              <div className="p-6 md:p-8">
                <p className="text-gray-600 text-center mb-6">
                  {isLogin 
                    ? 'Sign in to your account to continue' 
                    : 'Join us to support our charitable initiatives'}
                </p>
                
                {errors.form && (
                  <div className="bg-red-50 text-red-600 rounded-md p-3 mb-6 text-sm">
                    {errors.form}
                  </div>
                )}
                
                {/* Auth Form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Name Fields - only for signup */}
                    {!isLogin && (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className={`w-full py-3 pl-10 pr-4 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                              placeholder="First Name"
                            />
                          </div>
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                          )}
                        </div>
                        <div className="flex-1">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className={`w-full py-3 pl-10 pr-4 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                              placeholder="Last Name"
                            />
                          </div>
                          {errors.lastName && (
                            <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full py-3 pl-10 pr-4 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="Email Address"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full py-3 pl-10 pr-12 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 hover:text-primary-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                      )}
                    </div>
                    
                    {/* Confirm Password Field - only for signup */}
                    {!isLogin && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                          </div>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full py-3 pl-10 pr-4 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                            placeholder="Confirm Password"
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>
                    )}
                    
                    {/* Forgot Password - only for login */}
                    {isLogin && (
                      <div className="text-right">
                        <Link
                          to="/forgot-password"
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    )}
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center py-3 px-4 rounded-md text-white font-medium transition-colors ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-primary-600 hover:bg-primary-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin inline-block h-4 w-4 border-t-2 border-r-2 border-white rounded-full mr-2"></span>
                          {isLogin ? 'Signing in...' : 'Creating account...'}
                        </>
                      ) : (
                        isLogin ? 'Sign In' : 'Create Account'
                      )}
                    </button>
                  </div>
                </form>
                
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="text-red-500" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebook className="text-blue-600" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FaApple className="text-gray-800" />
                  </button>
                </div>
                
                {/* Toggle Auth Mode */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Terms and Privacy */}
            <div className="mt-6 text-center text-sm text-gray-500">
              By using our services, you agree to our{' '}
              <Link to="/terms-of-service" className="text-primary-600 hover:text-primary-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthPage; 