import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaEnvelope, FaHome, FaShare } from 'react-icons/fa';
import { Button } from '../../components/common';
import { useSelector } from 'react-redux';

const DonationConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donation } = useSelector(state => state.donation);
  
  // If no donation data and no state, redirect to home
  useEffect(() => {
    if (!donation && !location.state?.donationId) {
      navigate('/');
    }
  }, [donation, location.state, navigate]);
  
  if (!donation && !location.state?.donationId) {
    return null; // Will redirect via useEffect
  }
  
  const donationId = donation?.id || location.state?.donationId || 'D-123456789';
  const donationDate = donation?.createdAt 
    ? new Date(donation.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const totalAmount = donation?.totalAmount || 150.00;
  
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download functionality would be implemented here');
  };
  
  const handleShareDonation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Donation to Ansar Charity',
        text: `I just donated $${totalAmount.toFixed(2)} to support humanitarian causes with Ansar Charity!`,
        url: window.location.origin,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Share functionality would be implemented here');
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-600 p-6 text-white text-center">
            <FaCheckCircle className="text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Thank You for Your Donation!</h1>
            <p className="mt-2">Your generosity will make a real difference in the lives of those in need.</p>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">
                Your donation has been successfully processed. A confirmation email has been sent to your registered email address.
          </p>
        </div>
        
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Donation Details</h2>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <p className="text-sm text-gray-500">Donation ID</p>
                  <p className="font-medium">{donationId}</p>
              </div>
              <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{donationDate}</p>
              </div>
              <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-xl text-primary-600">${totalAmount.toFixed(2)}</p>
              </div>
              <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">Credit Card (•••• 1234)</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">What Happens Next?</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  Your donation will be allocated to the selected causes.
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You'll receive updates on the impact of your donation.
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Your tax receipt will be emailed to you for your records.
                </li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                className="flex items-center"
              >
                <FaDownload className="mr-2" />
                Download Receipt
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShareDonation}
                className="flex items-center"
              >
                <FaShare className="mr-2" />
                Share Your Donation
              </Button>
              
              <Link to="/user/donations">
                <Button
                  variant="outline"
                  className="flex items-center"
                >
                  <FaEnvelope className="mr-2" />
                  View All Donations
                </Button>
              </Link>
              
              <Link to="/">
                <Button
                  variant="primary"
                  className="flex items-center"
                >
                  <FaHome className="mr-2" />
                  Return to Home
                </Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirmation; 