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
  FaBriefcase,
  FaHandHoldingUsd,
  FaArrowRight
} from 'react-icons/fa';

const WidowSponsorship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const widowBenefits = [
    {
      icon: FaHome,
      title: 'Housing Support',
      description: 'Safe and stable housing assistance'
    },
    {
      icon: FaHandHoldingUsd,
      title: 'Financial Aid',
      description: 'Monthly financial support'
    },
    {
      icon: FaGraduationCap,
      title: 'Education Support',
      description: 'Children\'s education assistance'
    },
    {
      icon: FaBriefcase,
      title: 'Skills Training',
      description: 'Vocational training programs'
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Emotional Support',
      description: 'Counseling and guidance'
    },
    {
      icon: FaUsers,
      title: 'Community Support',
      description: 'Social integration programs'
    }
  ];

  const widowProfiles = [
    {
      id: 1,
      name: 'Widow A',
      age: '35',
      location: 'Gaza',
      country: 'Palestine',
      monthlyAmount: 250,
      status: 'Urgent',
      icon: FaUserCircle,
      description: 'Mother of 3 children, needs immediate support',
      children: ['2 school-aged', '1 preschool'],
      needs: ['Housing', 'Education', 'Financial Support'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 2,
      name: 'Widow B',
      age: '42',
      location: 'Rafah',
      country: 'Palestine',
      monthlyAmount: 300,
      status: 'Priority',
      icon: FaUserCircle,
      description: 'Single mother of 4, seeking employment support',
      children: ['3 school-aged', '1 preschool'],
      needs: ['Skills Training', 'Financial Aid', 'Childcare'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      name: 'Widow C',
      age: '38',
      location: 'Khan Yunis',
      country: 'Palestine',
      monthlyAmount: 200,
      status: 'Featured',
      icon: FaUserCircle,
      description: 'Mother of 2, needs housing assistance',
      children: ['2 school-aged'],
      needs: ['Housing', 'Education', 'Community Support'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      name: 'Widow D',
      age: '45',
      location: 'Jabalia',
      country: 'Palestine',
      monthlyAmount: 280,
      status: 'Urgent',
      icon: FaUserCircle,
      description: 'Mother of 3, requires comprehensive support',
      children: ['2 school-aged', '1 preschool'],
      needs: ['Financial Aid', 'Skills Training', 'Emotional Support'],
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 5,
      name: 'Widow E',
      age: '32',
      location: 'Beit Lahia',
      country: 'Palestine',
      monthlyAmount: 220,
      status: 'New',
      icon: FaUserCircle,
      description: 'Mother of 2, needs immediate assistance',
      children: ['1 school-aged', '1 preschool'],
      needs: ['Housing', 'Education', 'Financial Support'],
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 6,
      name: 'Widow F',
      age: '40',
      location: 'Deir al-Balah',
      country: 'Palestine',
      monthlyAmount: 260,
      status: 'Priority',
      icon: FaUserCircle,
      description: 'Mother of 3, seeking employment opportunities',
      children: ['2 school-aged', '1 preschool'],
      needs: ['Skills Training', 'Childcare', 'Community Support'],
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const statusTypes = ['All', 'Urgent', 'Priority', 'Featured', 'New'];

  const filteredWidows = widowProfiles.filter(widow => {
    const matchesSearch = searchQuery.toLowerCase() === '' ||
      widow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widow.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widow.needs.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || widow.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-purple-900 to-violet-900">
        {/* Decorative Patterns */}
        <div className="absolute inset-0 pattern-islamic-star pattern-opacity-10"></div>
        <div className="absolute inset-0 pattern-arabesque pattern-opacity-5"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[FaUserCircle, FaHome, FaHandHoldingHeart, FaHeart].map((Icon, index) => (
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
              <span className="text-white/90">Support Widows</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Widow Sponsorship<br />Program
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Provide comprehensive support to widows and their children, helping them rebuild their lives with dignity and hope.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: FaHandHoldingHeart, label: '500+ Widows Supported', color: 'from-purple-400 to-purple-600' },
              { icon: FaGlobe, label: '15+ Communities', color: 'from-violet-400 to-violet-600' },
              { icon: FaUsers, label: '1000+ Children Helped', color: 'from-indigo-400 to-indigo-600' },
              { icon: FaChartLine, label: '90% Success Rate', color: 'from-blue-400 to-blue-600' }
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
                  placeholder="Search by name, location, or needs..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {statusTypes.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedStatus === status
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Widow Profiles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWidows.map((profile) => (
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
                    <FaMapMarkerAlt className="text-purple-500" />
                    <span className="text-gray-600">{profile.location}, {profile.country}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{profile.description}</p>
                  
                  {/* Children Info */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Children:</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.children.map((child, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-600"
                        >
                          <FaUsers className="mr-1" />
                          {child}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Needs */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Support Needs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.needs.map((need, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-600"
                        >
                          <FaHandHoldingHeart className="mr-1" />
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${profile.color} text-white py-3 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}>
                    <span>Support Widow</span>
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
              Comprehensive support program designed to help widows rebuild their lives and support their families.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {widowBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="text-purple-500 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-violet-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-mosque pattern-opacity-10"></div>
        <div className="absolute inset-0 texture-grain"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-violet-500/20 rounded-full animate-float delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full animate-float delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 mb-8 backdrop-blur-sm border border-white/20">
              <FaLightbulb className="text-yellow-400 mr-2" />
              <span className="text-white/90">Make a Difference Today</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Support a Widow
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Your sponsorship can help a widow rebuild her life and provide for her children.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <FaRocket className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                Support a Widow
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

export default WidowSponsorship; 