import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/slices/donationSlice';
import { addNotification } from '../../store/slices/appSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MosqueSupport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');
  
  const predefinedAmounts = [50, 100, 250, 500, 1000, 5000];
  
  // Dummy data for mosque projects - would be replaced with API fetch in real app
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProjects([
        {
          id: 'mosque-001',
          name: 'Al-Rahma Mosque Construction',
          location: 'Detroit, Michigan',
          description: 'Support the construction of a new mosque to serve the growing Muslim community in Detroit.',
          image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          goalAmount: 250000,
          raisedAmount: 125000,
          donorsCount: 352,
        },
        {
          id: 'mosque-002',
          name: 'Masjid Al-Noor Expansion',
          location: 'Phoenix, Arizona',
          description: 'Help expand the current Masjid Al-Noor with additional prayer spaces, classrooms, and a community center.',
          image: 'https://images.unsplash.com/photo-1585108718981-630868159454?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          goalAmount: 175000,
          raisedAmount: 87500,
          donorsCount: 213,
        },
        {
          id: 'mosque-003',
          name: 'Masjid Al-Huda Renovation',
          location: 'Chicago, Illinois',
          description: 'Support critical renovations for this 30-year-old mosque to repair the roof, HVAC system, and prayer hall.',
          image: 'https://images.unsplash.com/photo-1527506428567-98635df36787?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          goalAmount: 120000,
          raisedAmount: 42000,
          donorsCount: 187,
        },
        {
          id: 'mosque-004',
          name: 'Islamic Center Development',
          location: 'Austin, Texas',
          description: 'Help build a new Islamic center with a mosque, school, and community facilities to serve the growing Muslim population.',
          image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          goalAmount: 350000,
          raisedAmount: 175000,
          donorsCount: 428,
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount.toString());
    setCustomAmount(false);
  };
  
  const handleCustomAmountToggle = () => {
    setCustomAmount(true);
    setAmount('');
  };
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    // Scroll to donation form
    document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
  };
  
  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };
  
  const handleAddToCart = () => {
    // Validate amount before processing
    if (!amount || parseFloat(amount) <= 0) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please enter a valid donation amount',
      }));
      return;
    }
    
    const mosqueItem = {
      id: selectedProject ? selectedProject.id : 'mosque-general',
      type: 'Mosque Support',
      title: selectedProject 
        ? `${selectedProject.name} (${selectedProject.location})` 
        : 'General Mosque Support',
      description: selectedProject ? selectedProject.description : 'Supporting mosque construction and maintenance worldwide',
      amount: parseFloat(amount),
      isRecurring,
      frequency: isRecurring ? frequency : null,
      image: selectedProject?.image || null,
    };
    
    dispatch(addToCart(mosqueItem));
    dispatch(addNotification({
      type: 'success',
      message: 'Mosque donation added to cart',
    }));
    
    navigate('/cart');
  };
  
  const handleDonateNow = () => {
    handleAddToCart();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Mosque Construction & Support
            </h1>
            <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
              "Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise." - Prophet Muhammad (PBUH)
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Information Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Support Mosque Projects
              </h2>
              <div className="mt-4 prose prose-primary text-gray-500">
                <p>
                  Mosques are not merely places of worship; they serve as community centers, educational institutions, and beacons of Islamic values. By contributing to mosque construction and maintenance, you help provide essential spaces for Muslims to gather, pray, learn, and strengthen their faith.
                </p>
                
                <h3 className="mt-6 text-xl font-bold text-gray-900">Your Donation Provides</h3>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Construction materials and labor for new mosques</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Essential renovations for aging mosque infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Utilities and operational costs for existing mosques</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Educational facilities within mosque complexes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Community spaces for Islamic events and gatherings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Current Mosque Projects
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-12">
            {projects.map((project) => (
              <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 w-full relative">
                  <img
                    className="h-full w-full object-cover"
                    src={project.image}
                    alt={project.name}
                  />
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {project.name}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">{project.description}</p>
                  
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-primary-600">
                            {calculateProgress(project.raisedAmount, project.goalAmount).toFixed(1)}% Complete
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-primary-600">
                            ${project.raisedAmount.toLocaleString()} / ${project.goalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-100">
                        <div 
                          style={{ width: `${calculateProgress(project.raisedAmount, project.goalAmount)}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">{project.donorsCount} Donors</span>
                      <button
                        type="button"
                        onClick={() => handleProjectSelect(project)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Support This Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Donation Form */}
        <div id="donation-form" className="max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedProject 
                  ? `Support ${selectedProject.name}`
                  : 'General Mosque Support'
                }
              </h2>
              
              {selectedProject && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">
                    {selectedProject.description}
                  </p>
                  <div className="mt-3 flex items-center text-sm">
                    <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-500">{selectedProject.location}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Donation Type</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="one-time"
                        name="donation-type"
                        type="radio"
                        checked={!isRecurring}
                        onChange={() => setIsRecurring(false)}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <label htmlFor="one-time" className="ml-3 block text-sm font-medium text-gray-700">
                        One-time Donation
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="recurring"
                        name="donation-type"
                        type="radio"
                        checked={isRecurring}
                        onChange={() => setIsRecurring(true)}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <label htmlFor="recurring" className="ml-3 block text-sm font-medium text-gray-700">
                        Recurring Donation
                      </label>
                    </div>
                  </div>
                </div>
                
                {isRecurring && (
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Donation Amount</h3>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {predefinedAmounts.map((predefinedAmount) => (
                      <button
                        key={predefinedAmount}
                        type="button"
                        onClick={() => handleAmountSelect(predefinedAmount)}
                        className={`${
                          !customAmount && amount === predefinedAmount.toString()
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } border rounded-md py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                      >
                        ${predefinedAmount}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleCustomAmountToggle}
                      className={`${
                        customAmount
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      } border rounded-md py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                    >
                      Custom
                    </button>
                  </div>
                  
                  {customAmount && (
                    <div className="mt-4">
                      <label htmlFor="custom-amount" className="sr-only">
                        Custom amount
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          name="custom-amount"
                          id="custom-amount"
                          value={amount}
                          onChange={handleAmountChange}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          aria-describedby="price-currency"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">
                            USD
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-md bg-primary-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-primary-700">
                        Your donation is tax-deductible and will directly support mosque construction and maintenance.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleDonateNow}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MosqueSupport; 