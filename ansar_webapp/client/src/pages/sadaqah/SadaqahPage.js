import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaArrowRight, FaCalendarAlt, FaMoneyBillWave, FaRegCalendarCheck, FaUsers, FaUtensils, FaWater, FaMosque, FaGraduationCap, FaShieldAlt, FaInfinity } from 'react-icons/fa';

// Import components (assuming they exist)
import DonationCard from '../../components/sadaqah/DonationCard';
import SadaqahTypeCard from '../../components/sadaqah/SadaqahTypeCard';
import DonationForm from '../../components/sadaqah/DonationForm';

// Import mock data
import sadaqahPageData from '../../data/sadaqahPageData.json';

const iconMap = {
  FaHeart,
  FaHandHoldingHeart,
  FaArrowRight,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaRegCalendarCheck,
  FaUsers,
  FaUtensils,
  FaWater,
  FaMosque,
  FaGraduationCap,
  FaShieldAlt,
  FaInfinity
};

function getIconByName(name) {
  return iconMap[name] || null;
}

const SadaqahPage = () => {
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false); // No longer loading since we're using mock data
  const [tabs, setTabs] = useState(sadaqahPageData.tabs);
  const [hero, setHero] = useState(sadaqahPageData.hero);
  const [heroLoading, setHeroLoading] = useState(false);
  const [sectionHeadings, setSectionHeadings] = useState(sadaqahPageData.sectionHeadings);
  const [sadaqahOptions, setSadaqahOptions] = useState(sadaqahPageData.sadaqahOptions);
  const [benefits, setBenefits] = useState(sadaqahPageData.benefits);
  const [faq, setFaq] = useState(sadaqahPageData.faq);
  const [cta, setCta] = useState(sadaqahPageData.cta);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('sadaqah');
  const [popularOptions, setPopularOptions] = useState(sadaqahPageData.hero.popularOptions);
  
  // Extended tabs based on Qatar Charity website (memoized for stable reference)
  const defaultTabs = useMemo(() => [
    { id: 'general', label: 'General Sadaqah' },
    { id: 'immediate', label: 'Immediate Needs' },
    { id: 'periodic', label: 'Periodic Donation' },
    { id: 'kafarat', label: 'Kafarat & Fidyah' },
    { id: 'aqiqah', label: 'Aqiqah & Sacrifice' },
    { id: 'specific', label: 'Specific Projects' }
  ], []);

  // Extract query parameters
  useEffect(() => {
    // Get query parameters
    const params = new URLSearchParams(location.search);
    const amount = params.get('amount');
    const category = params.get('category');
    
    // If we have an amount and category (e.g., from ZakatCalculator)
    if (amount && category) {
      // Set the active tab based on category, if possible
      if (category === 'Zakat' && defaultTabs.some(tab => tab.id === 'kafarat')) {
        setActiveTab('kafarat');
      }
      
      // Store the amount and category for the donation form
      setDonationAmount(amount);
      setDonationType(category.toLowerCase());
      
      // You might want to scroll to the donation form
      const donationForm = document.getElementById('donation-form');
      if (donationForm) {
        setTimeout(() => {
          donationForm.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
    }
  }, [location.search, defaultTabs]);

  // Using mock data directly, no API calls needed
  useEffect(() => {
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
    
    // Set page title
    document.title = 'Sadaqah | Ansar Relief';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fadingContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };
  
  const fadingChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="sadaqah-page" style={{ position: 'relative' }}>
      {/* Hero Section */}
      {heroLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-primary-600 font-medium">Loading hero...</p>
          </div>
        </div>
      ) : hero && (
        <section 
          className="relative bg-primary-900 overflow-hidden" 
          style={{ 
            marginTop: "110px",
            paddingTop: "6rem",
            paddingBottom: "6rem"
          }}
        >
          {/* ...existing code for decorative elements, pattern overlay, background image ... */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-300"></span>
                    </span>
                    {hero.tagline}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                    {hero.heading && (
                      <span dangerouslySetInnerHTML={{ __html: hero.heading }} />
                    )}
                  </h1>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    {hero.subheading}
                  </p>
                  {/* Hadith Quote */}
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl mb-8 border-l-4 border-primary-400 shadow-lg">
                    <p className="text-white/90 italic text-lg">
                      {hero.hadith}
                    </p>
                    <p className="text-white/70 text-sm mt-2 font-medium">{hero.hadithSource}</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {hero.buttons && hero.buttons[0] && (
                      <motion.a 
                        href={hero.buttons[0].anchor} 
                        className="px-6 py-3.5 bg-white text-primary-700 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaHandHoldingHeart className="mr-2" />
                        {hero.buttons[0].text}
                      </motion.a>
                    )}
                    {hero.buttons && hero.buttons[1] && (
                      <motion.a 
                        href={hero.buttons[1].anchor} 
                        className="px-6 py-3.5 border-2 border-white text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaMoneyBillWave className="mr-2" />
                        {hero.buttons[1].text}
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 bg-white/10 p-4 rounded-xl text-center backdrop-blur-sm border border-white/10">
                      <h3 className="text-white text-lg font-medium mb-1">{hero.popularTitle}</h3>
                      <p className="text-white/70 text-sm">{hero.popularSubtitle}</p>
                    </div>
                    {popularOptions && popularOptions.length > 0 && popularOptions.map((option, idx) => (
                      <motion.div 
                        key={option.id || idx}
                        className="bg-white/10 p-5 rounded-xl text-center hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm border border-white/10"
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                      >
                        <div className="bg-primary-500/30 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                          {getIconByName(option.iconName) ? React.createElement(getIconByName(option.iconName), { className: 'text-white', size: 22 }) : null}
                        </div>
                        <h4 className="text-white font-medium">{option.title}</h4>
                        <p className="text-white/70 text-xs mt-1">{option.subtitle}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {/* ...existing code for wave separator... */}
        </section>
      )}

      {/* Main Content */}
      {/* Sadaqah Options Section */}
      {sectionHeadings && sadaqahOptions && tabs.length > 0 && (
        <section id="sadaqah-options" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{sectionHeadings.chooseTypeTitle}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {sectionHeadings.chooseTypeSubtitle}
              </p>
            </div>
            <div className="mb-12 overflow-x-auto">
              <div className="bg-white rounded-xl shadow-md inline-flex min-w-full">
                <div className="flex flex-nowrap p-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white shadow-md transform scale-105'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                      } sm:w-auto text-center relative`}
                    >
                      {activeTab === tab.id && (
                        <motion.div 
                          className="absolute inset-0 bg-primary-600 rounded-lg -z-10"
                          layoutId="activeTabBackground"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Tab Content */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
                  <p className="text-primary-600 font-medium">Loading options...</p>
                </div>
              </div>
            ) : (
              <div>
                {activeTab === 'general' && sadaqahOptions.general && (
                  <motion.div
                    variants={fadingContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {sadaqahOptions.general.map((option) => (
                      <motion.div key={option.id} variants={fadingChildVariants}>
                        <SadaqahTypeCard option={option} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                {activeTab === 'immediate' && sadaqahOptions.immediate && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{sectionHeadings.immediateTitle}</h2>
                    <p className="text-gray-600 mb-8 max-w-3xl">
                      {sectionHeadings.immediateSubtitle}
                    </p>
                    <motion.div
                      variants={fadingContainerVariants}
                      initial="hidden"
                      animate="visible" 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                      {sadaqahOptions.immediate.map((option) => (
                        <motion.div key={option.id} variants={fadingChildVariants}>
                          <DonationCard option={option} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
                {activeTab === 'periodic' && sadaqahOptions.periodic && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{sectionHeadings.periodicTitle}</h2>
                    <p className="text-gray-600 mb-8 max-w-3xl">
                      {sectionHeadings.periodicSubtitle}
                    </p>
                    <motion.div
                      variants={fadingContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                      {sadaqahOptions.periodic.map((option) => (
                        <motion.div key={option.id} variants={fadingChildVariants}>
                          <SadaqahTypeCard option={option} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
                {activeTab === 'kafarat' && sadaqahOptions.kafarat && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{sectionHeadings.kafaratTitle}</h2>
                    <p className="text-gray-600 mb-8 max-w-3xl">
                      {sectionHeadings.kafaratSubtitle}
                    </p>
                    <motion.div
                      variants={fadingContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                      {sadaqahOptions.kafarat.map((option) => (
                        <motion.div key={option.id} variants={fadingChildVariants}>
                          <SadaqahTypeCard option={option} fixedAmount={true} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
                {activeTab === 'aqiqah' && sadaqahOptions.aqiqah && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{sectionHeadings.aqiqahTitle}</h2>
                    <p className="text-gray-600 mb-8 max-w-3xl">
                      {sectionHeadings.aqiqahSubtitle}
                    </p>
                    <motion.div
                      variants={fadingContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                      {sadaqahOptions.aqiqah.map((option) => (
                        <motion.div key={option.id} variants={fadingChildVariants}>
                          <SadaqahTypeCard option={option} fixedAmount={true} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
                {activeTab === 'specific' && sadaqahOptions.specific && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{sectionHeadings.specificTitle}</h2>
                    <p className="text-gray-600 mb-8 max-w-3xl">
                      {sectionHeadings.specificSubtitle}
                    </p>
                    <motion.div
                      variants={fadingContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                      {sadaqahOptions.specific.map((option) => (
                        <motion.div key={option.id} variants={fadingChildVariants}>
                          <DonationCard option={option} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Donation Form Section */}
      {/* Donation Form Section */}
      {sectionHeadings && (
        <section id="donation-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{sectionHeadings.donationFormTitle}</h2>
                <p className="text-gray-600">
                  {sectionHeadings.donationFormSubtitle}
                </p>
              </div>
              <DonationForm 
                initialAmount={donationAmount} 
                initialDonationType={donationType}
              />
            </div>
          </div>
        </section>
      )}

      {/* Sadaqah Benefits Section */}
      {/* Sadaqah Benefits Section */}
      {sectionHeadings && benefits && (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full -mr-32 -mt-32 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-100 rounded-full -ml-32 -mb-32 opacity-70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase bg-primary-50 py-1 px-3 rounded-full mb-3 inline-block">{sectionHeadings.benefitsTagline}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{sectionHeadings.benefitsTitle}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                {sectionHeadings.benefitsSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group"
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -mr-16 -mt-16 transform group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="bg-primary-100 p-4 w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-primary-600 shadow-md group-hover:bg-primary-200 transition-colors duration-300 transform group-hover:rotate-6 transition-transform">
                      {benefit.iconName && getIconByName(benefit.iconName) ? React.createElement(getIconByName(benefit.iconName), { className: 'text-primary-600', size: 28 }) : null}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {/* FAQ Section */}
      {sectionHeadings && faq && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase bg-primary-50 py-1 px-3 rounded-full mb-3 inline-block">{sectionHeadings.faqTagline}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{sectionHeadings.faqTitle}</h2>
                <p className="text-gray-600 text-lg">
                  {sectionHeadings.faqSubtitle}
                </p>
              </div>
              <div className="space-y-6">
                {faq.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                      <span className="flex-shrink-0 bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold">Q</span>
                      </span>
                      {item.question}
                    </h3>
                    <div className="ml-11">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to="/faq" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  View all FAQs
                  <svg className="ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {/* Call to Action Section */}
      {cta && (
        <section className="py-20 bg-primary-900 relative overflow-hidden">
          {/* ...existing code for background, rays, etc... */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                  {cta.tagline}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {cta.hadith && `"${cta.hadith}"`}
                </h2>
                <p className="text-xl text-white/80 mb-12 italic font-medium">
                  {cta.source && `- ${cta.source}`}
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-10 shadow-xl border border-white/20">
                  <p className="text-white/90 text-lg leading-relaxed">
                    {cta.text}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/sadaqah/donate"
                    className="inline-block px-10 py-5 bg-white text-primary-700 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 text-lg"
                  >
                    {cta.button}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SadaqahPage;