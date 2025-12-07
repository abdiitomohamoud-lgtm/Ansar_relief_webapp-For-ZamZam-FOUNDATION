import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../store/slices/appSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaUsers, FaHandHoldingHeart, FaClock, FaBriefcase } from 'react-icons/fa';
import volunteerPageData from '../data/volunteerPageData.json';
import volunteers from '../data/volunteers.json';

const Volunteer = () => {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    availability: [],
    interests: [],
    skills: '',
    experience: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prevData => ({
        ...prevData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
        country: user.country || '',
      }));
    }
  }, [isAuthenticated, user]);
  
  // Using mock data directly, no API calls needed

  // Dynamic options from API data
  const availabilityOptions = volunteerPageData?.formSection?.steps?.find(s => s.title === 'Interests & Availability')?.fields?.find(f => f.name === 'availability')?.options?.map(opt => ({ id: opt.toLowerCase().replace(/\s+/g, '-'), label: opt })) || [];
  const interestOptions = volunteerPageData?.formSection?.steps?.find(s => s.title === 'Interests & Availability')?.fields?.find(f => f.name === 'interests')?.options?.map(opt => ({ id: opt.toLowerCase().replace(/\s+/g, '-'), label: opt })) || [];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [type]: [...formData[type], value],
      });
    } else {
      setFormData({
        ...formData,
        [type]: formData[type].filter(item => item !== value),
      });
    }
  };
  
  const validateStep = (currentStep) => {
    const { firstName, lastName, email, phone, availability, interests, skills, experience } = formData;
    if (currentStep === 1) {
      if (!firstName || !lastName || !email || !phone) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please fill in all required fields',
        }));
        return false;
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please enter a valid email address',
        }));
        return false;
      }
      return true;
    }
    if (currentStep === 2) {
      if (availability.length === 0) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please select at least one availability option',
        }));
        return false;
      }
      if (interests.length === 0) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please select at least one area of interest',
        }));
        return false;
      }
      return true;
    }
    if (currentStep === 3) {
      if (!skills.trim() && !experience.trim()) {
        dispatch(addNotification({
          type: 'error',
          message: 'Please provide at least one skill or some experience.',
        }));
        return false;
      }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(prev => Math.min(prev + 1, totalSteps));
        window.scrollTo({ top: document.getElementById('volunteer-form')?.offsetTop - 100, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) {
      return;
    }
    setLoading(true);
    
    // Using mock data, no actual API call needed
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful submission
      setSubmitted(true);
      dispatch(addNotification({
        type: 'success',
        message: 'Thank you for your interest in volunteering! We will contact you soon.',
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      }));
    } finally {
      setLoading(false);
    }
  };
  
  // Step titles for the progress bar
  const stepTitles = (volunteerPageData?.formSection?.steps || []).map(s => s.title) || [
    "Personal Info",
    "Interests & Availability",
    "Skills & Experience"
  ];

  // Function to render the appropriate step
  const renderStep = () => {
    switch(step) {
      case 1:
  return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500">*</span>
                          </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                      className="block w-full pr-10 focus:ring-primary-500 focus:border-primary-500 pl-3 py-3 sm:text-sm border-gray-300 rounded-lg transition-all"
                      placeholder="John"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                      className="block w-full pr-10 focus:ring-primary-500 focus:border-primary-500 pl-3 py-3 sm:text-sm border-gray-300 rounded-lg transition-all"
                      placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>
                      
              <div className="mt-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                    className="block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="johndoe@example.com"
                          />
                        </div>
                      </div>
                      
              <div className="mt-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                    className="block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="+1 (555) 987-6543"
                          />
                        </div>
                      </div>
                      
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mt-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              value={formData.city}
                              onChange={handleChange}
                      className="block w-full pr-10 focus:ring-primary-500 focus:border-primary-500 pl-3 py-3 sm:text-sm border-gray-300 rounded-lg transition-all"
                      placeholder="New York"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="country"
                              id="country"
                              value={formData.country}
                              onChange={handleChange}
                      className="block w-full pr-10 focus:ring-primary-500 focus:border-primary-500 pl-3 py-3 sm:text-sm border-gray-300 rounded-lg transition-all"
                      placeholder="United States"
                            />
                          </div>
                        </div>
                      </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                        <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-3">
                  When are you available to volunteer? <span className="text-red-500">*</span>
                          </legend>
                <div className="flex flex-col gap-4">
                  {availabilityOptions.map((option) => (
                    <motion.div 
                      key={option.id} 
                      className={`relative rounded-xl border-2 shadow-md ${
                        formData.availability.includes(option.id)
                          ? 'bg-primary-100 border-primary-400 ring-2 ring-primary-500'
                          : 'border-gray-200 hover:bg-gray-50'
                      } p-2 flex flex-col items-start cursor-pointer min-h-[44px]`}
                      onClick={() => {
                        const e = { 
                          target: { 
                            value: option.id, 
                            checked: !formData.availability.includes(option.id) 
                          } 
                        };
                        handleCheckboxChange(e, 'availability');
                      }}
                      // No transform or scale effects
                    >
                      <div className="flex items-center mb-1">
                        <input
                          id={option.id}
                          name={option.id}
                          type="checkbox"
                          value={option.id}
                          checked={formData.availability.includes(option.id)}
                          onChange={(e) => handleCheckboxChange(e, 'availability')}
                          className="focus:ring-primary-500 h-8 w-8 text-primary-600 border-gray-400 rounded-xl accent-primary-600 transition-all duration-200"
                        />
                        <label htmlFor={option.id} className="ml-4 text-base font-normal text-gray-900 select-none cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                      {formData.availability.includes(option.id) && (
                        <div className="absolute top-2 right-2">
                          <svg className="h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <legend className="text-sm font-medium text-gray-700 mb-3 mt-6">
                  What volunteer roles interest you? <span className="text-red-500">*</span>
                          </legend>
                <div className="flex flex-col gap-4 mt-2">
                            {interestOptions.map((option) => (
                    <motion.div 
                      key={option.id} 
                      className={`relative rounded-xl border-2 shadow-md ${
                        formData.interests.includes(option.id)
                          ? 'bg-primary-100 border-primary-400 ring-2 ring-primary-500'
                          : 'border-gray-200 hover:bg-gray-50'
                      } p-2 flex flex-col items-start cursor-pointer min-h-[44px]`}
                      onClick={() => {
                        const e = { 
                          target: { 
                            value: option.id, 
                            checked: !formData.interests.includes(option.id) 
                          } 
                        };
                        handleCheckboxChange(e, 'interests');
                      }}
                      // No transform or scale effects
                    >
                      <div className="flex items-center mb-1">
                        <input
                          id={option.id}
                          name={option.id}
                          type="checkbox"
                          value={option.id}
                          checked={formData.interests.includes(option.id)}
                          onChange={(e) => handleCheckboxChange(e, 'interests')}
                          className="focus:ring-primary-500 h-8 w-8 text-primary-600 border-gray-400 rounded-xl accent-primary-600 transition-all duration-200"
                        />
                        <label htmlFor={option.id} className="ml-4 text-sm font-normal text-gray-900 select-none cursor-pointer">
                          {option.label}
                        </label>
                      </div>
                      {formData.interests.includes(option.id) && (
                        <div className="absolute top-2 right-2">
                          <svg className="h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </motion.div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-gray-50">
                <label htmlFor="skills" className="block text-base font-semibold text-primary-700 mb-2">
                  Special Skills or Qualifications
                </label>
                <div className="mt-1">
                  <textarea
                    id="skills"
                    name="skills"
                    rows={4}
                    value={formData.skills}
                    onChange={handleChange}
                    className="transition-all duration-200 block w-full text-base border-2 border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl bg-white px-4 py-3 shadow-md placeholder-gray-400 resize-none"
                    placeholder="List any special skills, certifications, or qualifications you have."
                  />
                </div>
                      </div>
                      
              <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-gray-50">
                <label htmlFor="experience" className="block text-base font-semibold text-primary-700 mb-2">
                  Previous Volunteer Experience
                </label>
                <div className="mt-1">
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={handleChange}
                    className="transition-all duration-200 block w-full text-base border-2 border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 rounded-xl bg-white px-4 py-3 shadow-md placeholder-gray-400 resize-none"
                    placeholder="Describe any previous volunteer experience you have."
                  />
                </div>
                        </div>
                      </div>
                      
            <motion.div 
              className="rounded-lg bg-primary-50 p-5 border border-primary-100 shadow-inner"
              whileHover={{ scale: 1.01 }}
            >
                        <div className="flex">
                          <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-primary-700">
                              All volunteer applications will be reviewed by our team. We'll contact you within 3-5 business days.
                            </p>
                          </div>
                        </div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-800 to-primary-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex mb-6 items-center justify-center p-2 bg-primary-700 bg-opacity-50 backdrop-blur-sm rounded-lg border border-primary-600 shadow-lg">
              <FaHandsHelping className="mr-2 text-primary-200" />
              <span className="text-sm font-medium text-primary-200 uppercase tracking-wider">Join our community</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              <span className="block">
                {volunteerPageData.hero?.heading || 'Make a Difference'}
              </span>
              <span className="block text-primary-300 mt-1">
                {volunteerPageData.hero?.subheading || 'Volunteer With Us'}
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
              {volunteerPageData.hero?.quote?.text || '"The best of people are those who are most beneficial to people."'}
              <span className="block italic mt-1 text-primary-200 text-lg">{volunteerPageData.hero?.quote?.author || '- Prophet Muhammad (ﷺ)'}</span>
            </p>
            
            <div className="mt-10 flex justify-center">
              {(volunteerPageData.hero?.cta || ['Apply Now', 'Learn More']).map((cta, idx) => (
                <a
                  key={cta}
                  href={idx === 0 ? '#volunteer-form' : '#volunteer-programs'}
                  className={`px-8 py-3 border ${idx === 0 ? 'border-transparent text-primary-900 bg-white hover:bg-primary-50 shadow-md' : 'ml-4 border-white border-opacity-30 text-white bg-transparent hover:bg-primary-800'} rounded-md text-base font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                >
                  {cta}
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Stats */}
          <div className="mt-16 lg:mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {(volunteerPageData.statsSection?.stats || []).map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-5 text-center border border-white border-opacity-20"
              >
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-primary-200 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto" fill="#f9fafb">
            <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      {/* Testimonials Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Information Section */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <div className="px-6 py-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <span className="bg-primary-100 p-2 rounded-full mr-3">
                    <FaHandHoldingHeart className="text-primary-600 text-xl" />
                  </span>
                  {volunteerPageData.infoSection?.heading || 'Why Volunteer With Us?' }
                </h2>
                <div className="mt-6 prose prose-primary text-gray-600 max-w-none">
                  <p className="text-lg">
                    {volunteerPageData.infoSection?.description || 'Volunteering with our organization offers a meaningful way to give back to the community and make a tangible difference in people\'s lives. When you volunteer with us, you\'re not just giving your time – you\'re helping to build stronger communities and spread hope to those who need it most.'}
                  </p>
                  
                  <h3 id="volunteer-programs" className="mt-10 text-2xl font-bold text-gray-900 flex items-center">
                    <span className="bg-primary-100 p-2 rounded-full mr-3">
                      <FaUsers className="text-primary-600 text-xl" />
                    </span>
                    {volunteerPageData.programsSection?.heading || 'Our Volunteer Programs'}
                  </h3>
                  
                  <div className="mt-8 space-y-6">
                    {((volunteerPageData.programsSection?.programs || [])
                      .slice(0, showAllPrograms ? undefined : 5)
                    ).map((program, idx) => {
                      return (
                        <motion.div 
                          key={program.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl shadow-sm border border-primary-100 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="bg-primary-100 p-3 rounded-full">
                                {/* Icon rendering can be improved if you want dynamic icons */}
                                <FaUsers className="text-primary-600 text-xl" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-xl font-semibold text-gray-900">{program.title}</h4>
                              <p className="mt-2 text-gray-600">{program.description}</p>
                              <div className="mt-3 flex items-center text-sm text-primary-600">
                                <span className="inline-flex items-center bg-primary-50 px-2 py-0.5 rounded text-xs font-medium">{program.demand}</span>
                                <span className="ml-2 inline-flex items-center bg-primary-50 px-2 py-0.5 rounded text-xs font-medium">{program.opportunity}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    {(volunteerPageData.programsSection?.programs?.length || 0) > 5 && (
                      <div className="flex justify-center mt-6">
                        <button
                          type="button"
                          className="px-6 py-2 rounded-md bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition"
                          onClick={() => setShowAllPrograms((prev) => !prev)}
                        >
                          {showAllPrograms ? 'Show Less' : 'Show All Programs'}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="mt-12 text-2xl font-bold text-gray-900 flex items-center">
                    <span className="bg-primary-100 p-2 rounded-full mr-3">
                      <FaBriefcase className="text-primary-600 text-xl" />
                    </span>
                    {volunteerPageData.benefitsSection?.heading || 'Benefits of Volunteering'}
                  </h3>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Make a meaningful difference</h4>
                        <p className="text-sm text-gray-600 mt-1">Create real impact in communities</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Develop new skills</h4>
                        <p className="text-sm text-gray-600 mt-1">Gain valuable experience and training</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Network with like-minded people</h4>
                        <p className="text-sm text-gray-600 mt-1">Connect with passionate individuals</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Spiritual rewards</h4>
                        <p className="text-sm text-gray-600 mt-1">Earn rewards in this life and the hereafter</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Career advancement</h4>
                        <p className="text-sm text-gray-600 mt-1">Boost your resume with meaningful experience</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Volunteer Form Section */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              id="volunteer-form"
              className="bg-white shadow-xl rounded-xl overflow-hidden sticky top-24"
            >
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-6 text-white">
                <h2 className="text-2xl font-bold flex items-center">
                  <FaHandsHelping className="mr-3 text-primary-200" />
                  Volunteer Application
                </h2>
                <p className="mt-2 text-primary-100">Join our community of volunteers making a difference</p>
              </div>
              
              <div className="px-6 py-8">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                      <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {/* Only render dynamic heading from backend data */}
                    <h3 className="mt-6 text-2xl font-bold text-gray-900">{volunteerPageData.formSection?.completion?.heading || 'Application Submitted!'}</h3>
                    <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
                      {volunteerPageData.formSection?.completion?.description || 'Thank you for your interest in volunteering with us. Our volunteer coordinator will contact you within 3-5 business days.'}
                    </p>
                    <div className="mt-8">
                        <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        {stepTitles.map((title, index) => (
                          <div 
                            key={index} 
                            className={`text-xs font-medium ${index + 1 === step ? 'text-primary-600' : index + 1 < step ? 'text-green-600' : 'text-gray-500'}`}
                          >
                            {title}
                          </div>
                        ))}
                      </div>
                      <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
                        {stepTitles.map((_, index) => (
                          <motion.div
                            key={index}
                            initial={{ width: '0%' }}
                            animate={{ 
                              width: index + 1 <= step ? `${100 / stepTitles.length}%` : '0%',
                              backgroundColor: index + 1 < step ? '#10B981' : '#4F46E5'
                            }}
                            className={`flex flex-col justify-center rounded ${index + 1 === step ? 'bg-primary-600' : index + 1 < step ? 'bg-green-500' : ''}`}
                          ></motion.div>
                        ))}
                      </div>
                    </div>
                    {/* Current Step Content */}
                    {renderStep()}
                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                      {step > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Back
                        </motion.button>
                      )}
                      {step < totalSteps ? (
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => {
                            if (validateStep(step)) {
                              setStep(step + 1);
                              window.scrollTo({ top: document.getElementById('volunteer-form')?.offsetTop - 100, behavior: 'smooth' });
                            }
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Next
                        </motion.button>
                      ) : null}
                      {step === totalSteps && (
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={loading ? true : false}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          {loading ? <LoadingSpinner size="sm" text="Submitting..." /> : 'Submit Application'}
                        </motion.button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What Our Volunteers Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from people who have experienced the joy of volunteering with us
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Sarah J." 
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Sarah J.</h4>
                  <p className="text-sm text-gray-600">Food Distribution Volunteer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Volunteering with Ansar has been one of the most rewarding experiences of my life. Seeing the smiles on people's faces when we deliver food packages is priceless."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg" 
                  alt="Ahmed K." 
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Ahmed K.</h4>
                  <p className="text-sm text-gray-600">Teaching Volunteer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I've been volunteering as an ESL teacher for 2 years now. The sense of community and the difference we make in people's lives keeps me coming back every week."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/67.jpg" 
                  alt="Fatima R." 
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Fatima R.</h4>
                  <p className="text-sm text-gray-600">Medical Services Volunteer</p>
              </div>
            </div>
              <p className="text-gray-700 italic">
                "Using my medical skills to help those who can't afford healthcare has been incredibly fulfilling. Ansar makes it easy to contribute in meaningful ways."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer; 