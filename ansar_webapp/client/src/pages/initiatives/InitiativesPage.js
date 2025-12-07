import React, { useState, useEffect } from 'react';
import { useDonation } from '../../contexts/DonationContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaChevronRight, FaArrowRight, FaDonate, FaSearch, FaHandsHelping, FaHeartbeat, FaSchool, FaWater 
} from 'react-icons/fa';
import InitiativeCard from '../../components/initiatives/InitiativeCard';
import ImpactStat from '../../components/initiatives/ImpactStat';
import TestimonialCard from '../../components/initiatives/TestimonialCard';
import SectionHeading from '../../components/common/SectionHeading';
import initiativesService from '../../services/initiatives.service';
import './InitiativesPage.css';

// Define placeholder image URLs instead of importing
const heroImage = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1500&q=80';

const InitiativesPage = () => {
  const [pageData, setPageData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [donationType, setDonationType] = useState('single');
  const [donationAmount, setDonationAmount] = useState(100);
  const [navbarHeight, setNavbarHeight] = useState(60);
  const { openQuickDonateWithUrgentNeed } = useDonation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await initiativesService.getInitiativesPageData();
        setPageData(data);
      } catch (err) {
        setPageData(null);
      }
    };
    fetchData();

    const navbar = document.querySelector('header') || document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    const handleResize = () => {
      const navbar = document.querySelector('header') || document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    document.title = "Initiatives & Programs | Ansar Organization";
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { hero, categories, initiatives, testimonials, impactStats, whatWeDo, valuesAndPrinciples, campaigns, donationFields, uiText } = pageData || {};

  const filteredInitiatives = React.useMemo(() => {
    if (!initiatives) return [];
    if (activeCategory === 'all') return initiatives;
    return initiatives.filter(initiative => {
      if (!initiative.category) return false;
      if (typeof initiative.category === 'string') {
        return (
          initiative.category.toLowerCase() === activeCategory.toLowerCase() ||
          initiative.category.toLowerCase() ===
            (categories?.find(c => c.id === activeCategory)?.name || '').toLowerCase()
        );
      }
      if (typeof initiative.category === 'object') {
        return (
          initiative.category.id === activeCategory ||
          initiative.category.name?.toLowerCase() ===
            (categories?.find(c => c.id === activeCategory)?.name || '').toLowerCase()
        );
      }
      return false;
    });
  }, [initiatives, activeCategory, categories]);

  // Icon mapping for dynamic icon rendering
  const iconMap = {
    FaDonate: FaDonate,
    FaChevronRight: FaChevronRight,
    FaArrowRight: FaArrowRight,
    FaHandsHelping: FaHandsHelping,
    FaHeartbeat: FaHeartbeat,
    FaSchool: FaSchool,
    FaWater: FaWater,
    FaMosque: require('react-icons/fa').FaMosque,
    FaUsers: require('react-icons/fa').FaUsers,
    FaHospital: require('react-icons/fa').FaHospital,
    FaGraduationCap: require('react-icons/fa').FaGraduationCap,
    FaHandshake: require('react-icons/fa').FaHandshake,
    FaHandHoldingHeart: require('react-icons/fa').FaHandHoldingHeart,
    FaUtensils: require('react-icons/fa').FaUtensils,
    FaBook: require('react-icons/fa').FaBook,
    FaChild: require('react-icons/fa').FaChild,
    // Add more mappings as needed
  };

  if (!pageData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="initiatives-page">
      {/* Hero Section */}
      <section 
        className="hero-section relative flex items-center justify-center"
        style={{ 
          marginTop: `${navbarHeight}px`,
          paddingTop: "20rem", 
          paddingBottom: "12rem",
          minHeight: "100vh"
        }}
      >
        <div className="absolute inset-0 hero-overlay z-10"></div>
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={hero?.image} 
            alt="Initiatives Hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
        <div className="container mx-auto px-4 relative z-20 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="badge-light inline-block mb-4">
              <span className="mr-2">✦</span>
              {hero?.subtitle}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight hero-title">
              {hero?.title}
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-xl">
              {hero?.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              {hero?.buttons?.map((btn, idx) => (
                <Link 
                  key={idx}
                  to={btn.link} 
                  className={idx === 0 ? "btn-primary group flex items-center" : "btn-secondary group flex items-center"}
                >
                  {btn.label}
                  <FaChevronRight className="ml-2 group-hover:ml-3 transition-all" />
                </Link>
              ))}
            </div>
            {/* Stats Highlight Band */}
            <div className="mt-22 mb-10 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <div className="grid grid-cols-3 gap-4">
                {hero?.stats?.map((stat, idx) => (
                  <div key={idx} className="text-center stat-card py-2">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Donation Panel */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex items-center">
              <div className="md:w-1/2 p-8 md:p-10 text-white">
                <h2 className="text-2xl font-bold mb-4">Make a Donation Today</h2>
                <p className="mb-6 opacity-90">
                  Your contribution can make a real difference in the lives of those in need.
                  Choose how you want to help.
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => openQuickDonateWithUrgentNeed({
                      type: 'quick',
                      label: 'Quick Donate',
                      sourcePage: window.location.pathname,
                      title: hero?.title,
                      subtitle: hero?.subtitle,
                      description: hero?.description
                    })}
                  >
                    Donate Now
                  </button>
                  <Link 
                    to="/zakat" 
                    className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
                  >
                    Calculate Zakat
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8 bg-white">
                <div className="mb-4">
                  <div className="flex rounded-md overflow-hidden mb-6 border border-gray-200">
                    <button 
                      className={`flex-1 py-2 text-center text-sm font-medium ${donationType === 'single' ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600'}`}
                      onClick={() => setDonationType('single')}
                    >
                      Single Donation
                    </button>
                    <button 
                      className={`flex-1 py-2 text-center text-sm font-medium ${donationType === 'periodic' ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600'}`}
                      onClick={() => setDonationType('periodic')}
                    >
                      Periodic Donation
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[50, 100, 300, 500].map(amount => (
                    <button 
                      key={amount}
                      className={`amount-btn ${donationAmount === amount ? 'active' : ''}`}
                      onClick={() => setDonationAmount(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <button
                  type="button"
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center font-medium"
                  onClick={() => openQuickDonateWithUrgentNeed({
                    type: 'quick',
                    label: 'Quick Donate',
                    sourcePage: window.location.pathname,
                    title: hero?.title,
                    subtitle: hero?.subtitle,
                    description: hero?.description,
                    amount: donationAmount
                  })}
                >
                  <FaDonate className="mr-2" />
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats - Dynamic Heading */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            title={uiText?.impactStatsSection?.title}
            subtitle={uiText?.impactStatsSection?.subtitle}
            tag={uiText?.impactStatsSection?.tag}
            titleColor="primary"
            tagColor="primary"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <ImpactStat
                key={index}
                number={stat.number}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <div className="mt-14 text-center">
            <Link 
              to="/about/our-impact" 
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              View our annual impact report
              <FaChevronRight className="ml-1 text-sm" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-primary-200 opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-primary-200 opacity-50"></div>
        <motion.div 
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-50 opacity-30"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -left-20 top-20 w-64 h-64 rounded-full bg-primary-100 opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </section>

      {/* What We Do Section - Dynamic Heading */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-primary-50 opacity-30"></div>
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-primary-100 opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            title={uiText?.whatWeDoSection?.title}
            subtitle={uiText?.whatWeDoSection?.subtitle}
            tag={uiText?.whatWeDoSection?.tag}
            titleColor="primary"
            tagColor="primary"
            showDivider={uiText?.whatWeDoSection?.showDivider}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {whatWeDo.map((item, index) => {
              const IconComponent = iconMap[item.iconName] || FaDonate;
              return (
                <motion.div 
                  key={index}
                  className="approach-card bg-white rounded-xl shadow-md overflow-hidden group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  {/* Top gradient bar */}
                  <div className={`h-2 bg-gradient-to-r ${item.gradient} w-full`}></div>
                  <div className="p-8 relative">
                    {/* Background pattern */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                      style={{ 
                        backgroundImage: item.bgPattern,
                        backgroundSize: item.bgSize
                      }}
                    ></div>
                    {/* Icon with circular background */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-md border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                        <div className={`text-gradient bg-gradient-to-r ${item.gradient} text-4xl`}>
                          <IconComponent />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <h3 className="text-xl font-bold text-center mb-4 text-gray-800 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {item.description}
                    </p>
                    {/* Stats with decorative line */}
                    <div className="flex items-center justify-center mb-2">
                      <span className="inline-block w-8 h-0.5 bg-primary-200 rounded-full mr-2"></span>
                      <span className="text-xs text-primary-600 font-semibold">{item.stats}</span>
                      <span className="inline-block w-8 h-0.5 bg-primary-200 rounded-full ml-2"></span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="md:flex items-center">
              <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Our Values & Principles</h3>
                <div className="grid grid-cols-2 gap-4">
                  {valuesAndPrinciples.map((value, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 mr-2"></div>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-2/5">
                <Link
                  to="/about"
                  className="block w-full py-3 px-6 bg-primary-600 text-white text-center rounded-md font-medium hover:bg-primary-700 transition-colors"
                >
                  Learn More About Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Initiatives - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={uiText?.featuredInitiativesSection?.title}
            subtitle={uiText?.featuredInitiativesSection?.subtitle}
            tag={uiText?.featuredInitiativesSection?.tag}
            titleColor="primary"
            tagColor="primary"
          />
          
          {/* Categories with improved styling */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => {
                const CatIcon = iconMap[category.iconName] || FaDonate;
                // Map category names to explicit paths
                const categoryLinks = {
                  'Education': '/projects/categories/education',
                  'Water': '/projects/categories/water',
                  'Relief': '/projects/categories/relief',
                  'Mosques': '/projects/categories/mosques',
                  'Income': '/projects/categories/income',
                  'Housing': '/projects/categories/housing',
                  'Health': '/projects/categories/health',
                  'Orphan Sponsorship': '/sponsorship/orphan',
                  'Student Sponsorship': '/sponsorship/student',
                  'Family Sponsorship': '/sponsorship/family',
                  'Teacher Sponsorship': '/sponsorship/teacher',
                  'Special Needs Sponsorship': '/sponsorship/special-needs',
                };
                const link = categoryLinks[category.name] || '#';
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-0 py-0 rounded-full flex items-center text-sm font-medium transition-all`}
                  >
                    <Link
                      to={link}
                      className={`px-5 py-2.5 rounded-full flex items-center text-sm font-medium w-full h-full ${
                        activeCategory === category.id
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                      style={{ textDecoration: 'none' }}
                    >
                      <CatIcon className="mr-2" />
                      {category.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Initiatives Grid with staggered animations */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <InitiativeCard initiative={initiative} />
              </motion.div>
            ))}
          </motion.div>
          {/* No results message */}
          {filteredInitiatives.length === 0 && (
            <div className="text-center py-10">
              <div className="text-gray-400 text-5xl mb-4">
                <FaSearch className="inline-block" />
              </div>
              <h3 className="text-xl font-bold mb-2">No initiatives found</h3>
              <p className="text-gray-600">
                We couldn't find any initiatives in this category. Please try another category or check back later.
              </p>
              <button 
                className="mt-4 px-4 py-2 bg-gray-100 rounded-md font-medium"
                onClick={() => setActiveCategory('all')}
              >
                View all initiatives
              </button>
            </div>
          )}
          
          {/* View All Button */}
          {initiatives.length > 0 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors shadow-md"
              >
                Back to Top
                <FaArrowRight className="ml-2 transform rotate-[-90deg]" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-20 testimonial-section relative">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            title={uiText?.testimonialsSection?.title}
            subtitle={uiText?.testimonialsSection?.subtitle}
            tag={uiText?.testimonialsSection?.tag}
            titleColor="primary"
            tagColor="primary"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
          
          {/* Testimonial stats */}
          <div className="mt-16 bg-white rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {[
                { 
                  label: "Satisfaction Rating", 
                  value: "98%", 
                  description: "From beneficiaries surveyed"
                },
                { 
                  label: "Success Stories", 
                  value: "5000+", 
                  description: "Documented over 25 years"
                },
                { 
                  label: "Communities Transformed", 
                  value: "120+", 
                  description: "Across multiple regions"
                }
              ].map((stat, index) => (
                <div key={index} className="text-center px-4 py-4 md:py-0">
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary-600 my-1">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/testimonials"
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              View more success stories
              <FaChevronRight className="ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-30">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="40" stroke="#009688" strokeWidth="2" strokeDasharray="10 5"/>
            <circle cx="60" cy="60" r="20" fill="#E0F2F1"/>
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-30">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="60" transform="translate(10 10)" stroke="#009688" strokeWidth="2"/>
            <rect width="30" height="30" transform="translate(25 25)" fill="#E0F2F1"/>
          </svg>
        </div>
      </section>

      {/* Current Campaigns - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-primary-50 rounded-full opacity-30"></div>
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-primary-50 rounded-full opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            title={uiText?.campaignsSection?.title}
            subtitle={uiText?.campaignsSection?.subtitle}
            tag={uiText?.campaignsSection?.tag}
            titleColor="primary"
            tagColor="primary"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={index}
                className="feature-box group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <span className="text-white text-xs bg-primary-600 px-2 py-0.5 rounded-sm">{campaign.ref}</span>
                    <h3 className="font-bold text-lg text-white mt-2">{campaign.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                      onClick={() => openQuickDonateWithUrgentNeed({
                        ...campaign,
                        sourcePage: window.location.pathname,
                        cardName: campaign.title,
                        cardCategory: campaign.category,
                        cardAmount: campaign.amount,
                        cardDescription: campaign.description,
                        cardTitle: campaign.title,
                        cardSubtitle: campaign.subtitle
                      })}
                    >
                      Donate Now
                      <FaChevronRight className="ml-1 text-sm" />
                    </button>
                    <span className="text-gray-500 text-sm">
                      <span className="font-semibold">70%</span> funded
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-primary-600 h-full rounded-full" style={{ width: `${70}%` }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Campaigns Button */}
          <div className="text-center mt-12">
            <Link 
              to="/campaigns"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
            >
              View All Campaigns
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Fields Section - Dynamic Heading */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -left-20 top-20 w-72 h-72 rounded-full bg-primary-50 opacity-40"></div>
        <div className="absolute -right-20 bottom-20 w-72 h-72 rounded-full bg-primary-50 opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            title={uiText?.donationFieldsSection?.title}
            subtitle={uiText?.donationFieldsSection?.subtitle}
            tag={uiText?.donationFieldsSection?.tag}
            titleColor="primary"
            tagColor="primary"
            size="large"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationFields?.map((field, index) => {
              const IconComponent = iconMap[field.iconName] || FaDonate;
              // Map donation field name to static project category route
              const donationFieldLinks = {
                'mosques': '/projects/categories/mosques',
                'housing the poor': '/projects/categories/housing',
                'water': '/projects/categories/water',
                'health': '/projects/categories/health',
                'education': '/projects/categories/education',
                'income generation': '/projects/categories/income',
                'relief': '/projects/categories/relief',
                'food security': '/projects/categories/relief',
              };
              const fieldKey = field.name ? field.name.trim().toLowerCase() : '';
              const link = donationFieldLinks[fieldKey] || '#';
              return (
                <motion.div
                  key={index}
                  className="donation-field-card bg-white rounded-xl shadow-md overflow-hidden group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  {/* Top gradient bar */}
                  <div className={`h-2 bg-gradient-to-r ${field.gradient} w-full`}></div>
                  <div className="p-6 pb-4">
                    {/* Icon with circular background */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                        <div className={`text-gradient bg-gradient-to-r ${field.gradient} text-4xl`}>
                          <IconComponent />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <h3 className="text-xl font-bold text-center mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">
                      {field.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-4 line-clamp-2 h-10">
                      {field.description}
                    </p>
                    {/* Stats */}
                    <div className="flex justify-between text-xs text-gray-500 mb-4 px-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary-400 mr-1"></div>
                        <span>{field.projects} Projects</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></div>
                        <span>{field.impact}</span>
                      </div>
                    </div>
                  </div>
                  {/* Action footer */}
                  <div className="border-t border-gray-100 p-4 bg-gray-50 group-hover:bg-primary-50 transition-colors flex items-center justify-between">
                    <Link 
                      to={link}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    >
                      View Projects
                      <FaChevronRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all" />
                    </Link>
                    <button
                      type="button"
                      className="px-3 py-1 bg-white text-primary-600 text-sm rounded-full border border-primary-200 shadow-sm hover:bg-primary-600 hover:text-white transition-colors"
                      onClick={() => openQuickDonateWithUrgentNeed({
                        ...field,
                        sourcePage: window.location.pathname,
                        cardName: field.name,
                        cardCategory: field.category,
                        cardAmount: field.amount,
                        cardDescription: field.description,
                        cardTitle: field.name,
                        cardSubtitle: field.subtitle
                      })}
                    >
                      Donate
                    </button>
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-transparent to-white/0 via-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              );
            })}
          </div>
          {/* Call to action */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link 
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors shadow-md"
            >
              Browse All Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Daily Sadaqa Section - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        <motion.div 
          className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-primary-100 opacity-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <span className="badge-primary inline-block mb-4">
                  Daily Sadaqa
                </span>
                <h2 className="text-3xl font-bold mb-4 section-title">Daily Sadaqa Program</h2>
                <p className="mb-6 text-gray-600">
                  A special donation program that allows enrolled donors to automatically donate an 
                  agreed amount every day, to support a need every day, and enrich your days with a daily Sadaqah.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 mr-3">
                      <FaChevronRight className="text-primary-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Automatically donate an amount of your choice daily</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 mr-3">
                      <FaChevronRight className="text-primary-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Support various charitable causes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 mr-3">
                      <FaChevronRight className="text-primary-600 text-xs" />
                    </div>
                    <span className="text-gray-700">Earn continuous rewards through consistent giving</span>
                  </li>
                </ul>
                <button className="px-8 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors shadow-md">
                  Subscribe Now
                </button>
              </div>
              <div className="md:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" 
                  alt="Daily Sadaqa" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 to-primary-600/10"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-primary-600 font-bold">QAR</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl">500,000+</p>
                      <p className="text-white/80 text-sm">Daily donations collected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Call to Action */}
      <section className="py-20 cta-section text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Us in <span className="highlight-text">Making a Difference</span>
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your support can transform lives and communities. Together, we can create lasting positive change.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                type="button"
                className="bg-white text-primary-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors shadow-md"
                onClick={() => openQuickDonateWithUrgentNeed({
                  type: 'quick',
                  label: 'Quick Donate',
                  sourcePage: window.location.pathname,
                  title: hero?.title,
                  subtitle: hero?.subtitle,
                  description: hero?.description
                })}
              >
                Donate Now
              </button>
              <Link 
                to="/volunteer" 
                className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors"
              >
                Volunteer
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InitiativesPage;