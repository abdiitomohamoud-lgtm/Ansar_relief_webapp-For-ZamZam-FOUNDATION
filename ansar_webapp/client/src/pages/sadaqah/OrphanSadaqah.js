import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaChild,
  FaBook,
  FaAppleAlt,
  FaHome,
  FaMedkit,
  FaArrowRight
} from 'react-icons/fa';

const OrphanSadaqah = () => {
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

  // Success stories
  const successStories = [
    {
      name: "Ahmed",
      age: 12,
      country: "Syria",
      story: "Ahmed lost his parents during the conflict. With your support, he now attends school and has a safe place to live.",
      image: "/images/sadaqah/orphan-story-1.jpg"
    },
    {
      name: "Fatima",
      age: 9,
      country: "Yemen",
      story: "After losing her home, Fatima found stability through our orphan support program. She excels in mathematics and wants to be a doctor.",
      image: "/images/sadaqah/orphan-story-2.jpg"
    },
    {
      name: "Ibrahim",
      age: 14,
      country: "Palestine",
      story: "Ibrahim is now in a loving foster home and pursuing his education with dreams of becoming an engineer to rebuild his community.",
      image: "/images/sadaqah/orphan-story-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-800 to-indigo-600">
        {/* Background Patterns */}
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.03]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/90 via-purple-700/90 to-indigo-600/90"></div>
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
                  <FaUsers className="text-4xl text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Orphan Support Sadaqah
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Provide care, education, and a brighter future for orphaned children
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How Your Support Helps</h2>
            <p className="text-lg text-gray-700 mb-12 text-center">
              Your Sadaqah for orphans provides essential care and creates lasting positive change in their lives
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <FaHome className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Safe Housing</h3>
                <p className="text-gray-600">
                  Provide secure and nurturing homes for orphaned children to grow in a stable environment.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <FaBook className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Education</h3>
                <p className="text-gray-600">
                  Fund schooling, books, and educational materials to help orphans build their future.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <FaMedkit className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Healthcare</h3>
                <p className="text-gray-600">
                  Ensure orphans receive regular medical care, vaccinations, and treatment when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-800 to-indigo-600 rounded-xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 pattern-islamic-star opacity-[0.03]"></div>
              
              <h2 className="text-3xl font-bold mb-10 text-center">Our Impact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">5,000+</div>
                  <p className="text-white/90">Orphans Supported</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">12</div>
                  <p className="text-white/90">Countries</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">85%</div>
                  <p className="text-white/90">Complete Education</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <p className="text-white/90">Receive Healthcare</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Success Stories</h2>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Meet some of the children whose lives have been transformed through your generous support
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <FaChild className="text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-xl font-bold text-gray-900">{story.name}, {story.age}</h3>
                      <p className="text-gray-600">{story.country}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{story.story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Support an Orphan</h2>
            <p className="text-lg text-gray-700 mb-12 text-center">
              Your donation helps provide care, education, and hope for orphaned children
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">One-Time Donation</h3>
                    <p className="text-gray-600 mb-4">
                      Support our orphan program with a single contribution
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {donationOptions.slice(0, 6).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className="bg-gray-100 hover:bg-purple-600 hover:text-white py-2 px-4 rounded-md text-gray-800 hover:text-white transition-colors"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to="/donate?type=orphan&frequency=one-time"
                    className="block w-full py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Donate Once
                  </Link>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Monthly Sponsorship</h3>
                    <p className="text-gray-600 mb-4">
                      Provide consistent support by sponsoring an orphan monthly
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 30, label: '$30/mo' },
                        { value: 50, label: '$50/mo' },
                        { value: 100, label: '$100/mo' },
                        { value: 150, label: '$150/mo' },
                        { value: 200, label: '$200/mo' },
                        { value: 'custom', label: 'Custom' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className="bg-gray-100 hover:bg-indigo-600 hover:text-white py-2 px-4 rounded-md text-gray-800 hover:text-white transition-colors"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    to="/sponsorships/orphan"
                    className="block w-full py-3 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Sponsor Monthly
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  100% of your donation goes directly to supporting orphaned children
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Help</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Beyond financial support, there are many ways you can make a difference in an orphan's life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/volunteer?program=orphan"
                className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Volunteer
              </Link>
              <Link 
                to="/contact"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                to="/programs/orphan-care"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrphanSadaqah; 