import React, { useState } from 'react';
import { FaHandHoldingHeart, FaCalculator } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const ZakatSadaqah = () => {
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [zakatAmount, setZakatAmount] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const navigate = useNavigate();

  const colorScheme = {
    gradient: 'from-teal-900 to-teal-700',
    bg: 'bg-teal-900',
    text: 'text-teal-900',
    border: 'border-teal-900',
    hover: 'hover:bg-teal-800'
  };

  const projects = [
    {
      title: 'Emergency Zakat Distribution',
      description: 'Provide immediate financial assistance to those in urgent need through Zakat funds.',
      image: '/images/sadaqah/projects/emergency-zakat.jpg',
      progress: 95,
      goal: 500000,
      raised: 475000,
      impact: 'Support 1000 individuals in crisis'
    },
    {
      title: 'Sustainable Livelihood Program',
      description: 'Help establish sustainable income sources for eligible Zakat recipients.',
      image: '/images/sadaqah/projects/sustainable-zakat.jpg',
      progress: 85,
      goal: 400000,
      raised: 340000,
      impact: 'Enable 100 families to become self-sufficient'
    },
    {
      title: 'Education Scholarship Fund',
      description: 'Support deserving students with educational expenses through Zakat.',
      image: '/images/sadaqah/projects/education-zakat.jpg',
      progress: 80,
      goal: 300000,
      raised: 240000,
      impact: 'Fund education for 50 students'
    }
  ];

  const donationOptions = [
    {
      amount: 1000,
      impact: 'Provide emergency assistance to one family'
    },
    {
      amount: 2500,
      impact: 'Support business startup for one recipient'
    },
    {
      amount: 5000,
      impact: 'Fund one student\'s annual education'
    },
    {
      amount: 10000,
      impact: 'Help multiple families become self-sufficient'
    }
  ];

  const calculateZakat = () => {
    const totalAssets = parseFloat(assets) || 0;
    const totalLiabilities = parseFloat(liabilities) || 0;
    
    // Calculate net assets
    const netAssets = totalAssets - totalLiabilities;
    
    // Check if net assets are above nisab threshold (using a simplified approach)
    // In a real implementation, you would need to use current gold/silver prices
    const nisabThreshold = 5000; // simplified example value
    
    if (netAssets < nisabThreshold) {
      setZakatAmount(0);
    } else {
      // Zakat is typically 2.5% of net assets above nisab
      setZakatAmount(netAssets * 0.025);
    }
  };

  const ZakatCalculatorSection = () => (
    <div className="container mx-auto px-4 py-12 mb-8 bg-white rounded-xl shadow-md">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <FaCalculator className={`text-3xl ${colorScheme.text} mr-3`} />
          <h2 className="text-2xl font-bold">Zakat Calculator</h2>
        </div>
        
        <p className="text-gray-600 text-center mb-8">
          Calculate your Zakat obligation using our simple calculator. Zakat is typically 2.5% of your net wealth,
          payable once a year if your wealth exceeds the nisab threshold.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Total Assets ($)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
              <input
                type="number"
                className={`block w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:${colorScheme.border}`}
                placeholder="Total assets value"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Include: cash, savings, investments, gold, silver, property for business, etc.
            </p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Total Liabilities ($)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
              <input
                type="number"
                className={`block w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 focus:${colorScheme.border}`}
                placeholder="Total debts and liabilities"
                value={liabilities}
                onChange={(e) => setLiabilities(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Include: loans, debts, and other financial obligations
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={calculateZakat}
            className={`px-8 py-3 ${colorScheme.bg} text-white rounded-lg font-medium shadow-md hover:shadow-lg flex items-center ${colorScheme.hover}`}
          >
            <FaCalculator className="mr-2" />
            Calculate Zakat
          </button>
        </div>
        
        {zakatAmount !== null && (
          <div className="mt-8 p-6 border-2 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Your Estimated Zakat</h3>
            <p className={`text-3xl font-bold ${colorScheme.text}`}>
              ${zakatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className="mt-4">
              <button
                onClick={() => {
                  // Populate donation amount with calculated zakat using React Router
                  navigate(`/sadaqah?amount=${zakatAmount.toFixed(2)}&category=Zakat`);
                }}
                className={`px-6 py-2 ${colorScheme.bg} text-white rounded-lg font-medium shadow-md hover:shadow-lg inline-flex items-center ${colorScheme.hover}`}
              >
                <FaHandHoldingHeart className="mr-2" />
                Pay My Zakat Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <SadaqahCategoryPage
        title="Zakat Sadaqah"
        description="Fulfill your Zakat obligation while helping transform lives through sustainable support and emergency assistance."
        headerImage="/images/sadaqah/banners/zakat-banner.jpg"
        colorScheme={colorScheme}
        icon={FaHandHoldingHeart}
        projects={projects}
        donationOptions={donationOptions}
      />
      <div className="relative -mt-12 mb-20 z-20">
        <button 
          className={`mx-auto block px-6 py-3 ${colorScheme.bg} text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform flex items-center`}
          onClick={() => setShowCalculator(!showCalculator)}
        >
          <FaCalculator className="mr-2" />
          {showCalculator ? 'Hide Zakat Calculator' : 'Show Zakat Calculator'}
        </button>
        
        {showCalculator && <ZakatCalculatorSection />}
      </div>
    </>
  );
};

export default ZakatSadaqah; 