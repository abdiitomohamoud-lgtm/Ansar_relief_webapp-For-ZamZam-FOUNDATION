import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginStart, loginSuccess, loginFailure, clearError, registerStart, registerSuccess, registerFailure } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../store/api/apiSlice';
import { addNotification } from '../../store/slices/appSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebook, 
  FaApple, 
  FaArrowRight, 
  FaUserAlt,
  FaMobileAlt,
  FaGlobeAsia,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaRegCheckCircle,
  FaUser,
  FaInfoCircle,
  FaCheck,
  FaUserPlus,
  FaLeaf,
  FaGlobe,
  FaHeart,
  FaSignInAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { Button, Input, ErrorAlert } from '../../components/common';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [authMethod, setAuthMethod] = useState('email'); // 'email', 'mobile', or 'signup'
  const [mobile, setMobile] = useState('');
  const [mobileCode, setMobileCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [countryCode, setCountryCode] = useState('+974'); // Qatar default
  const [showHelp, setShowHelp] = useState(false);
  
  // Sign up form states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  
  // Get the intended destination, if any
  const from = location.state?.from?.pathname || '/dashboard';

  // Country codes for the dropdown
  const countryCodes = [
    { code: '+974', name: 'Qatar' },
    { code: '+966', name: 'Saudi Arabia' },
    { code: '+971', name: 'UAE' },
    { code: '+965', name: 'Kuwait' },
    { code: '+973', name: 'Bahrain' },
    { code: '+968', name: 'Oman' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }

    // Set navbar height
    const navbar = document.querySelector('header');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    // Set page title
    document.title = 'Login | Ansar Humanitarian Relief';
  }, [isAuthenticated, navigate, from]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    
    if (authMethod === 'email') {
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    } else {
      if (!mobile.trim()) {
        errors.mobile = 'Mobile number is required';
      } else if (!/^\d{8,12}$/.test(mobile)) {
        errors.mobile = 'Invalid mobile number';
      }
      
      if (codeSent && !mobileCode.trim()) {
        errors.mobileCode = 'Verification code is required';
      } else if (codeSent && !/^\d{4,6}$/.test(mobileCode)) {
        errors.mobileCode = 'Invalid verification code format';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    
    if (!mobile.trim()) {
      setFormErrors({ mobile: 'Mobile number is required' });
      return;
    }
    
    // Simulate sending code
    setCodeSent(true);
    // In a real app, you would make an API call here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(loginStart());
    
    try {
      if (authMethod === 'email') {
      const result = await login({
        email,
        password,
      }).unwrap();
      
      dispatch(loginSuccess(result));
      } else {
        // Simulate mobile login - in real app replace with actual API call
        const result = {
          user: {
            id: 'mobile-user-123',
            name: 'Mobile User',
            email: `${mobile}@example.com`,
          },
          token: 'sample-token-for-mobile-login'
        };
        
        dispatch(loginSuccess(result));
      }
      navigate(from);
    } catch (error) {
      dispatch(loginFailure(error.data?.message || 'Login failed. Please check your credentials.'));
    }
  };

  // Handle signup form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    
    if (!signupName.trim()) {
      errors.signupName = 'Full name is required';
    }
    
    if (!signupEmail.trim()) {
      errors.signupEmail = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signupEmail)) {
      errors.signupEmail = 'Invalid email address';
    }
    
    if (!signupPassword) {
      errors.signupPassword = 'Password is required';
    } else if (signupPassword.length < 6) {
      errors.signupPassword = 'Password must be at least 6 characters';
    }
    
    if (signupPassword !== signupConfirmPassword) {
      errors.signupConfirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    dispatch(registerStart());
    
    try {
      // Simulate API call - in real app use registerMutation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        name: signupName,
        email: signupEmail,
        role: 'user'
      };
      
      dispatch(registerSuccess(userData));
      navigate(from);
      
      dispatch(addNotification({
        type: 'success',
        message: 'Account created successfully! Welcome to Ansar Relief.'
      }));
    } catch (error) {
      dispatch(registerFailure(error.data?.message || 'Registration failed. Please try again.'));
    }
  };

  // Helper text for the login page
  const helpText = {
    title: "Need Help Logging In?",
    items: [
      "Make sure your email address is entered correctly",
      "Passwords are case-sensitive",
      "If you've forgotten your password, click the 'Forgot password?' link",
      "For mobile login, ensure you've entered the correct country code",
      "If you continue to experience issues, please contact our support team"
    ]
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-blue-50 flex flex-col pt-8 relative overflow-hidden"
      style={{ paddingTop: `${navbarHeight + 20}px` }}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-b from-primary-50 to-transparent opacity-30 pointer-events-none" />
      <div className="absolute top-24 left-8 w-48 h-48 rounded-full bg-primary-100 opacity-20 pointer-events-none animate-pulse" style={{animationDuration: '8s'}} />
      <div className="absolute bottom-12 right-12 w-64 h-64 rounded-full bg-blue-100 opacity-20 pointer-events-none animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}} />
      
      {/* Enhanced decorative patterns */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-100 to-yellow-200 opacity-20 animate-pulse pointer-events-none" style={{animationDuration: '7s'}}></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-green-100 to-green-200 opacity-20 animate-pulse pointer-events-none" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 opacity-20 animate-pulse pointer-events-none" style={{animationDuration: '12s', animationDelay: '0.5s'}}></div>
      
      {/* Islamic pattern decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      ></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-primary-200 to-primary-300 opacity-10 rounded-full transform -rotate-12"></div>
      <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-blue-200 to-blue-300 opacity-10 rounded-full transform rotate-45"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-6 bg-gradient-to-r from-green-200 to-blue-200 opacity-10 rounded-full transform -rotate-12"></div>
      
      {/* Decorative SVG patterns */}
      <svg className="absolute top-0 left-0 opacity-5 pointer-events-none" width="100%" height="100%" preserveAspectRatio="none">
        <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <circle id="pattern-circle" cx="10" cy="10" r="2" fill="#4F46E5"></circle>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
      </svg>
      
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center py-0 md:py-5 relative z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left side content */}
          <div className="hidden lg:flex lg:col-span-2 flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-200/50 mr-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-20 rounded-full scale-90"></div>
                  <FaHandHoldingHeart className="text-2xl relative z-10" />
                  <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-primary-400 rounded-full opacity-30"></div>
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-30"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                    Ansar <span className="text-primary-600">Relief</span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 italic">International Humanitarian Organization</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-5 leading-tight">
                {authMethod === 'signup' 
                  ? 'Join Our Mission of Compassion' 
                  : 'Welcome to a World of Giving'}
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg">
                {authMethod === 'signup'
                  ? 'Create your account today and become part of our growing community dedicated to humanitarian aid. Your support can transform lives around the world.'
                  : 'Your generosity helps us provide essential aid and services to those in need. Sign in to continue your journey of making a difference in the world.'}
              </p>
              
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-100 group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary-50 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                  <FaRegCheckCircle className="text-primary-600 mr-3" />
                  Why Choose Ansar Relief
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start transform transition-transform hover:translate-x-1">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <FaLeaf className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Transparent Donation Tracking</span>
                      <p className="text-xs text-gray-500 mt-0.5">Follow your contributions and see their direct impact</p>
                    </div>
                  </li>
                  <li className="flex items-start transform transition-transform hover:translate-x-1">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <FaGlobe className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Global Reach, Local Impact</span>
                      <p className="text-xs text-gray-500 mt-0.5">Supporting communities across 40+ countries worldwide</p>
                    </div>
                  </li>
                  <li className="flex items-start transform transition-transform hover:translate-x-1">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                      <FaShieldAlt className="h-3 w-3" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Secure Donation Platform</span>
                      <p className="text-xs text-gray-500 mt-0.5">100% secure and certified payment processing</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow duration-300 relative overflow-hidden hover:border-primary-100">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100 rounded-full -mt-8 -mr-8 opacity-30"></div>
                  <div className="text-primary-600 mb-2 bg-primary-50 p-2 rounded-full">
                    <FaHeart className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-semibold text-gray-700">10M+</span>
                  <span className="text-xs text-gray-500 mt-1">Lives Impacted</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow duration-300 relative overflow-hidden hover:border-primary-100">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100 rounded-full -mt-8 -mr-8 opacity-30"></div>
                  <div className="text-primary-600 mb-2 bg-primary-50 p-2 rounded-full">
                    <FaGlobe className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-semibold text-gray-700">40+</span>
                  <span className="text-xs text-gray-500 mt-1">Countries</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow duration-300 relative overflow-hidden hover:border-primary-100">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100 rounded-full -mt-8 -mr-8 opacity-30"></div>
                  <div className="text-primary-600 mb-2 bg-primary-50 p-2 rounded-full">
                    <FaUser className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-semibold text-gray-700">100K+</span>
                  <span className="text-xs text-gray-500 mt-1">Donors</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 bg-white rounded-xl shadow-md p-5 border border-gray-100 relative hover:shadow-lg transition-all duration-300 hover:border-primary-100 group">
                <div className="absolute -top-3 -left-3 text-primary-600 bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-primary-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="text-sm italic text-gray-600 pl-4">
                  "Ansar Relief has allowed me to make a real difference in the lives of those in need. Their transparent approach gives me confidence that my donations reach those who need it most."
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-800">Sarah Mitchell</p>
                    <p className="text-xs text-gray-500">Monthly Donor since 2019</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right side form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 w-full max-w-md mx-auto lg:max-w-full"
          >
            {/* Form area */}
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mt-16 -mr-16 opacity-30 z-0"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-50 rounded-full -mb-12 -ml-12 opacity-30 z-0"></div>
              
              {/* Enhanced header section */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-8 px-6 text-white relative overflow-hidden">
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>
                
                {/* Animated circular decorative elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mt-10 -mr-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full -mb-8 -ml-8"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                ></motion.div>
                
                <motion.h2 
                  className="text-3xl font-bold relative z-10"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {authMethod === 'signup' ? 'Create Account' : 'Welcome Back'}
                </motion.h2>
                <motion.p 
                  className="text-md text-primary-100 relative z-10 mt-2 max-w-md"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {authMethod === 'signup' 
                    ? 'Sign up to join our community of giving' 
                    : 'Sign in to continue your journey of giving'}
                </motion.p>
        </div>
        
              <div className="p-8 relative z-10">
                {error && <ErrorAlert message={error} className="mb-6" />}
                
                {/* Authentication method tabs */}
                <div className="flex rounded-lg border border-gray-200 mb-8 p-1 bg-gray-50 shadow-sm relative">
                  <div 
                    className="absolute inset-y-1 rounded-md transition-all duration-300 z-0 shadow-sm bg-white" 
                    style={{ 
                      left: authMethod === 'email' ? '0%' : authMethod === 'mobile' ? '33.333%' : '66.666%', 
                      width: '33.333%' 
                    }}
                  />
                  <button
                    className={`flex-1 py-3 text-center font-medium text-sm rounded-md flex items-center justify-center transition-all duration-300 z-10 relative ${
                      authMethod === 'email' 
                        ? 'text-primary-700' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setAuthMethod('email')}
                  >
                    <motion.div
                      animate={authMethod === 'email' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mr-2"
                    >
                      <FaEnvelope className={authMethod === 'email' ? "text-primary-600" : ""} />
                    </motion.div>
                    <span>Sign In</span>
                  </button>
                  <button
                    className={`flex-1 py-3 text-center font-medium text-sm rounded-md flex items-center justify-center transition-all duration-300 z-10 relative ${
                      authMethod === 'mobile' 
                        ? 'text-primary-700' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setAuthMethod('mobile')}
                  >
                    <motion.div
                      animate={authMethod === 'mobile' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mr-2"
                    >
                      <FaMobileAlt className={authMethod === 'mobile' ? "text-primary-600" : ""} />
                    </motion.div>
                    <span>Mobile</span>
                  </button>
                  <button
                    className={`flex-1 py-3 text-center font-medium text-sm rounded-md flex items-center justify-center transition-all duration-300 z-10 relative ${
                      authMethod === 'signup' 
                        ? 'text-primary-700' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setAuthMethod('signup')}
                  >
                    <motion.div
                      animate={authMethod === 'signup' ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mr-2"
                    >
                      <FaUserPlus className={authMethod === 'signup' ? "text-primary-600" : ""} />
                    </motion.div>
                    <span>Sign Up</span>
                  </button>
                </div>
                
                <AnimatePresence mode="wait">
                  {authMethod === 'email' ? (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                          </div>
                          <motion.input
                            whileFocus={{ boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)" }}
                            id="email"
                            name="email"
              type="email"
                            autoComplete="email"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                            placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                          />
                          {email && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <FaCheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <div className="text-sm">
                            <button
                              type="button"
                              onClick={() => setShowPassword(true)}
                              className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                            >
                              Forgot your password?
                            </button>
                          </div>
                        </div>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="h-5 w-5 text-gray-400" />
                          </div>
                          <motion.input
                            whileFocus={{ boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.2)" }}
                            id="password"
                            name="password"
              type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                            placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                              {showPassword ? (
                                <FaEyeSlash className="h-5 w-5" />
                              ) : (
                                <FaEye className="h-5 w-5" />
                              )}
                </button>
                          </div>
                        </div>
          </div>
          
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all duration-200 cursor-pointer"
              />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Remember me for 30 days
              </label>
            </div>
            
                      <div>
                        <motion.button
                          whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-md"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Signing in...
                            </span>
                          ) : (
                            <>
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaSignInAlt className="h-5 w-5 text-primary-500 group-hover:text-primary-400 transition-colors duration-200" />
                              </span>
                              Sign in
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : authMethod === 'mobile' ? (
                    <motion.form 
                      key="mobile-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-4">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                          <div className="flex shadow-sm rounded-md overflow-hidden">
                            <div className="relative">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="appearance-none block w-full pl-3 pr-8 py-3 border border-gray-300 rounded-l-md bg-white text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200"
                              >
                                {countryCodes.map(country => (
                                  <option key={country.code} value={country.code}>
                                    {country.code} ({country.name})
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FaGlobeAsia size={12} />
                              </div>
                            </div>
                            <input
                              type="tel"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                              className={`block w-full py-3 px-4 border ${formErrors.mobile ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'} rounded-r-md appearance-none bg-white text-gray-700 focus:outline-none text-sm transition-all duration-200`}
                              placeholder="Mobile number"
                              required
                            />
                          </div>
                          {formErrors.mobile && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">Enter your mobile number without country code</p>
                        </motion.div>
                        
                        {codeSent && (
                          <motion.div
                            initial={{ y: 10, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-primary-50 p-4 rounded-md border border-primary-100 shadow-inner"
                          >
                            <div className="flex items-start mb-3">
                              <div className="flex-shrink-0 text-primary-600 bg-primary-100 rounded-full p-1">
                                <FaCheck className="h-4 w-4" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-primary-800">Verification code sent!</h3>
                                <p className="text-xs text-primary-700 mt-1">
                                  A verification code has been sent to {countryCode} {mobile}
                                </p>
            </div>
                            </div>
                            <Input
                              label="Verification Code"
                              type="text"
                              value={mobileCode}
                              onChange={(e) => setMobileCode(e.target.value.replace(/\D/g, ''))}
                              placeholder="Enter 6-digit code"
                              error={formErrors.mobileCode}
                              maxLength={6}
                              required
                              className="font-mono tracking-wider text-lg text-center focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
                            />
                          </motion.div>
                        )}
                      </div>
                      
                      {!codeSent ? (
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="pt-2"
                        >
                          <Button
                            type="button"
                            fullWidth
                            isLoading={loading}
                            disabled={loading}
                            onClick={handleSendCode}
                            className="py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            Send Verification Code
                          </Button>
                        </motion.div>
                      ) : (
                        <>
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-gray-600">
                              Didn't receive code?
                            </span>
                            <button
                              type="button"
                              onClick={handleSendCode}
                              className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors duration-200"
                            >
                              <FaMobileAlt className="mr-1" size={12} />
                              Resend Code
                            </button>
                          </motion.div>
                          
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="pt-2"
                          >
                            <Button
                              type="button"
                              fullWidth
                              isLoading={loading}
                              disabled={loading}
                              onClick={handleSubmit}
                              className="flex items-center justify-center py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Verify and Sign in
                              <FaArrowRight className="ml-2" />
                            </Button>
                          </motion.div>
                        </>
                      )}
                    </motion.form>
                  ) : (
                    <motion.form 
                      key="signup-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                      onSubmit={handleSignUp}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Input
                            label="Full Name"
                            type="text"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            startIcon={<FaUser className="text-gray-400" />}
                            placeholder="Enter your full name"
                            error={formErrors.signupName}
                            required
                            className="focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Input
                            label="Email Address"
                            type="email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            startIcon={<FaEnvelope className="text-gray-400" />}
                            placeholder="Enter your email"
                            error={formErrors.signupEmail}
                            required
                            className="focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Input
                            label="Password"
                            type={showSignupPassword ? "text" : "password"}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            startIcon={<FaLock className="text-gray-400" />}
                            endIcon={
                              <button
                                type="button"
                                onClick={() => setShowSignupPassword(!showSignupPassword)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                              >
                                {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            }
                            placeholder="Create a password"
                            error={formErrors.signupPassword}
                            required
                            className="focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Input
                            label="Confirm Password"
                            type={showSignupConfirmPassword ? "text" : "password"}
                            value={signupConfirmPassword}
                            onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            startIcon={<FaLock className="text-gray-400" />}
                            endIcon={
                              <button
                                type="button"
                                onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                              >
                                {showSignupConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            }
                            placeholder="Confirm your password"
                            error={formErrors.signupConfirmPassword}
                            required
                            className="focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300"
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="md:col-span-2 flex items-center"
                        >
                          <input
                            id="agree-terms"
                            name="agree-terms"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors duration-200"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                            required
                          />
                          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                            I agree to the{' '}
                            <Link to="/terms-of-service" className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy-policy" className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">
                              Privacy Policy
                            </Link>
                          </label>
                        </motion.div>
                        {formErrors.agreeTerms && (
                          <p className="text-sm text-red-600 mt-1 md:col-span-2">{formErrors.agreeTerms}</p>
                        )}
          </div>
          
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-2"
                      >
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            disabled={loading}
                          className="flex items-center justify-center py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          {loading ? 'Creating Account...' : 'Create Account'}
                          {!loading && <FaArrowRight className="ml-2" />}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <motion.button
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      whileTap={{ y: 0, boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)" }}
                      type="button"
                      className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-300"
                    >
                      <FaGoogle className="text-red-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      whileTap={{ y: 0, boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)" }}
                      type="button"
                      className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-300"
                    >
                      <FaFacebook className="text-blue-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                      whileTap={{ y: 0, boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)" }}
                      type="button"
                      className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:border-gray-400"
                    >
                      <FaApple className="text-gray-800" />
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-6 pt-5 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between">
                    {authMethod === 'signup' ? (
                      <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setAuthMethod('email')}
                          className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            Sign in
                        </button>
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setAuthMethod('signup')}
                          className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                        >
                          Sign up now
                        </button>
                      </p>
                    )}
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowHelp(!showHelp)}
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center transition-colors duration-200"
                    >
                      <FaInfoCircle className="mr-1" />
                      Help
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Enhanced Donation Security Features */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="mt-8 bg-white rounded-xl shadow-md px-6 py-5 border border-gray-100 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary-100 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary-50 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="flex items-center text-gray-700">
                <div className="bg-primary-50 p-3 rounded-full mr-4 shadow-sm relative">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-primary-100"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.2, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                  <FaShieldAlt className="text-primary-600 relative z-10" />
                </div>
                <div>
                  <span className="font-medium block">Secure Login & Donation</span>
                  <span className="text-xs text-gray-500">Your personal information is protected with industry-leading security</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                  <FaRegCheckCircle className="text-green-500 mr-1.5 flex-shrink-0" />
                  <span>256-bit encryption</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                  <FaRegCheckCircle className="text-green-500 mr-1.5 flex-shrink-0" />
                  <span>Secure SSL connection</span>
                </div>
              </div>
              
              {/* Additional security info */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <FaInfoCircle className="text-primary-400 mr-1.5 flex-shrink-0" />
                  <span>We never store your payment details on our servers</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center text-xs text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p>
                By logging in, you agree to our{' '}
                <Link to="/terms-of-service" className="text-primary-600 hover:underline transition-colors duration-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-primary-600 hover:underline transition-colors duration-200">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login; 