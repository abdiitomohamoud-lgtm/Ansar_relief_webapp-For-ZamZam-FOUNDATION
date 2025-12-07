import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHeart, FaUsers, FaWater, FaGraduationCap, FaUtensils, FaMosque, 
  FaHandsHelping, FaCheck, FaMedkit, FaBreadSlice, FaHandHoldingHeart,
  FaArrowRight, FaQuoteLeft, FaStar, FaPlay, FaDownload, FaMobileAlt,
  FaRegClock, FaGlobe, FaHome, FaMoneyBillWave
} from 'react-icons/fa';

// Import mock data
import homePageData from '../data/homePageData.json';

// Import components
import HeroSlider from '../components/home/HeroSlider';
import CampaignCard from '../components/campaigns/CampaignCard';
import ImpactCounter from '../components/home/ImpactCounter';
import UrgentCaseCard from '../components/home/UrgentCaseCard';
import ProgramCard from '../components/home/ProgramCard';
import HowWeWorkStep from '../components/home/HowWeWorkStep';
import TestimonialCard from '../components/home/TestimonialCard';
import PartnerLogo from '../components/home/PartnerLogo';
import NewsCard from '../components/home/NewsCard';
import DonationCategories from '../components/home/DonationCategories';
import LatestNews from '../components/home/LatestNews';
import TestimonialsSection from '../components/home/TestimonialsSection';
import DecorativeDivider from '../components/common/DecorativeDivider';

// ICONS mapping
const ICONS = {
  FaHeart, FaUsers, FaWater, FaGraduationCap, FaUtensils, FaMosque, 
  FaHandsHelping, FaCheck, FaMedkit, FaBreadSlice, FaHandHoldingHeart,
  FaArrowRight, FaQuoteLeft, FaStar, FaPlay, FaDownload, FaMobileAlt,
  FaRegClock, FaGlobe, FaHome, FaMoneyBillWave
};

// Mock function for openQuickDonateWithUrgentNeed
const openQuickDonateWithUrgentNeed = (data) => {
  console.log('Open quick donate with urgent need:', data);
  // In a real implementation, this would open the donation panel
  // For now, we'll just show an alert
  alert(`Opening donation panel for: ${data.title}\nAmount needed: $${data.amount || data.goal}`);
};

