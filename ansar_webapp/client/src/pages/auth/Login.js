import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import zxcvbn from 'zxcvbn';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginStart, loginSuccess, loginFailure, clearError, registerStart, registerSuccess, registerFailure } from '../../store/slices/authSlice';
import { useLoginMutation, useRegisterMutation, useLoginWithGoogleMutation } from '../../store/api/apiSlice';
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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, Input, ErrorAlert } from '../../components/common';
import ProgressSteps from '../../components/ProgressSteps';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { somaliRegions } from '../../data/somaliRegions';

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

const Login = () => {
  // ...all useState and hook initializations...

  // ...all useState and hook initializations...

  // Redirect to login after success step
  useEffect(() => {
    if (signupStep === 3) {
      const timer = setTimeout(() => {
        setAuthMethod('email');
        setEmail(signupEmail);
        setSignupStep(1);
        navigate('/login');
      }, 3000); // Increased delay to 3 seconds
      return () => clearTimeout(timer);
    }
  } );
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
  const [signupLocation, setSignupLocation] = useState('');
  const [signupGender, setSignupGender] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupPasswordStrength, setSignupPasswordStrength] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [signupCaptchaToken, setSignupCaptchaToken] = useState(null);
  // Step 2 verification code state
  const [verificationCode, setVerificationCode] = useState('');

  // Add state for signup step
  const [signupStep, setSignupStep] = useState(1);

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  // Get the intended destination, if any
  const from = location.state?.from?.pathname || '/dashboard';

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
    let validationPassed = validateForm();
    if (!validationPassed) {
      setFormErrors(prev => ({ ...prev, general: 'Please fix the errors above and try again.' }));
      console.error('Validation failed:', formErrors);
      return;
    }
    if (!captchaToken) {
      setFormErrors(prev => ({ ...prev, captcha: 'Please complete the captcha' }));
      console.error('Captcha missing');
      return;
    }
    dispatch(loginStart());
    try {
      let result;
      if (authMethod === 'email') {
        result = await login({
          email,
          password,
          captcha: captchaToken
        }).unwrap();
      } else {
        // Simulate mobile login - in real app replace with actual API call
        result = {
          user: {
            id: 'mobile-user-123',
            name: 'Mobile User',
            email: `${mobile}@example.com`,
          },
          token: 'sample-token-for-mobile-login'
        };
      }
      // Ensure user object contains email and token
      let userObj = { ...(result.user || result) }; // clone to make extensible
      if (!userObj.email && email) userObj.email = email;
      if (result?.token) {
        userObj.token = result.token;
        // Always set 'authToken' for user logins
        localStorage.setItem('authToken', result.token);
      } else if (userObj.token) {
        // Fallback: if token is present on userObj, set it
        localStorage.setItem('authToken', userObj.token);
      }
      // Remove sensitive fields before saving to localStorage
      delete userObj.password;
      delete userObj.verificationCode;
      delete userObj.verificationCodeExpires;
      dispatch(loginSuccess(userObj));
      // Persist login state for email/mobile login
      localStorage.setItem('user', JSON.stringify(userObj));
      navigate('/profile');
    } catch (error) {
      let errorMsg = error?.data?.message || error?.message || 'Login failed. Please check your credentials.';
      setFormErrors(prev => ({ ...prev, general: errorMsg }));
      dispatch(loginFailure(errorMsg));
      console.error('Login error:', error);
    }
  };

  // Password strength calculation
  useEffect(() => {
    if (signupPassword) {
      setSignupPasswordStrength(zxcvbn(signupPassword));
    } else {
      setSignupPasswordStrength(null);
    }
  }, [signupPassword]);

  // Handle signup form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Debug: Start signup
    console.log('[SignUp] Submit triggered');
    const errors = {};
    if (!signupName.trim()) {
      errors.signupName = 'Full name is required';
      console.log('[SignUp] Validation error: Full name missing');
    }
    if (!signupEmail.trim()) {
      errors.signupEmail = 'Email is required';
      console.log('[SignUp] Validation error: Email missing');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(signupEmail)) {
      errors.signupEmail = 'Invalid email address';
      console.log('[SignUp] Validation error: Invalid email');
    }
    if (!signupLocation) {
      errors.signupLocation = 'Location is required';
      console.log('[SignUp] Validation error: Location missing');
    }
    if (!signupGender) {
      errors.signupGender = 'Gender is required';
      console.log('[SignUp] Validation error: Gender missing');
    }
    if (!signupPassword) {
      errors.signupPassword = 'Password is required';
      console.log('[SignUp] Validation error: Password missing');
    } else if (signupPassword.length < 6) {
      errors.signupPassword = 'Password must be at least 6 characters';
      console.log('[SignUp] Validation error: Password too short');
    }
    if (signupPassword !== signupConfirmPassword) {
      errors.signupConfirmPassword = 'Passwords do not match';
      console.log('[SignUp] Validation error: Passwords do not match');
    }
    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
      console.log('[SignUp] Validation error: Terms not agreed');
    }
    if (!signupCaptchaToken) {
      errors.signupCaptcha = 'Please complete the captcha';
      console.log('[SignUp] Validation error: Captcha not completed');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.log('[SignUp] Validation failed', errors);
      return;
    }
    // Send signup data to backend to trigger code
    dispatch(registerStart());
    try {
      const res = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          location: signupLocation,
          gender: signupGender
        })
      });
      const data = await res.json();
      if (data.success) {
        setSignupStep(2); // Move to step 2 (verification)
      } else {
        setFormErrors({ signupEmail: data.error || 'Failed to send verification code.' });
      }
    } catch (error) {
      setFormErrors({ signupEmail: 'Server error. Please try again.' });
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

  const [pageContent, setPageContent] = useState(null);

  useEffect(() => {
    fetch('/api/login-page-content')
      .then(res => res.json())
      .then(setPageContent);
  }, []);

  if (!pageContent) return <div>Loading...</div>;


  return (
    <>
      {/* <Navbar /> removed: duplicate with tabs VAnsar, About, Projects, Contact, Login */}
      <div 
        className="min-h-screen w-full bg-gradient-to-br from-green-50 via-gray-50 to-blue-50 flex items-center justify-center pt-32 px-4 sm:px-6 lg:px-8 relative"
        style={{ minHeight: '100vh', paddingTop: '8rem' }}
      >
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-b from-primary-50 to-transparent opacity-30 pointer-events-none" />
        <div className="absolute top-24 left-8 w-48 h-48 rounded-full bg-primary-100 opacity-20 pointer-events-none animate-pulse" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-12 right-12 w-64 h-64 rounded-full bg-blue-100 opacity-20 pointer-events-none animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}} />
          
          {/* Main content container - 2 columns on large screens */}
        {/* ...existing code... */}
        {/* Progress steps inside main parent container */}
        {/* ...existing code... */}
        {/* Removed duplicate verification window. Only one verification UI will be rendered below in the right panel form. */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left side panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center w-full lg:col-span-2"
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
                    {pageContent?.leftPanel?.orgName
                      ? pageContent.leftPanel.orgName.split(' ').map((word, i, arr) =>
                          i === arr.length - 1 ? (
                            <span key={i} className="text-primary-600">{word}</span>
                          ) : (
                            <span key={i}>{word} </span>
                          )
                        )
                      : null}
                  </h1>
                  {pageContent?.leftPanel?.orgTagline && (
                    <p className="text-sm text-gray-500 mt-1 italic">{pageContent.leftPanel.orgTagline}</p>
                  )}
                </div>
              </div>

              {pageContent?.leftPanel?.mainTitle && (
                <h2 className="text-3xl font-bold text-gray-800 mb-5 leading-tight">
                  {pageContent.leftPanel.mainTitle}
                </h2>
              )}
              
              {pageContent?.leftPanel?.mainDescription && (
                <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg">
                  {pageContent.leftPanel.mainDescription}
                </p>
              )}

              <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-100 group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary-50 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {pageContent?.leftPanel?.whyChoose?.title && (
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                    <FaRegCheckCircle className="text-primary-600 mr-3" />
                    {pageContent.leftPanel.whyChoose.title}
                  </h3>
                )}
                
                {Array.isArray(pageContent?.leftPanel?.whyChoose?.reasons) && pageContent.leftPanel.whyChoose.reasons.length > 0 && (
                  <ul className="space-y-4">
                    {pageContent.leftPanel.whyChoose.reasons.map((feature, idx) => (
                      <li key={idx} className="flex items-start transform transition-transform hover:translate-x-1">
                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-3 mt-0.5">
                          {feature.icon === 'FaLeaf' ? <FaLeaf className="h-3 w-3" /> : 
                           feature.icon === 'FaGlobe' ? <FaGlobe className="h-3 w-3" /> : 
                           <FaShieldAlt className="h-3 w-3" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {Array.isArray(pageContent?.leftPanel?.stats) && pageContent.leftPanel.stats.length > 0 && (
                <div className="flex space-x-4">
                  {pageContent.leftPanel.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow duration-300 relative overflow-hidden hover:border-primary-100">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100 rounded-full -mt-8 -mr-8 opacity-30"></div>
                      <div className="text-primary-600 mb-2 bg-primary-50 p-2 rounded-full">
                        {stat.icon === 'FaHeart' ? <FaHeart className="h-5 w-5" /> : 
                         stat.icon === 'FaGlobe' ? <FaGlobe className="h-5 w-5" /> : 
                         <FaUser className="h-5 w-5" />}
                      </div>
                      <span className="text-xl font-semibold text-gray-700">{stat.value}</span>
                      <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Testimonial */}
              {pageContent?.leftPanel?.testimonial && (
                <div className="mt-8 bg-white rounded-xl shadow-md p-5 border border-gray-100 relative hover:shadow-lg transition-all duration-300 hover:border-primary-100 group">
                  <div className="absolute -top-3 -left-3 text-primary-600 bg-primary-100 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-primary-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="text-sm italic text-gray-600 pl-4">
                    {pageContent.leftPanel.testimonial.quote}
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs font-medium text-gray-800">{pageContent.leftPanel.testimonial.author}</p>
                      <p className="text-xs text-gray-500">{pageContent.leftPanel.testimonial.meta}</p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          
          {/* Right side form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:col-span-3"
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
                {/* Form header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-8 px-6 text-white relative overflow-hidden">
                <motion.h2 
                  className="text-3xl font-bold relative z-10"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {authMethod === 'signup' ? pageContent.signupForm?.signUpTitle : pageContent.heading}
                </motion.h2>
                <motion.p 
                  className="text-md text-primary-100 relative z-10 mt-2 max-w-md"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {authMethod === 'signup' 
                    ? pageContent.signupForm?.signUpSubheading
                    : pageContent.subheading}
                </motion.p>
        </div>
        
                {/* Form content */}
              <div className="p-8 relative z-10">
                {error && <ErrorAlert message={error} className="mb-6" />}
                {/* Show more detailed error feedback */}
                {formErrors.general && (
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-semibold">
                    {formErrors.general}
                  </div>
                )}
                
                {/* Authentication method tabs */}
                <div className="flex rounded-lg border border-gray-200 mb-8 p-1 bg-gray-50 shadow-sm relative">
                  <div 
                    className="absolute inset-y-1 rounded-md transition-all duration-300 z-0 shadow-sm bg-white" 
                    style={{ 
                      left: authMethod === 'email' ? '0%' : authMethod === 'mobile' ? '33.333%' : '66.666%', 
                      width: '33.333%' 
                    }}
                  />
                  {(Array.isArray(pageContent?.tabs) ? pageContent.tabs : []).map((tab, idx) => (
                    <button
                      key={tab.key}
                      className={`flex-1 py-3 text-center font-medium text-sm rounded-md flex items-center justify-center transition-all duration-300 z-10 relative ${
                        authMethod === tab.key 
                          ? 'text-primary-700' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setAuthMethod(tab.key)}
                    >
                      <motion.div
                        animate={authMethod === tab.key ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mr-2"
                      >
                        {tab.icon === 'FaEnvelope' && <FaEnvelope className={authMethod === tab.key ? "text-primary-600" : ""} />}
                        {tab.icon === 'FaMobileAlt' && <FaMobileAlt className={authMethod === tab.key ? "text-primary-600" : ""} />}
                        {tab.icon === 'FaUserPlus' && <FaUserPlus className={authMethod === tab.key ? "text-primary-600" : ""} />}
                      </motion.div>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
                
                  {/* Form fields */}
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
                        {/* Email field */}
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {pageContent.emailForm.emailLabel}
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
                            placeholder={pageContent.emailForm.emailPlaceholder}
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

                        {/* Password field */}
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            {pageContent.emailForm.passwordLabel}
                          </label>
                          <div className="text-sm">
                            <button
                              type="button"
                              onClick={() => setShowPassword(true)}
                              className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                            >
                              {pageContent.emailForm.forgotPassword}
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
                            placeholder={pageContent.emailForm.passwordPlaceholder}
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
          
                        {/* Remember me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all duration-200 cursor-pointer"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                {pageContent.emailForm.rememberMe}
              </label>
            </div>

            {/* Google reCAPTCHA for sign in */}
            <div className="flex flex-col items-center pt-2">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={token => {
                  setCaptchaToken(token);
                  console.log('[SignIn] Captcha completed', token);
                }}
              />
              {formErrors.captcha && (
                <p className="text-sm text-red-600 mt-2">{formErrors.captcha}</p>
              )}
            </div>
            
                        {/* Submit button */}
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
                              {pageContent.emailForm.signInButton}
                            </>
                          )}
                        </motion.button>
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
                        {/* Mobile form content */}
                      <div className="space-y-4">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-1">{pageContent.mobileForm.mobileLabel}</label>
                          <div className="flex shadow-sm rounded-md overflow-hidden">
                            <div className="relative">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="appearance-none block w-full pl-3 pr-8 py-3 border border-gray-300 rounded-l-md bg-white text-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200"
                              >
                                {(Array.isArray(countryCodes) ? countryCodes : []).map(country => (
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
                              placeholder={pageContent.mobileForm.mobilePlaceholder}
                              required
                            />
                          </div>
                          {formErrors.mobile && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">{pageContent.mobileForm.countryCodeLabel}</p>
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
                                <h3 className="text-sm font-medium text-primary-800">{pageContent.mobileForm.verificationLabel} {pageContent.mobileForm.sentText || ''}</h3>
                                <p className="text-xs text-primary-700 mt-1">
                                  {pageContent.mobileForm.verificationSentText ? pageContent.mobileForm.verificationSentText.replace('{countryCode}', countryCode).replace('{mobile}', mobile) : `A verification code has been sent to ${countryCode} ${mobile}`}
                                </p>
            </div>
                            </div>
                            <Input
                              label={pageContent.mobileForm.verificationLabel}
                              type="text"
                              value={mobileCode}
                              onChange={(e) => setMobileCode(e.target.value.replace(/\D/g, ''))}
                              placeholder={pageContent.mobileForm.verificationPlaceholder}
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
                            {pageContent.mobileForm.sendCodeButton}
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
                              {pageContent.mobileForm.resendCode}
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
                              {pageContent.mobileForm.verifyButton}
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
                        {/* Signup form content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full name field */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{pageContent.signupForm.nameLabel}</label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                                placeholder={pageContent.signupForm.namePlaceholder}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm placeholder:text-xs placeholder:pl-1"
                                required
                              />
                            </div>
                            {formErrors.signupName && (
                              <p className="text-sm text-red-600 mt-1">{formErrors.signupName}</p>
                            )}
                          </div>
                        </motion.div>

                        {/* Email field */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{pageContent.signupForm.emailLabel}</label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                placeholder={pageContent.signupForm.emailPlaceholder}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm placeholder:text-xs placeholder:pl-1"
                                required
                              />
                            </div>
                            {formErrors.signupEmail && (
                              <p className="text-sm text-red-600 mt-1">{formErrors.signupEmail}</p>
                            )}
                          </div>
                        </motion.div>

                        {/* Location select */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.25 }}
                        >
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Region / Town</label>
                            <select
                              value={signupLocation}
                              onChange={e => setSignupLocation(e.target.value)}
                              className="block w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-gray-50 hover:bg-white text-sm"
                              required
                            >
                              <option value="">Select a region or town...</option>
                              {(Array.isArray(somaliRegions) ? somaliRegions : []).map(group => (
                                <optgroup key={group.group} label={group.group}>
                                  {(Array.isArray(group?.regions) ? group.regions : []).map(region => (
                                    <option key={group.group + '-' + region} value={region}>{region}</option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                            {formErrors.signupLocation && (
                              <p className="text-sm text-red-600 mt-1">{formErrors.signupLocation}</p>
                            )}
                          </div>
                        </motion.div>

                        {/* Password field with strength meter */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{pageContent.signupForm.passwordLabel}</label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type={showSignupPassword ? "text" : "password"}
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                placeholder={pageContent.signupForm.passwordPlaceholder}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm placeholder:text-xs placeholder:pl-1"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                  type="button"
                                  tabIndex={-1}
                                  onClick={() => setShowSignupPassword((v) => !v)}
                                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                  {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                            </div>
                            {/* Password strength meter */}
                            {signupPassword && signupPasswordStrength && (
                              <div className="mt-2">
                                <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                                  <div
                                    className={`h-2 rounded transition-all duration-300 ${
                                      signupPasswordStrength.score === 0 ? 'bg-red-400 w-1/5' :
                                      signupPasswordStrength.score === 1 ? 'bg-orange-400 w-2/5' :
                                      signupPasswordStrength.score === 2 ? 'bg-yellow-400 w-3/5' :
                                      signupPasswordStrength.score === 3 ? 'bg-green-400 w-4/5' :
                                      'bg-green-600 w-full'
                                    }`}
                                  ></div>
                                </div>
                                <p className="text-xs mt-1 font-medium text-gray-600">
                                  {['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][signupPasswordStrength.score]}
                                </p>
                              </div>
                            )}
                            {formErrors.signupPassword && (
                              <p className="text-sm text-red-600 mt-1">{formErrors.signupPassword}</p>
                            )}
                          </div>
                        </motion.div>

                      {/* Confirm password and gender in the same row */}
                      <div className="md:col-span-2 flex flex-col md:flex-row md:items-end gap-4">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="flex-1"
                        >
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{pageContent.signupForm.confirmPasswordLabel}</label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type={showSignupConfirmPassword ? "text" : "password"}
                                value={signupConfirmPassword}
                                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                placeholder={pageContent.signupForm.confirmPasswordPlaceholder}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm placeholder:text-xs placeholder:pl-1"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                  type="button"
                                  tabIndex={-1}
                                  onClick={() => setShowSignupConfirmPassword((v) => !v)}
                                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                  {showSignupConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                            </div>
                            {formErrors.signupConfirmPassword && (
                              <p className="text-sm text-red-600 mt-1">{formErrors.signupConfirmPassword}</p>
                            )}
                          </div>
                        </motion.div>
                            
                            {/* Gender field */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.45 }}
                          className="flex flex-col items-start mb-1"
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-1">Gender</label>
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              className={`px-5 py-2 rounded-full border-2 text-sm font-medium focus:outline-none transition-colors duration-200 ${signupGender === 'male' ? 'bg-primary-100/60 border-primary-600 text-primary-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-primary-50'}`}
                              onClick={() => setSignupGender('male')}
                              aria-pressed={signupGender === 'male'}
                            >
                              Male
                            </button>
                            <button
                              type="button"
                              className={`px-5 py-2 rounded-full border-2 text-sm font-medium focus:outline-none transition-colors duration-200 ${signupGender === 'female' ? 'bg-primary-100/60 border-primary-600 text-primary-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-primary-50'}`}
                              onClick={() => setSignupGender('female')}
                              aria-pressed={signupGender === 'female'}
                            >
                              Female
                            </button>
                          </div>
                          {formErrors.signupGender && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.signupGender}</p>
                          )}
                        </motion.div>
                      </div>
                        
                          {/* Terms and conditions */}
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
                            {(typeof pageContent?.signupForm?.agreeTerms === 'string' ? pageContent.signupForm.agreeTerms.split('Terms of Service') : []).map((part, idx, arr) => idx < arr.length - 1 ? <>{part}<Link to="/terms-of-service" className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">Terms of Service</Link></> : part)}
                          </label>
                        </motion.div>
                        {formErrors.agreeTerms && (
                          <p className="text-sm text-red-600 mt-1 md:col-span-2">{formErrors.agreeTerms}</p>
                        )}
          </div>
          
                        {/* Google reCAPTCHA */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.55 }}
                          className="md:col-span-2 flex flex-col items-center pt-2"
                        >
                          <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={token => {
                              setSignupCaptchaToken(token);
                              console.log('[SignUp] Captcha completed', token);
                            }}
                          />
                          {formErrors.signupCaptcha && (
                            <p className="text-sm text-red-600 mt-2">{formErrors.signupCaptcha}</p>
                          )}
                        </motion.div>
                        {/* Progress steps: signup, verification, success. Only one visible at a time. */}
                        {/* Progress steps visual indicator */}
                        <ProgressSteps currentStep={signupStep} />

                        {/* Only one step visible at a time */}
                        {signupStep === 1 && (
                          <motion.div
                            key="signup-step"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ delay: 0.6 }}
                            className="pt-2"
                          >
                            <button
                              type="submit"
                              className="flex items-center justify-center w-full py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                              disabled={loading}
                            >
                              {loading ? (pageContent.signupForm.signUpButtonLoading || 'Creating Account...') : 'Next'}
                              {!loading && <FaArrowRight className="ml-2" />}
                            </button>
                          </motion.div>
                        )}
                        {signupStep === 2 && (
                          <motion.div
                            key="verification-step"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ delay: 0.6 }}
                            className="pt-2"
                          >
                            <div className="bg-white rounded-xl border border-gray-100 p-6 w-full flex flex-col items-center">
                              <div className="flex items-center mb-4">
                                <FaEnvelope className="text-primary-600 text-2xl mr-2" />
                                <h2 className="text-lg font-bold">Verify your email</h2>
                              </div>
                              <p className="text-gray-600 mb-4 text-center">A 6-digit verification code has been sent to <span className="font-semibold">{signupEmail}</span>. Please enter the code below to complete your registration.</p>
                              <form className="flex flex-col gap-4 items-center w-full" onSubmit={async (e) => {
                                e.preventDefault();
                                if (!verificationCode || verificationCode.length !== 6) {
                                  setFormErrors({ verificationCode: 'Please enter the 6-digit code.' });
                                  return;
                                }
                                // Call backend to verify code
                                try {
                                  const res = await fetch('/api/verify-code', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ email: signupEmail, code: verificationCode })
                                  });
                                  let data;
                                  try {
                                    data = await res.json();
                                  } catch (jsonErr) {
                                    setFormErrors({ verificationCode: 'Unexpected server response.' });
                                    return;
                                  }
                                  if (data && typeof data.success !== 'undefined' && data.success === true) {
                                    // Clear all signup form fields
                                    setSignupName('');
                                    setSignupPassword('');
                                    setSignupConfirmPassword('');
                                    setSignupLocation('');
                                    setSignupGender('');
                                    setAgreeTerms(false);
                                    setSignupCaptchaToken(null);
                                    setVerificationCode('');
                                    setFormErrors({});
                                    setSignupStep(3); // Success step
                                  } else if (data && typeof data.error === 'string') {
                                    setFormErrors({ verificationCode: data.error });
                                  } else {
                                    setFormErrors({ verificationCode: 'Unknown error. Please try again.' });
                                  }
                                } catch (err) {
                                  setFormErrors({ verificationCode: 'Server error. Please try again.' });
                                }
                              }}>
                                <input
                                  type="text"
                                  maxLength={6}
                                  pattern="\d{6}"
                                  value={verificationCode || ''}
                                  onChange={e => {
                                    setVerificationCode(e.target.value.replace(/\D/g, ''));
                                    setFormErrors({});
                                  }}
                                  placeholder="Enter 6-digit code"
                                  className="block w-48 text-center py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-lg font-mono tracking-widest"
                                  required
                                />
                                {formErrors.verificationCode && typeof formErrors.verificationCode === 'string' && (
                                  <p className="text-sm text-red-600 mt-1">{formErrors.verificationCode}</p>
                                )}
                                <button
                                  type="submit"
                                  className="px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-200"
                                >
                                  Verify & Complete Signup
                                </button>
                              </form>
                              <button
                                type="button"
                                className="mt-4 px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors duration-200"
                                onClick={async () => {
                                  // Call backend to resend code
                                  try {
                                    const res = await fetch('/api/send-verification-code', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({
                                        name: signupName,
                                        email: signupEmail,
                                        password: signupPassword,
                                        location: signupLocation,
                                        gender: signupGender
                                      })
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                      alert('Verification code resent to your email.');
                                    } else {
                                      alert(typeof data.error === 'string' ? data.error : 'Failed to resend code.');
                                    }
                                  } catch (err) {
                                    alert('Server error. Please try again.');
                                  }
                                }}
                              >
                                Resend verification code
                              </button>
                              <button
                                type="button"
                                className="mt-2 px-6 py-2 rounded-lg bg-gray-200 text-primary-700 font-medium hover:bg-gray-300 transition-colors duration-200"
                                onClick={() => setSignupStep(1)}
                              >
                                Back to Signup
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* Show success as a temporary popup/modal, always rendered as overlay */}
                        {signupStep === 3 && (
                          <motion.div
                            key="success-popup"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                          >
                            <div className="bg-white rounded-xl border border-gray-100 p-8 flex flex-col items-center shadow-2xl min-w-[320px]">
                              <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                              <h2 className="text-xl font-bold mb-2">Signup Successful!</h2>
                              <p className="text-gray-700 mb-4 text-center">Your account has been verified and created.<br />Redirecting to login...</p>
                            </div>
                          </motion.div>
                        )}
                    </motion.form>
                  )}
                </AnimatePresence>
                
                  {/* Social login section */}
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
                      <span className="px-4 bg-white text-gray-500 font-medium">{pageContent.orContinueWith}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {/* Google Login Button */}
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                      <GoogleLogin
                        onSuccess={async credentialResponse => {
                          try {
                            // Send credential to backend for authentication
                            const result = await loginWithGoogle({ credential: credentialResponse.credential }).unwrap();
                            dispatch(loginSuccess(result));
                            // Persist login state for Google login
                            if (result?.token) {
                              localStorage.setItem('authToken', result.token);
                              localStorage.setItem('user', JSON.stringify(result.user));
                            }
                            navigate('/profile');
                          } catch (error) {
                            dispatch(loginFailure(error?.data?.message || 'Google login failed.'));
                          }
                        }}
                        onError={() => {
                          dispatch(loginFailure('Google login failed.'));
                        }}
                        shape="rect"
                        theme="outline"
                        size="large"
                        text="continue_with"
                        width="100%"
                      />
                    </GoogleOAuthProvider>
                    {/* ...existing code for other social logins... */}
                  </div>
                </motion.div>
                
                {/* Footer links */}
                <motion.div 
                  className="mt-6 pt-5 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between">
                    {authMethod === 'signup' ? (
                      <p className="text-sm text-gray-600">
                        {(typeof pageContent?.signupForm?.alreadyHaveAccount === 'string' ? pageContent.signupForm.alreadyHaveAccount.split('Sign in') : []).map((part, idx, arr) => idx < arr.length - 1 ? <>{part}<button type="button" onClick={() => setAuthMethod('email')} className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">Sign in</button></> : part)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">
                        {(typeof pageContent?.emailForm?.dontHaveAccountText === 'string' ? pageContent.emailForm.dontHaveAccountText.split('Sign up now') : []).map((part, idx, arr) => idx < arr.length - 1 ? <>{part}<button type="button" onClick={() => setAuthMethod('signup')} className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">Sign up now</button></> : part)}
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
                      {pageContent.helpText?.title || 'Help'}
                    </motion.button>
                  </div>
                </motion.div>

              {/* Secure Login & Donation section (dynamic from DB) */}
          {/* Security features section moved outside the right panel, just below it */}
          {pageContent?.securityFeatures && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="mt-8 bg-white rounded-xl shadow-md px-6 py-5 border border-gray-100 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary-100 group lg:col-span-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary-50 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="flex items-center text-gray-700">
                <div className="bg-primary-50 p-3 rounded-full mr-4 shadow-sm relative">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-primary-100"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  ></motion.div>
                  <FaShieldAlt className="text-primary-600 relative z-10" />
                </div>
                <div>
                  <span className="font-medium block">{pageContent.securityFeatures.title}</span>
                  <span className="text-xs text-gray-500">{pageContent.securityFeatures.desc}</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {Array.isArray(pageContent.securityFeatures.features) && pageContent.securityFeatures.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                    <FaRegCheckCircle className="text-green-500 mr-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
              </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </div>
      <Footer className="bg-transparent" />
    </>
  );
};

export default Login;