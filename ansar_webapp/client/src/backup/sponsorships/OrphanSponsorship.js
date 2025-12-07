import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/slices/donationSlice';
import { addNotification } from '../../store/slices/appSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrphanSponsorship = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orphans, setOrphans] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  
  // Dummy data for orphans - would be replaced with API fetch in real app
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setOrphans([
        {
          id: 'orphan-001',
          name: 'Fatima',
          age: 8,
          gender: 'Female',
          country: 'Yemen',
          story: 'Fatima lost her parents during the ongoing conflict. She lives with her elderly grandmother in a small village.',
          image: 'https://images.unsplash.com/photo-1516942164887-6c505cb55c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          monthlyAmount: 50,
        },
        {
          id: 'orphan-002',
          name: 'Ahmed',
          age: 10,
          gender: 'Male',
          country: 'Syria',
          story: 'Ahmed was displaced from his home in Aleppo. He now lives in a refugee camp with his older sister.',
          image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          monthlyAmount: 50,
        },
        {
          id: 'orphan-003',
          name: 'Amina',
          age: 6,
          gender: 'Female',
          country: 'Somalia',
          story: 'Amina lost her family during the drought. She is currently living with a foster family in a rural community.',
          image: 'https://images.unsplash.com/photo-1545376268-8a604a7bf8f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          monthlyAmount: 45,
        },
        {
          id: 'orphan-004',
          name: 'Ibrahim',
          age: 9,
          gender: 'Male',
          country: 'Palestine',
          story: `Ibrahim's parents were victims of the conflict. He now stays with his uncle in a refugee camp.`,
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          monthlyAmount: 55,
        },
        {
          id: 'orphan-005',
          name: 'Zainab',
          age: 7,
          gender: 'Female',
          country: 'Afghanistan',
          story: 'Zainab was orphaned at a young age. She now lives with her grandmother in a small village outside Kabul.',
          image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          monthlyAmount: 50,
        },
        {
          id: 'orphan-006',
          name: 'Mohammed',
          age: 11,
          gender: 'Male',
          country: 'Iraq',
          story: 'Mohammed lost his parents in an attack on his village. He now lives with his elderly grandparents.',
          image: 'https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          monthlyAmount: 60,
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  
  const handleSponsor = (orphan) => {
    // Calculate the amount based on the selected frequency
    const amount = orphan.monthlyAmount * 
      (selectedFrequency === 'quarterly' ? 3 : 
      selectedFrequency === 'annually' ? 12 : 1);
    
    const sponsorshipItem = {
      id: orphan.id,
      type: 'orphan-sponsorship',
      title: `Sponsor ${orphan.name} (${orphan.age}, ${orphan.country})`,
      amount,
      isRecurring: true,
      frequency: selectedFrequency,
      image: orphan.image,
      description: orphan.story,
      category: 'Orphan Care'
    };
    
    try {
      // Add to cart
      dispatch(addToCart(sponsorshipItem));
      
      // Show success notification
      dispatch(addNotification({
        id: Date.now(),
        type: 'success',
        message: `You have added ${orphan.name}'s sponsorship to your cart`,
        duration: 5000
      }));
      
      // Navigate to cart
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Show error notification
      dispatch(addNotification({
        id: Date.now(),
        type: 'error',
        message: 'Failed to add sponsorship to cart. Please try again.',
        duration: 5000
      }));
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Orphan Sponsorship Program
            </h1>
            <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
              "Whoever takes care of an orphan, he and I will be together in Paradise like this." The Prophet (peace be upon him) then raised his forefinger and middle finger together.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Program Description */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                About Our Orphan Sponsorship Program
              </h2>
              <div className="mt-4 prose prose-primary text-gray-500">
                <p>
                  Our orphan sponsorship program provides comprehensive support to orphaned children around the world. Your sponsorship ensures that these children receive:
                </p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Quality education and school supplies</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Nutritious meals and clean water</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Healthcare and medical check-ups</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Safe shelter and clothing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Emotional support and counseling</span>
                  </li>
                </ul>
                
                <p className="mt-4">
                  Your sponsorship creates a lasting relationship with an orphaned child, helping them overcome the challenges they face and providing hope for a brighter future.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sponsorship Frequency Selection */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Choose Your Sponsorship Frequency
              </h2>
              <div className="mt-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex items-center">
                    <input
                      id="monthly"
                      name="frequency"
                      type="radio"
                      value="monthly"
                      checked={selectedFrequency === 'monthly'}
                      onChange={handleFrequencyChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                    />
                    <label htmlFor="monthly" className="ml-3 block text-sm font-medium text-gray-700">
                      Monthly ($50/month)
                    </label>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <input
                      id="quarterly"
                      name="frequency"
                      type="radio"
                      value="quarterly"
                      checked={selectedFrequency === 'quarterly'}
                      onChange={handleFrequencyChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                    />
                    <label htmlFor="quarterly" className="ml-3 block text-sm font-medium text-gray-700">
                      Quarterly ($150/quarter)
                    </label>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <input
                      id="annually"
                      name="frequency"
                      type="radio"
                      value="annually"
                      checked={selectedFrequency === 'annually'}
                      onChange={handleFrequencyChange}
                      className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                    />
                    <label htmlFor="annually" className="ml-3 block text-sm font-medium text-gray-700">
                      Annually ($600/year)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orphans Grid */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose an Orphan to Sponsor
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orphans.map((orphan) => (
                <div key={orphan.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 w-full relative">
                    <img
                      className="h-full w-full object-cover"
                      src={orphan.image}
                      alt={orphan.name}
                    />
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {orphan.name}, {orphan.age}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {orphan.country}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{orphan.story}</p>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-semibold text-gray-900">${orphan.monthlyAmount}</span>
                        <span className="ml-1 text-sm text-gray-500">/month</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSponsor(orphan)}
                        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Sponsor {orphan.name}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="divide-y divide-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  How long does my sponsorship last?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your sponsorship continues until you choose to cancel it. We encourage sponsors to maintain their support until the child completes their education or becomes self-sufficient.
                  </p>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Will I receive updates about the child I sponsor?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Yes, you will receive regular updates about your sponsored child's progress, including photos, letters, and reports on their education and well-being.
                  </p>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Can I communicate with my sponsored child?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Yes, you can exchange letters and messages with your sponsored child. We facilitate this communication while ensuring the child's safety and privacy.
                  </p>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  How is my donation used?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    The majority of your donation goes directly to supporting your sponsored child's needs, including education, food, healthcare, and housing. A small portion covers administrative costs to ensure the program's effectiveness.
                  </p>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Can I visit my sponsored child?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Depending on the location and circumstances, sponsor visits may be possible. These visits are carefully planned and supervised to ensure the safety and comfort of all involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrphanSponsorship; 