const Home = () => {
  const [heroSlides] = useState(homePageData.heroSlides);
  const [impactStats] = useState(homePageData.impactStats);
  const [urgentCases] = useState(homePageData.urgentCases);
  const [currentCampaigns] = useState(homePageData.currentCampaigns);
  const [programs] = useState(homePageData.programs);
  const [sadaqahTypes] = useState(homePageData.sadaqahTypes);
  const [sponsorshipPrograms] = useState(homePageData.sponsorshipPrograms);
  const [howWeWorkSteps] = useState(homePageData.howWeWorkSteps);
  const [appInfo] = useState(homePageData.appInfo);
  const [news] = useState(homePageData.news);
  const [testimonials] = useState(homePageData.testimonials);
  const [partners] = useState(homePageData.partners);

  // Safe access to impact stats with fallback values
  const safeImpactStats = {
    beneficiaries: impactStats?.beneficiaries || 0,
    countries: impactStats?.countries || 0,
    projects: impactStats?.projects || 0,
    volunteers: impactStats?.volunteers || 0
  };

  // Using mock data directly, no API calls needed
  useEffect(() => {
    // Set document title
    document.title = "Ansar Relief - Empowering Communities Through Compassionate Service";
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div>
        <HeroSlider heroSlides={heroSlides} />
      </div>

      {/* Decorative divider with pattern */}
      <div className="relative z-10 -mt-2">
        <DecorativeDivider color="primary" pattern="islamic-star" />
      </div>
      
      {/* Quick Programs Links Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots pattern-opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-3">
              Our Programs
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Supporting <span className="text-primary-600">Communities</span> Across the Globe
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm mb-6">
              Choose from our range of programs designed to create lasting impact in communities around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {programs.map((program, index) => (
              <ProgramCard key={index} program={program} ICONS={ICONS} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Urgent Cases Section - Slightly reduced padding */}
      <section className="py-14 bg-gradient-to-b from-white to-red-50/30 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-red-50 opacity-30"></div>
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-red-50 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-4 shadow-sm">
              Urgent Needs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cases that Need <span className="text-red-600">Immediate</span> Attention
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These critical cases require urgent support. Your immediate donation can make the difference between life and death for vulnerable individuals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {urgentCases.map((kase, index) => (
              <UrgentCaseCard key={kase.id} kase={kase} openQuickDonateWithUrgentNeed={openQuickDonateWithUrgentNeed} />
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-red-50 to-red-100/60 rounded-xl overflow-hidden border border-red-100 flex flex-col justify-center items-center p-8 h-full shadow-lg"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <FaHeart size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Have an urgent case?</h3>
              <p className="text-center text-gray-600 mb-6 max-w-xs">
                Contact our emergency response team if you know someone in urgent need
              </p>
              <Link
                to="/contact"
                className="bg-white text-red-600 hover:bg-red-600 hover:text-white py-3 px-6 rounded-lg border border-red-200 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
              >
                Submit a Case
              </Link>
            </motion.div>
          </div>
          
          <div className="text-center">
            <Link
              to="/campaigns"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium group"
            >
              View all urgent cases
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative divider with accent color */}
      <DecorativeDivider color="accent" pattern="dots" />
      
      {/* Sadaqah Types Section */}
      <section className="py-14 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic pattern-opacity-5"></div>
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-orange-50 opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-orange-50 opacity-30 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4 shadow-sm">
              Sadaqah Options
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Give <span className="text-orange-600">Sadaqah</span> Your Way
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose from multiple ways to give Sadaqah and multiply your rewards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {sadaqahTypes.map((sadaqah, index) => {
              const Icon = ICONS[sadaqah.icon] || FaHeart;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-orange-100 hover:border-orange-200 transition-all duration-300 group h-full flex flex-col"
                >
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 mb-6 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-orange-500 group-hover:text-orange-600 transition-colors">
                      <Icon className="text-orange-500" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{sadaqah.title}</h3>
                  <p className="text-gray-600 mb-5">{sadaqah.description}</p>
                  <div className="overflow-hidden rounded-xl mb-5 h-36 mt-auto">
                    <img
                      src={`${sadaqah.image || `/images/sadaqah/${sadaqah.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}`}
                      alt={sadaqah.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = index % 2 === 0
                          ? `/images/campaigns/water-project.jpg`
                          : `/images/campaigns/ramadan.jpg`;
                      }}
                    />
                  </div>
                  <Link
                    to={sadaqah.link}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium mt-auto group shadow-md hover:shadow-lg"
                  >
                    <span>Donate Now</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={12} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link
              to="/sadaqah"
              className="inline-flex items-center bg-orange-50 text-orange-600 hover:bg-orange-100 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow group"
            >
              <span>Learn More About Sadaqah</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Categories with improved background */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-floral pattern-opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary-100 opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <DonationCategories />
        </div>
      </section>

      {/* Decorative divider with secondary color */}
      <DecorativeDivider color="secondary" pattern="arabesque" />

      {/* Featured Campaigns Section - Reduced padding */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-hexagon pattern-opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
              Current Campaigns
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Make an <span className="text-primary-600">Impact</span> Today
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Support our ongoing campaigns and help create lasting change for communities in need around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {currentCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  {campaign.isUrgent && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 z-10 rounded-br-lg font-medium">
                      Urgent
                    </div>
                  )}
                  <img 
                    src={campaign.image || `/images/campaigns/default.jpg`} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/images/campaigns/default.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm px-2 py-1 m-2 rounded text-xs font-medium text-gray-700 flex items-center">
                    <FaRegClock className="mr-1 text-primary-500" size={10} />
                    {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Ongoing'}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-600 rounded-full">
                      {campaign.category}
                    </span>
                    <span className="text-xs ml-2 text-gray-500">
                      License: {campaign.licenseNumber}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">{campaign.title}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {campaign.description}
                  </p>
                  
                  <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Raised:</span>
                    <span className="text-primary-600 font-bold">${campaign.raised?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Goal:</span>
                    <span className="text-primary-600 font-bold">${campaign.goal?.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 rounded-full" 
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2.5 rounded-lg transition-colors font-medium mt-auto"
                  onClick={() => openQuickDonateWithUrgentNeed({
                    id: campaign.id,
                    title: campaign.title,
                    description: campaign.description,
                    image: campaign.image,
                    category: campaign.category,
                    goal: campaign.goal,
                    amount: campaign.goal, // always use goal as amount needed
                    raised: campaign.raised,
                    licenseNumber: campaign.licenseNumber,
                    isUrgent: campaign.isUrgent,
                    daysLeft: campaign.daysLeft,
                    // add more fields as needed for your panel
                  })}
                >
                  Donate Now
                </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/campaigns"
              className="inline-flex items-center bg-primary-50 text-primary-600 hover:bg-primary-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Campaigns
              <FaArrowRight className="ml-2" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative divider with accent color */}
      <DecorativeDivider color="accent" pattern="geometric" />

      {/* Impact Statistics Section */}
      <section className="py-16 bg-gradient-to-b from-secondary-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic pattern-secondary pattern-opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-secondary-50 text-secondary-600 rounded-full text-sm font-medium mb-4">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Together We <span className="text-secondary-600">Make a Difference</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Every contribution helps us reach more people in need. See the impact we've made together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Beneficiaries",
                value: safeImpactStats.beneficiaries.toLocaleString(),
                icon: FaUsers,
              },
              {
                title: "Countries",
                value: safeImpactStats.countries,
                icon: FaGlobe,
              },
              {
                title: "Projects",
                value: safeImpactStats.projects.toLocaleString(),
                icon: FaMosque,
              },
              {
                title: "Volunteers",
                value: safeImpactStats.volunteers.toLocaleString(),
                icon: FaHandsHelping,
              }
            ].map((stat, index) => (
              <ImpactCounter key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Programs Section */}
      <section className="py-14 bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic pattern-blue pattern-opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-blue-50 opacity-40 blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4 shadow-sm">
              Sponsorships
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Make a <span className="text-blue-600">Lasting Impact</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our sponsorship programs provide ongoing support to those who need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {sponsorshipPrograms.map((program, index) => {
              const Icon = ICONS[program.icon] || FaUsers;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="relative">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={program.image || `/images/sponsorships/${program.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          const fallbackImages = [
                            `/images/campaigns/education.jpg`,
                            `/images/campaigns/orphans.jpg`,
                            `/images/campaigns/family-support.jpg`
                          ];
                          e.target.src = fallbackImages[index % fallbackImages.length];
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2">
                      <Icon className="text-blue-500" size={20} />
                      <span className="font-medium">{program.amount}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl mb-1">{program.title}</h3>
                      <div className="w-12 h-1 bg-blue-500 rounded-full mb-2"></div>
                      <p className="text-white/80 text-sm line-clamp-2">{program.description}</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white flex-grow flex flex-col">
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">What Your Sponsorship Provides:</h4>
                      <ul className="space-y-2">
                        {program.benefits && program.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-2">
                              <svg className="h-3 w-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-600 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to={program.link}
                      className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-center py-3 rounded-lg transition-all font-medium mt-auto shadow-md hover:shadow-lg group-hover:translate-y-0.5"
                    >
                      Sponsor Now
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          
          <div className="text-center">
            <Link
              to="/sponsorship"
              className="inline-flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow group"
            >
              <span>View All Sponsorship Programs</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50/70 to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic pattern-primary pattern-opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 opacity-50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-50 opacity-40 rounded-full blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4 shadow-sm">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We <span className="text-primary-600">Work</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Your donation goes through a transparent process that ensures it creates maximum impact for those in need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 z-0"></div>
            
            {howWeWorkSteps.map((step, index) => (
              <HowWeWorkStep key={index} step={step} ICONS={ICONS} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/about"
              className="inline-flex items-center bg-primary-50 text-primary-600 hover:bg-primary-100 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow group"
            >
              <span>Learn More About Our Process</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <DecorativeDivider color="primary" pattern="geometric" />

      {/* Latest News Section - now dynamic */}
      <LatestNews news={news} />

      {/* Decorative divider */}
      <DecorativeDivider color="secondary" pattern="floral" />

      {/* Testimonials Section - Reduced padding */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Decorative divider */}
      <DecorativeDivider color="primary" pattern="hexagon" />

      {/* Partners Section - Reduced padding */}
      <section className="py-14 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic pattern-opacity-5 pattern-gray-400"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 opacity-50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 opacity-40 rounded-full blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4 shadow-sm">
              Our Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Working <span className="text-gray-700">Together</span> for Change
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with organizations that share our values and vision for a better world.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, index) => (
                <PartnerLogo key={partner.id} partner={partner} index={index} />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Partnership Impact</h3>
              <p className="text-gray-600 text-sm">
                Together with our partners, we've reached over 250,000 beneficiaries across 35 countries.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-4 text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Become a Partner</h3>
              <p className="text-gray-600 text-sm">
                Join our network of mission-driven organizations to amplify your impact and reach.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Partner Resources</h3>
              <p className="text-gray-600 text-sm">
                Access exclusive resources, tools, and support to help maximize your partnership with us.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center">
            <Link
              to="/about"
              className="inline-flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow group"
            >
              <span>Learn More About Our Partners</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Download Our App Section - Reduced padding */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pattern-islamic pattern-white pattern-opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
                Mobile App
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {appInfo.title || 'Charity in Your Pocket: Download Our App'}
              </h2>
              <p className="text-white/80 mb-8 max-w-lg text-lg">
                {appInfo.description || 'Make a difference anytime, anywhere. Our mobile app makes donating, tracking your impact, and staying updated easier than ever.'}
              </p>
              
              <div className="space-y-4 mb-8">
                {(appInfo.features || [
                  'Donate with just a few taps',
                  'Track your donation history and impact',
                  'Get real-time updates about projects you support',
                  'Set up recurring donations easily',
                  'Discover nearby charity events'
                ]).map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5 mr-3">
                      <svg className="h-3.5 w-3.5 text-primary-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to={appInfo.appStoreLink || '/about'}
                  className="bg-black text-white px-6 py-3 rounded-xl flex items-center hover:bg-gray-900 transition-colors"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 13.8l-.2.1c-1.1.6-1.8 1.8-2.1 3.1-.2.9-.1 1.9.3 2.8.3.6.8 1.2 1.4 1.6.7.4 1.6.4 2.4.1.6-.3 1-.5 1.4-.8.8-.7 1.2-1.6 1.4-2.6.2-1 0-2-.5-2.9s-1.3-1.6-2.2-2C3.1 9 2.5 9 1.9 9.2c-.6.2-1.1.6-1.3 1.2-.1.4-.2.6-.2 1.6v1.4z" />
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-xl font-semibold">App Store</div>
                  </div>
                </Link>
                <Link
                  to={appInfo.googlePlayLink || '/about'}
                  className="bg-black text-white px-6 py-3 rounded-xl flex items-center hover:bg-gray-900 transition-colors"
                >
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12l-10.183 10.186c-2.04-2.203-2.04-5.634 0-7.837l10.183-10.186c2.04-2.203 5.634-2.203 7.837 0-2.203 2.04-5.634 2.203-7.837 0l-2.112 2.112 5.941 5.941c2.203-2.04 5.634-2.04 7.837 0-2.04 2.203-5.634 2.203-7.837 0l-5.941-5.941-2.112 2.112c-2.04 2.203-2.04 5.634 0 7.837-2.203-2.04-5.634-2.04-7.837 0 2.04-2.203 2.04-5.634 0-7.837z"></path>
                                   </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-xl font-semibold">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
            {/* Mobile App Screenshot */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative mx-auto max-w-xs">
                {appInfo.screenshots && appInfo.screenshots.length > 0 ? (
                  appInfo.screenshots.map((src, idx) => (
                    <motion.div
                      key={src}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 * idx }}
                      className={`absolute z-${30 - idx * 10} ${idx === 0 ? '' : idx === 1 ? '-right-16 -top-10' : '-left-16 top-20'}`}
                    >
                      <img
                        src={src}
                        alt={`Charity App Screenshot ${idx + 1}`}
                        className={`rounded-[3rem] shadow-2xl ${idx === 1 ? 'opacity-80 rotate-6' : idx === 2 ? 'opacity-70 -rotate-6' : ''}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://picsum.photos/250/500`;
                        }}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-30"
                  >
                    <img 
                      src="/images/sample/app-main.jpg" 
                      alt="Charity App Screenshot" 
                      className="mx-auto rounded-[3rem] shadow-2xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://picsum.photos/300/550";
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;