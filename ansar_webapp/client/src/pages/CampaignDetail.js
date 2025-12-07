import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaShare, FaFacebookF, FaTwitter, FaWhatsapp, FaRegClock, FaUsers, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { Button, Progress, LoadingSpinner, Badge } from '../components/common';
import { useCart } from '../contexts/CartContext';

// Import mock data
import mockCampaign from './mockCampaign.json';

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // No longer loading since we're using mock data
  const [donationAmount, setDonationAmount] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { addToCart } = useCart();
  
  const predefinedAmounts = [50, 100, 300, 500];
  
  useEffect(() => {
    // Set document title
    document.title = "Campaign Detail - Ansar Relief";
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Using mock data directly, no API calls needed
    setIsLoading(true);
    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        // Use mock campaign data
        setCampaign(mockCampaign);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error setting up mock campaign:', error);
      setCampaign(null);
      setIsLoading(false);
    }
  }, [id]);
  
  const handleDonate = () => {
    if (!donationAmount) {
      alert('Please select or enter a donation amount');
      return;
    }
    
    // Add to cart
    addToCart({
      id: `campaign-${campaign.id}`,
      type: 'campaign',
      name: campaign.title,
      amount: parseFloat(donationAmount),
      image: campaign.image,
      quantity: 1
    });
    
    // Navigate to cart
    window.location.href = '/cart';
  };
  
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Support ${campaign.title} - ${url}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
    
    setShowShareOptions(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Campaign Not Found</h2>
        <p className="mb-8">The campaign you are looking for does not exist or has been removed.</p>
        <Link to="/campaigns" className="text-primary-600 hover:text-primary-700">
          <FaArrowLeft className="inline mr-2" />
          Back to Campaigns
            </Link>
      </div>
    );
  }

  const percentRaised = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  const remaining = campaign.goal - campaign.raised;

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/campaigns" className="text-gray-600 hover:text-primary-600">
                    Campaigns
                  </Link>
        </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 truncate max-w-xs">
            {campaign.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              {/* Main Image */}
              <div className="relative">
                <img 
                  src={campaign.image} 
                  alt={campaign.title} 
                  className="w-full h-96 object-cover"
                />
                <Badge 
                  variant="primary" 
                  className="absolute top-4 left-4"
                >
                  {campaign.category}
                </Badge>
                {campaign.licenseNumber && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    LNO: {campaign.licenseNumber}
                  </div>
                )}
      </div>
              
              {/* Campaign Info */}
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
                
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center mr-6">
                    <FaMapMarkerAlt className="mr-1" />
                    {campaign.location}, {campaign.country}
                  </div>
                  <div className="flex items-center mr-6">
                    <FaUsers className="mr-1" />
                    {campaign.donorsCount} donors
                  </div>
                  {campaign.daysLeft > 0 && (
                    <div className="flex items-center">
                      <FaRegClock className="mr-1" />
                      {campaign.daysLeft} days left
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <Progress 
                    value={campaign.raised} 
                    max={campaign.goal} 
                    variant="primary"
                    showLabel
                  />
                </div>
                
                <div className="flex justify-between text-sm mb-6">
                  <div>
                    <div className="font-semibold">{percentRaised}% Funded</div>
                    <div className="text-gray-500">Raised: ${campaign.raised.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary-600">${remaining.toLocaleString()}</div>
                    <div className="text-gray-500">Remaining</div>
                  </div>
              </div>
              
                <div className="flex space-x-4">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="flex-grow"
                    onClick={() => document.getElementById('donation-section').scrollIntoView({ behavior: 'smooth' })}
                  >
                    <FaHeart className="mr-2" />
                    Donate Now
                  </Button>
                  
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <FaShare className="mr-2" />
                      Share
                    </Button>
                    
                    {showShareOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleShare('facebook')}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FaFacebookF className="mr-3 text-blue-600" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FaTwitter className="mr-3 text-blue-400" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FaWhatsapp className="mr-3 text-green-500" />
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <svg className="mr-3 h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                            Copy Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>

            {/* Campaign Description */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">About This Campaign</h2>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: campaign.longDescription }}
                />
                </div>
                </div>
                
            {/* Campaign Gallery */}
            {campaign.gallery && campaign.gallery.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {campaign.gallery.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${campaign.title} - Image ${index + 1}`}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Campaign Updates */}
            {campaign.updates && campaign.updates.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Campaign Updates</h2>
                  <div className="space-y-6">
                    {campaign.updates.map(update => (
                      <div key={update.id} className="border-l-4 border-primary-500 pl-4">
                        <h3 className="font-bold text-lg">{update.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{update.date}</p>
                        <p>{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
                </div>
                
          {/* Right Column - Donation Form */}
          <div>
            <div id="donation-section" className="bg-white rounded-lg shadow-md overflow-hidden sticky top-32">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Amount</label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {predefinedAmounts.map(amt => (
                        <button
                        key={amt}
                          type="button"
                        className={`py-2 rounded-md ${donationAmount === amt.toString() ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                        onClick={() => setDonationAmount(amt.toString())}
                      >
                        ${amt}
                        </button>
                      ))}
                        </div>
                        <input
                          type="number"
                          value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Custom amount"
                    className="w-full p-2 border rounded-md"
                        />
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleDonate}
                >
                  <FaHeart className="mr-2" />
                    Donate Now
                </Button>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Your donation will help provide essential aid to those affected by the crisis in Gaza.</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">How Your Donation Helps</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      $50 provides emergency food for a family for one week
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      $100 provides clean water and sanitation supplies
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      $300 provides medical supplies and essential medicines
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      $500 provides emergency shelter for displaced families
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail; 