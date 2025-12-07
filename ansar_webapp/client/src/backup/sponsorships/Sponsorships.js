import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaHandHoldingHeart,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBookOpen,
  FaArrowRight,
  FaUsers,
  FaHandshake,
  FaStar,
  FaSearch,
  FaFilter,
  FaFlag,
  FaChild,
  FaBook,
  FaMedkit,
  FaHome,
  FaUtensils,
  FaTshirt,
  FaChartLine,
  FaRegSmile,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaQuoteLeft,
  FaChevronDown,
  FaGift,
  FaPray,
  FaHands,
  FaMosque,
  FaGlobe,
  FaHeartbeat,
  FaHandsHelping
} from 'react-icons/fa';

const Sponsorships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showImpactStats, setShowImpactStats] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('impact-stats');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setShowImpactStats(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const impactStats = [
    { number: '10K+', label: 'Children Sponsored', icon: FaChild },
    { number: '25+', label: 'Countries Reached', icon: FaMapMarkerAlt },
    { number: '95%', label: 'Success Rate', icon: FaChartLine },
    { number: '15+', label: 'Years of Impact', icon: FaClock }
  ];

  const sponsorshipBenefits = [
    {
      icon: FaBook,
      title: 'Education',
      description: 'Access to quality education and learning materials'
    },
    {
      icon: FaMedkit,
      title: 'Healthcare',
      description: 'Regular medical check-ups and healthcare support'
    },
    {
      icon: FaHome,
      title: 'Housing',
      description: 'Safe and comfortable living environment'
    },
    {
      icon: FaUtensils,
      title: 'Nutrition',
      description: 'Healthy meals and nutritional support'
    },
    {
      icon: FaTshirt,
      title: 'Clothing',
      description: 'Seasonal clothing and basic necessities'
    },
    {
      icon: FaRegSmile,
      title: 'Emotional Support',
      description: 'Regular counseling and mentorship'
    }
  ];

  const sponsorshipSteps = [
    {
      icon: '/images/sponsorships/step1.jpg',
      title: 'Choose a Child',
      description: 'You can start helping a child today by choosing one from our database and providing them with support.'
    },
    {
      icon: '/images/sponsorships/step2.jpg',
      title: 'Monthly Support',
      description: 'Sponsor and help to bring a light smile to make a brighter future, you can afford to do make it in a month.'
    },
    {
      icon: '/images/sponsorships/step3.jpg',
      title: 'Track Progress',
      description: 'We will show you all the good you do for the orphanage by our monthly reports and updates.'
    }
  ];

  const sponsorshipCards = [
    {
      id: 1,
      name: 'Ahmed',
      age: 8,
      gender: 'Male',
      location: 'Gaza',
      country: 'Palestine',
      flag: '🇵🇸',
      monthlyAmount: 150,
      image: '/images/default/children/boy-1.jpg',
      description: 'Ahmed needs your support for education and basic needs',
      status: 'Urgent',
      category: 'education',
      urgencyLevel: 'high',
      lastUpdated: '2024-03-15',
      completedPercentage: 45,
      neededAmount: 2500,
      story: 'Ahmed lost his parents during recent conflicts and dreams of becoming a doctor.'
    },
    {
      id: 2,
      name: 'Fatima',
      age: 7,
      gender: 'Female',
      location: 'Rafah',
      country: 'Palestine',
      flag: '🇵🇸',
      monthlyAmount: 150,
      image: '/images/default/children/girl-1.jpg',
      description: 'Fatima requires assistance for healthcare and education',
      status: 'Urgent',
      category: 'healthcare',
      urgencyLevel: 'high',
      lastUpdated: '2024-03-14',
      completedPercentage: 60,
      neededAmount: 3000,
      story: 'Fatima needs regular medical care and support for her education.'
    },
    {
      id: 3,
      name: 'Yusuf',
      age: 10,
      gender: 'Male',
      location: 'Khan Yunis',
      country: 'Palestine',
      flag: '🇵🇸',
      monthlyAmount: 120,
      image: '/images/default/children/boy-2.jpg',
      description: 'Support Yusuf\'s educational journey',
      status: 'Featured',
      category: 'education',
      urgencyLevel: 'medium',
      lastUpdated: '2024-03-13',
      completedPercentage: 75,
      neededAmount: 2000,
      story: 'Yusuf shows exceptional talent in mathematics and dreams of becoming an engineer.'
    }
    // Add more cards as needed
  ];

  const donationAmounts = [
    {
      amount: 1000,
      title: 'USD 1000',
      description: 'Contribution to a better world in 30 days',
      buttonText: 'Donate USD 1000'
    },
    {
      amount: 2500,
      title: 'USD 2500',
      description: 'Support a comprehensive program for 3 months',
      buttonText: 'Donate USD 2500'
    },
    {
      amount: 5000,
      title: 'USD 5000',
      description: 'Fund a complete water well project in 6 months',
      buttonText: 'Donate USD 5000'
    },
    {
      amount: 10000,
      title: 'USD 10000',
      description: 'Establish a community development project',
      buttonText: 'Donate USD 10000'
    }
  ];

  const filteredCards = sponsorshipCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = !selectedGender || card.gender === selectedGender;
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    const matchesAge = !selectedAge || getAgeGroup(card.age) === selectedAge;
    const matchesUrgency = !selectedUrgency || card.urgencyLevel === selectedUrgency;
    
    return matchesSearch && matchesGender && matchesCategory && matchesAge && matchesUrgency;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      case 'urgency':
        return getUrgencyScore(b.urgencyLevel) - getUrgencyScore(a.urgencyLevel);
      case 'amount':
        return a.monthlyAmount - b.monthlyAmount;
      case 'completion':
        return b.completedPercentage - a.completedPercentage;
      default:
        return 0;
    }
  });

  const getAgeGroup = (age) => {
    if (age <= 5) return '0-5';
    if (age <= 10) return '6-10';
    if (age <= 15) return '11-15';
    return '16+';
  };

  const getUrgencyScore = (level) => {
    switch (level) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const testimonials = [
    {
      quote: "Sponsoring a child has been one of the most rewarding experiences of my life. The regular updates and progress reports make me feel truly connected.",
      author: "Sarah M.",
      role: "Sponsor since 2020",
      image: "/images/sponsorships/testimonials/sarah.jpg"
    },
    {
      quote: "The transparency and regular communication about how my contribution is helping make a real difference is incredible.",
      author: "James R.",
      role: "Sponsor since 2019",
      image: "/images/sponsorships/testimonials/james.jpg"
    },
    {
      quote: "Being able to see the direct impact of my sponsorship on a child's life is truly heartwarming.",
      author: "Emily K.",
      role: "Sponsor since 2021",
      image: "/images/sponsorships/testimonials/emily.jpg"
    }
  ];

  // New constants for additional sections
  const impactCategories = [
    {
      icon: FaMosque,
      title: 'Community Support',
      description: 'Building stronger communities through sustainable development programs',
      stats: '50+ Communities'
    },
    {
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Operating in multiple countries to help those most in need',
      stats: '25+ Countries'
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Direct Impact',
      description: 'Ensuring your donation directly reaches those who need it most',
      stats: '95% Efficiency'
    }
  ];

  const successStories = [
    {
      name: 'Ahmad',
      age: '12',
      story: 'From struggling with basic education to top of his class',
      image: '/images/sponsorships/stories/ahmad.jpg',
      achievement: 'Academic Excellence'
    },
    {
      name: 'Fatima',
      age: '9',
      story: 'Received life-changing medical treatment and now thriving',
      image: '/images/sponsorships/stories/fatima.jpg',
      achievement: 'Health Recovery'
    },
    {
      name: 'Yusuf',
      age: '14',
      story: 'Developed computer skills and now teaching others',
      image: '/images/sponsorships/stories/yusuf.jpg',
      achievement: 'Skills Development'
    }
  ];

  const faqItems = [
    {
      question: 'How does the sponsorship program work?',
      answer: 'Our sponsorship program connects you directly with a child in need. Your monthly contribution provides essential support for education, healthcare, nutrition, and more.'
    },
    {
      question: 'How much of my donation goes to the child?',
      answer: '95% of your donation goes directly to supporting the child, with only 5% used for administrative costs to ensure program sustainability.'
    },
    {
      question: 'Can I communicate with my sponsored child?',
      answer: 'Yes! You\'ll receive regular updates, photos, and progress reports. You can also exchange letters and messages through our secure platform.'
    },
    {
      question: 'How long does the sponsorship last?',
      answer: 'Sponsorship continues until the child completes their education or becomes self-sufficient. You can choose to sponsor for any duration you wish.'
    }
  ];

  const sponsorshipCategories = [
    {
      title: 'Orphan Sponsorship',
      description: 'Support orphaned children with education, healthcare, and basic needs',
      icon: FaChild,
      color: 'from-purple-500 to-indigo-600',
      pattern: 'circles',
      link: '/sponsorships/orphan',
      stats: '1,200+ Children',
      impact: 'Comprehensive Care'
    },
    {
      title: 'Student Sponsorship',
      description: 'Help students access quality education and learning resources',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-cyan-600',
      pattern: 'dots',
      link: '/sponsorships/student',
      stats: '850+ Students',
      impact: 'Educational Support'
    },
    {
      title: 'Family Sponsorship',
      description: 'Provide sustainable support to families in need',
      icon: FaHome,
      color: 'from-emerald-500 to-teal-600',
      pattern: 'squares',
      link: '/sponsorships/family',
      stats: '500+ Families',
      impact: 'Sustainable Aid'
    },
    {
      title: 'Medical Sponsorship',
      description: 'Support those requiring ongoing medical treatment',
      icon: FaMedkit,
      color: 'from-rose-500 to-pink-600',
      pattern: 'crosses',
      link: '/sponsorships/medical',
      stats: '300+ Patients',
      impact: 'Healthcare Access'
    },
    {
      title: 'Widow Sponsorship',
      description: 'Empower widows through financial and social support',
      icon: FaHandHoldingHeart,
      color: 'from-amber-500 to-orange-600',
      pattern: 'waves',
      link: '/sponsorships/widow',
      stats: '750+ Widows',
      impact: 'Economic Empowerment'
    },
    {
      title: 'Special Needs',
      description: 'Support individuals with special needs and disabilities',
      icon: FaHandsHelping,
      color: 'from-violet-500 to-purple-600',
      pattern: 'hexagons',
      link: '/sponsorships/special-needs',
      stats: '200+ Individuals',
      impact: 'Specialized Care'
    }
  ];

  // Add new quick sponsor options
  const quickSponsorOptions = [
    {
      title: 'Orphan Care',
      amount: 150,
      period: 'month',
      icon: FaChild,
      color: 'from-purple-500 to-indigo-600',
      pattern: 'circles',
      impact: 'Support basic needs'
    },
    {
      title: 'Education',
      amount: 100,
      period: 'month',
      icon: FaGraduationCap,
      color: 'from-blue-500 to-cyan-600',
      pattern: 'dots',
      impact: 'Enable learning'
    },
    {
      title: 'Healthcare',
      amount: 200,
      period: 'month',
      icon: FaMedkit,
      color: 'from-rose-500 to-pink-600',
      pattern: 'crosses',
      impact: 'Provide medical care'
    },
    {
      title: 'Food Security',
      amount: 75,
      period: 'month',
      icon: FaUtensils,
      color: 'from-amber-500 to-orange-600',
      pattern: 'waves',
      impact: 'Ensure nutrition'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section with Mini Cards */}
      <section className="relative min-h-[800px] overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-900">
        {/* Decorative Patterns */}
        <div className="absolute inset-0 pattern-islamic opacity-10"></div>
        <div className="absolute inset-0 bg-geometric-pattern opacity-5"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-1/4 w-48 h-48 bg-emerald-400/10 rounded-full filter blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 mb-8 backdrop-blur-sm border border-white/20">
              <FaHeart className="text-rose-400 mr-2" />
              <span className="text-white/90">Make a difference in someone's life today</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Lives Through<br />Compassionate Sponsorship
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Join our global community of sponsors and help create lasting change in the lives of those in need
            </p>
          </div>

          {/* Quick Sponsor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickSponsorOptions.map((option, index) => (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Pattern Background */}
                <div className={`absolute inset-0 bg-${option.pattern} opacity-5`}></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative">
                  <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="text-white text-xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{option.impact}</p>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold text-white">${option.amount}</span>
                    <span className="text-white/70 ml-1">/{option.period}</span>
                  </div>
                  
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center group">
                    <span>Quick Sponsor</span>
                    <FaArrowRight className="ml-2 text-sm opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full transform rotate-45"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-tr-full"></div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-white/50" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, location, or cause..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <FaSearch className="mr-2" />
                  <span>Search</span>
                </button>
              </div>
              
              {/* Quick Filter Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Urgent Cases', 'Education', 'Healthcare', 'Nutrition', 'Special Needs'].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-1 rounded-full text-sm bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { icon: FaHandHoldingHeart, text: '10K+ Children Helped' },
              { icon: FaGlobe, text: '25+ Countries' },
              { icon: FaUsers, text: '5K+ Active Sponsors' },
              { icon: FaChartLine, text: '95% Success Rate' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-white/80">
                <item.icon className="text-xl" />
                <span className="text-sm font-medium">{item.text}</span>
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

      {/* New Sponsorship Categories Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50"></div>
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sponsorship Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our various sponsorship programs and make a lasting impact in someone's life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorshipCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Pattern Background */}
                <div className={`absolute inset-0 bg-${category.pattern} opacity-5`}></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl shadow-lg flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="text-white text-2xl" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  {/* Stats and Impact */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-emerald-500" />
                      <span className="text-sm font-medium text-gray-600">{category.stats}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaChartLine className="text-emerald-500" />
                      <span className="text-sm font-medium text-gray-600">{category.impact}</span>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-bl-full transform rotate-45"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-black/5 to-black/0 rounded-tr-full"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Impact Stats with Arabesque Pattern */}
      <section id="impact-stats" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-arabesque-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform ${showImpactStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-700 delay-${index * 200}`}
              >
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mb-4">
                  <stat.icon className="text-emerald-600 text-3xl" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Create a Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-geometric-pattern opacity-5"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <FaPray className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Become Their Guardian</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Join us in our mission to support orphaned children worldwide. Your sponsorship provides them with education, healthcare, and a chance for a brighter future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: FaGift, label: "Monthly Support" },
                { icon: FaHands, label: "Continuous Care" },
                { icon: FaHeartbeat, label: "Lifetime Impact" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-emerald-600 text-2xl" />
                  </div>
                  <p className="text-gray-700 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Sponsorship Benefits Grid */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every sponsorship creates lasting change in a child's life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorshipBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-bl-full transition-all duration-300 group-hover:scale-110"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full flex items-center justify-center mb-6">
                    <benefit.icon className="text-emerald-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-geometric-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Voices of Compassion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg relative group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-full transition-all duration-300 group-hover:scale-110"></div>
                <FaQuoteLeft className="text-emerald-500/20 text-4xl mb-6" />
                <p className="text-gray-600 mb-8 relative z-10 italic">{testimonial.quote}</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-500/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Projects Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden" id="sponsor-now">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a child to sponsor and make a lasting impact on their life
            </p>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="shelter">Shelter</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                >
                  <option value="">All Ages</option>
                  <option value="0-5">0-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="16+">16+ years</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="urgency">Urgency</option>
                  <option value="amount">Amount (Low to High)</option>
                  <option value="completion">Completion %</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaChevronDown className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {['Urgent', 'Featured', 'Education', 'Healthcare', 'Nutrition'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                  onClick={() => setSelectedCategory(tag.toLowerCase())}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {card.status && (
                    <span className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium shadow-lg ${
                      card.status === 'Urgent' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                    }`}>
                      {card.status}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{card.name}</h3>
                    <p className="text-white/90">{card.age} years old</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-emerald-500" />
                      <span className="text-gray-600">{card.location}, {card.country} {card.flag}</span>
                    </div>
                    <div className="bg-emerald-50 px-4 py-2 rounded-full">
                      <span className="text-emerald-600 font-semibold">${card.monthlyAmount}/month</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{card.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-emerald-600 font-medium">{card.completedPercentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                        style={{ width: `${card.completedPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-500">Raised: ${(card.neededAmount * card.completedPercentage / 100).toFixed(0)}</span>
                      <span className="text-gray-500">Goal: ${card.neededAmount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="text-gray-500 text-sm">Available Now</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhoneAlt className="text-gray-400" />
                      <span className="text-gray-500 text-sm">24/7 Support</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                    <span>Sponsor {card.name}</span>
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {sortedCards.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaSearch className="text-6xl mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Load More Button */}
          {sortedCards.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold border-2 border-emerald-500 hover:bg-emerald-50 transition-colors">
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced QC Memberships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-center">
            <img src="/images/certifications/qc-iso.png" alt="ISO Certification" className="h-12 object-contain" />
            <img src="/images/certifications/ecosoc.png" alt="ECOSOC" className="h-12 object-contain" />
            <img src="/images/certifications/start-network.png" alt="Start Network" className="h-12 object-contain" />
            <img src="/images/certifications/sphere.png" alt="Sphere" className="h-12 object-contain" />
            <img src="/images/certifications/membership1.png" alt="Membership" className="h-12 object-contain" />
            <img src="/images/certifications/membership2.png" alt="Membership" className="h-12 object-contain" />
          </div>
        </div>
      </section>

      {/* Enhanced Donation Amounts Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Choose Your Impact Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donationAmounts.map((donation, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-bl-full transition-all duration-300 group-hover:scale-110"></div>
                <div className="relative">
                  <h3 className="text-3xl font-bold text-emerald-600 mb-2">{donation.title}</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4"></div>
                  <p className="text-gray-600 mb-6">{donation.description}</p>
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    {donation.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Custom Donation Amount */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-geometric-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-bl-full"></div>
              <div className="relative">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                  Custom Donation
                </h2>
                <p className="text-gray-600 mb-8 text-center">Choose your own amount to make a difference</p>
                <div className="flex items-center mb-8">
                  <span className="text-3xl font-bold text-emerald-600 mr-4">$</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="flex-1 text-3xl font-bold text-gray-900 px-4 py-3 rounded-lg border-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50"
                    min="1"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold flex items-center justify-center space-x-2">
                  <span>Donate Now</span>
                  <FaHeart className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Quick Actions Section */}
      <section className="py-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaHeart, title: 'Sponsor Now', description: 'Choose a child to sponsor', link: '#sponsor-now' },
              { icon: FaGift, title: 'Make a Donation', description: 'Support our programs', link: '#donate' },
              { icon: FaHandshake, title: 'Get Involved', description: 'Join our community', link: '#volunteer' }
            ].map((action, index) => (
              <a
                key={index}
                href={action.link}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <action.icon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* New Video Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">See Your Impact</h2>
              <p className="text-gray-600 text-lg mb-8">
                Watch how your sponsorship transforms lives and creates lasting change in communities around the world.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Lives Changed', value: '10,000+' },
                  { label: 'Success Rate', value: '95%' },
                  { label: 'Communities Served', value: '50+' },
                  { label: 'Years of Impact', value: '15+' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-2xl font-bold text-emerald-600">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/your-video-id"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Success Stories Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-geometric-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories of transformation through your generous support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-48">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{story.name}, {story.age}</h3>
                    <p className="text-emerald-400">{story.achievement}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{story.story}</p>
                  <button className="mt-4 text-emerald-600 font-medium hover:text-emerald-700 transition-colors flex items-center">
                    Read Full Story
                    <FaArrowRight className="ml-2 text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about our sponsorship program</p>
          </div>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Make a Difference Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Your support can transform a child's life. Join our community of compassionate sponsors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-900 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
                Sponsor a Child
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsorships; 