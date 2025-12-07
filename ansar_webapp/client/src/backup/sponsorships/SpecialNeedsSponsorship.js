import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/patterns.css';
import {
  FaUserCircle,
  FaUsers,
  FaHandHoldingHeart,
  FaChartLine,
  FaGlobe,
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt,
  FaStar,
  FaClock,
  FaMedal,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaHome,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaWheelchair,
  FaHandHoldingUsd,
  FaArrowRight,
  FaUserFriends,
  FaHandshake
} from 'react-icons/fa';

const SpecialNeedsSponsorship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const specialNeedsBenefits = [
    {
      icon: FaBriefcaseMedical,
      title: 'Medical Support',
      description: 'Specialized medical care and therapy'
    },
    {
      icon: FaGraduationCap,
      title: 'Special Education',
      description: 'Tailored educational programs'
    },
    {
      icon: FaWheelchair,
      title: 'Accessibility',
      description: 'Equipment and mobility support'
    },
    {
      icon: FaUserFriends,
      title: 'Social Integration',
      description: 'Community participation programs'
    },
    {
      icon: FaHandHoldingUsd,
      title: 'Financial Aid',
      description: 'Support for daily living expenses'
    },
    {
      icon: FaHandshake,
      title: 'Family Support',
      description: 'Counseling and guidance services'
    }
  ];

  const specialNeedsProfiles = [
    {
      id: 1,
      name: 'Child A',
      age: '8',
      location: 'Gaza',
      country: 'Palestine',
      monthlyAmount: 300,
      condition: 'Autism',
      icon: FaUserCircle,
      description: 'Child with autism requiring specialized education and therapy',
      status: 'Urgent',
      needs: ['Special Education', 'Therapy', 'Medical Support'],
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 2,
      name: 'Child B',
      age: '12',
      location: 'Rafah',
      country: 'Palestine',
      monthlyAmount: 250,
      condition: 'Physical Disability',
      icon: FaWheelchair,
      description: 'Child with physical disability needing mobility support',
      status: 'Priority',
      needs: ['Mobility Equipment', 'Physical Therapy', 'Accessibility'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      name: 'Child C',
      age: '6',
      location: 'Khan Yunis',
      country: 'Palestine',
      monthlyAmount: 280,
      condition: 'Down Syndrome',
      icon: FaUserCircle,
      description: 'Child with Down Syndrome requiring special education',
      status: 'Featured',
      needs: ['Special Education', 'Speech Therapy', 'Social Support'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      name: 'Child D',
      age: '10',
      location: 'Jabalia',
      country: 'Palestine',
      monthlyAmount: 320,
      condition: 'Multiple Disabilities',
      icon: FaBriefcaseMedical,
      description: 'Child with multiple disabilities needing comprehensive support',
      status: 'Urgent',
      needs: ['Medical Care', 'Special Education', 'Family Support'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 5,
      name: 'Child E',
      age: '7',
      location: 'Beit Lahia',
      country: 'Palestine',
      monthlyAmount: 270,
      condition: 'Hearing Impairment',
      icon: FaUserCircle,
      description: 'Child with hearing impairment requiring specialized support',
      status: 'New',
      needs: ['Hearing Aids', 'Speech Therapy', 'Educational Support'],
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 6,
      name: 'Child F',
      age: '9',
      location: 'Deir al-Balah',
      country: 'Palestine',
      monthlyAmount: 290,
      condition: 'Visual Impairment',
      icon: FaUserCircle,
      description: 'Child with visual impairment needing specialized assistance',
      status: 'Priority',
      needs: ['Braille Education', 'Mobility Training', 'Assistive Technology'],
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const conditionTypes = ['All', 'Autism', 'Physical Disability', 'Down Syndrome', 'Multiple Disabilities', 'Hearing Impairment', 'Visual Impairment'];

  const filteredProfiles = specialNeedsProfiles.filter(profile => {
    const matchesSearch = searchQuery.toLowerCase() === '' ||
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.condition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || profile.condition === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-teal-900 to-cyan-900">
        {/* Decorative Patterns */}
        <div className="absolute inset-0 pattern-islamic-star pattern-opacity-10"></div>
        <div className="absolute inset-0 pattern-arabesque pattern-opacity-5"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[FaUserCircle, FaWheelchair, FaHandHoldingHeart, FaHeart].map((Icon, index) => (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <Icon className="text-white/10 text-4xl" />
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 mb-8 backdrop-blur-sm border border-white/20">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-white/90">Support Special Needs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Special Needs<br />Sponsorship Program
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Provide specialized support and care to children with special needs, helping them reach their full potential.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: FaHandHoldingHeart, label: '300+ Children Supported', color: 'from-teal-400 to-teal-600' },
              { icon: FaGlobe, label: '10+ Specialized Centers', color: 'from-cyan-400 to-cyan-600' },
              { icon: FaUsers, label: '50+ Specialists', color: 'from-blue-400 to-blue-600' },
              { icon: FaChartLine, label: '95% Success Rate', color: 'from-indigo-400 to-indigo-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <p className="text-white/90 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-current text-gray-50" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z" />
          </svg>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, location, or condition..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Condition Type Filter */}
              <div className="flex flex-wrap gap-2">
                {conditionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedType === type
                        ? 'bg-teal-500 text-white'
                        : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Needs Profiles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map((profile) => (
              <div 
                key={profile.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-32 bg-gradient-to-r ${profile.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 pattern-dots pattern-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <profile.icon className="text-white text-5xl transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {profile.status && (
                    <span className="absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium bg-white/90 shadow-lg">
                      {profile.status}
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                    <span className="text-gray-600">{profile.age} years</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <FaMapMarkerAlt className="text-teal-500" />
                    <span className="text-gray-600">{profile.location}, {profile.country}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <FaBriefcaseMedical className="text-teal-500" />
                    <span className="text-gray-600">{profile.condition}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{profile.description}</p>
                  
                  {/* Support Needs */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Support Needs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.needs.map((need, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-teal-50 text-teal-600"
                        >
                          <FaHandHoldingHeart className="mr-1" />
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${profile.color} text-white py-3 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}>
                    <span>Support Child</span>
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support program designed to provide specialized care and assistance to children with special needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialNeedsBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="text-teal-500 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-900 to-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-mosque pattern-opacity-10"></div>
        <div className="absolute inset-0 texture-grain"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-teal-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/20 rounded-full animate-float delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full animate-float delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 mb-8 backdrop-blur-sm border border-white/20">
              <FaLightbulb className="text-yellow-400 mr-2" />
              <span className="text-white/90">Make a Difference Today</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Support a Child with Special Needs
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Your sponsorship can help provide specialized care and support to children with special needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-teal-900 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <FaRocket className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                Support a Child
              </button>
              <Link
                to="/sponsorships"
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                View All Programs
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialNeedsSponsorship; 