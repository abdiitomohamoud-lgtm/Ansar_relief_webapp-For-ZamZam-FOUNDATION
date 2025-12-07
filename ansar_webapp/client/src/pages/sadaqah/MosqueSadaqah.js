import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaMosque,
  FaPrayingHands,
  FaBook,
  FaSchool,
  FaChalkboardTeacher,
  FaUsers,
  FaArrowRight
} from 'react-icons/fa';

const MosqueSadaqah = () => {
  // Donation options
  const donationOptions = [
    { value: 10, label: '$10' },
    { value: 25, label: '$25' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
    { value: 250, label: '$250' },
    { value: 500, label: '$500' },
    { value: 1000, label: '$1000' },
    { value: 'custom', label: 'Custom Amount' }
  ];

  // Mosque support projects
  const projects = [
    {
      title: 'Mosque Renovation',
      description: 'Help renovate and maintain existing mosques in need of repair.',
      image: '/images/sadaqah/mosque-renovation.jpg',
      amount: 5000,
      raised: 3200
    },
    {
      title: 'New Mosque Construction',
      description: 'Support building new mosques in communities without prayer facilities.',
      image: '/images/sadaqah/mosque-construction.jpg',
      amount: 50000,
      raised: 32000
    },
    {
      title: 'Islamic Education Center',
      description: 'Fund educational centers attached to mosques for children and adults.',
      image: '/images/sadaqah/islamic-education.jpg',
      amount: 25000,
      raised: 15000
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 to-teal-600">
        {/* Background Patterns */}
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.03]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/90 via-green-700/90 to-teal-600/90"></div>
          <div className="absolute inset-0 bg-noise opacity-20"></div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 inline-block">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto border-2 border-white/20">
                  <FaMosque className="text-4xl text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mosque Support Sadaqah
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Help maintain, develop, and build mosques and Islamic centers for communities in need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Mosque Support</h2>
            <p className="text-lg text-gray-700 mb-8">
              Mosques serve as vital community centers that provide spiritual guidance, education, and social services. 
              Your Sadaqah towards mosque support helps ensure these institutions can continue to serve their communities effectively.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FaPrayingHands className="text-xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Prayer Facilities</h3>
                <p className="text-gray-600">
                  Support the maintenance and development of prayer spaces for daily worship.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FaBook className="text-xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Islamic Resources</h3>
                <p className="text-gray-600">
                  Fund Qurans, books, and educational materials for mosque libraries.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FaUsers className="text-xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Programs</h3>
                <p className="text-gray-600">
                  Enable mosques to run social services and community outreach programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Current Mosque Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">${project.raised.toLocaleString()} raised</span>
                      <span className="text-gray-600">of ${project.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${(project.raised / project.amount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/donate?project=${encodeURIComponent(project.title)}`}
                    className="block w-full py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Support This Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Support Mosque Development</h2>
              
              <form>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Select Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {donationOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="bg-gray-100 hover:bg-green-600 hover:text-white py-2 px-4 rounded-md text-gray-800 hover:text-white transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Custom Amount</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Donation Type</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" className="form-radio text-green-600" name="donation_type" value="one_time" defaultChecked />
                      <span className="ml-2">One-time</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" className="form-radio text-green-600" name="donation_type" value="monthly" />
                      <span className="ml-2">Monthly</span>
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Specific Project (Optional)</label>
                  <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent">
                    <option value="">General Mosque Support</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.title}>{project.title}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  Proceed to Payment
                  <FaArrowRight className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-800 to-teal-600 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Support</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Beyond financial contributions, you can support mosque development in various ways.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <FaSchool className="text-3xl text-white mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Volunteer Teaching</h3>
                <p className="text-white/80">Share your knowledge by teaching at Islamic centers</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <FaChalkboardTeacher className="text-3xl text-white mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Skills Donation</h3>
                <p className="text-white/80">Offer professional services to support mosque operations</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <FaUsers className="text-3xl text-white mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Community Events</h3>
                <p className="text-white/80">Organize fundraisers and awareness programs</p>
              </div>
            </div>
            <Link
              to="/volunteer"
              className="px-6 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MosqueSadaqah; 