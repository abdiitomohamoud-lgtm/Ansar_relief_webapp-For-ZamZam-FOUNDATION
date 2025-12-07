import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Import components
import ValueCard from '../../components/about/ValueCard';
import BoardMember from '../../components/about/BoardMember';
import ReportCard from '../../components/about/ReportCard';
import CertificationCard from '../../components/about/CertificationCard';
import TimelineEvent from '../../components/about/TimelineEvent';
import TestimonialCard from '../../components/about/TestimonialCard';
import CTASection from '../../components/common/CTASection';
import FAQAccordion from '../../components/common/FAQAccordion';
import ErrorMessage from '../../components/common/ErrorMessage';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

// Import services
import {
  getOrganizationInfo,
  getBoardMembers,
  getOrganizationValues,
  getTimelineEvents,
  getReports,
  getCertifications,
  getTestimonials,
  getFAQs
} from '../../services/aboutService';

// Import styles
import './AboutStyles.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data states
  const [orgInfo, setOrgInfo] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [values, setValues] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [reports, setReports] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [
          orgInfoData,
          boardMembersData,
          valuesData,
          timelineData,
          reportsData,
          certificationsData,
          testimonialsData,
          faqsData
        ] = await Promise.all([
          getOrganizationInfo(),
          getBoardMembers(),
          getOrganizationValues(),
          getTimelineEvents(),
          getReports(3), // Limit to 3 most recent reports
          getCertifications(3), // Limit to 3 certifications
          getTestimonials(3), // Limit to 3 testimonials
          getFAQs('about')
        ]);
        
        // Update state with data
        setOrgInfo(orgInfoData);
        setBoardMembers(boardMembersData);
        setValues(valuesData);
        setTimeline(timelineData);
        setReports(reportsData);
        setCertifications(certificationsData);
        setTestimonials(testimonialsData);
        setFaqs(faqsData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching about page data:', err);
        setError('Failed to load page data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Use demo data if backend fetch fails or is not available yet
  const useDemoData = error || !orgInfo;
  
  // Demo data (same as before)
  const demoValues = [
    {
      icon: "🕌",
      title: "Faith & Spirituality",
      description: "Guided by Islamic principles of compassion, generosity, and service to humanity, we strive to uphold these values in all our work."
    },
    // ... (other values remain the same)
  ];
  
  const demoBoardMembers = [
    {
      name: "Abdullah Rahman",
      position: "Chairperson",
      image: "/images/about/board/abdullah-rahman.jpg",
      description: "Abdullah brings 20+ years of nonprofit leadership experience and a passion for community development.",
      linkedin: "https://linkedin.com/in/abdullahrahman",
      delay: 0
    },
    // ... (other board members remain the same)
  ];
  
  const demoTimeline = [
    {
      year: "2005",
      title: "Founding",
      description: "Our organization was founded by a group of community members who recognized the need for a dedicated Islamic charitable organization in the region.",
      image: "/images/about/timeline/founding.jpg"
    },
    // ... (other timeline events remain the same)
  ];
  
  // Active data sets (either from API or demo data)
  const activeValues = useDemoData ? demoValues : values;
  const activeBoardMembers = useDemoData ? demoBoardMembers : boardMembers;
  const activeTimeline = useDemoData ? demoTimeline : timeline;
  const activeReports = useDemoData ? [] : reports;
  const activeCertifications = useDemoData ? [] : certifications;
  const activeTestimonials = useDemoData ? [] : testimonials;
  const activeFaqs = useDemoData ? [] : faqs;
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary-200 mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-primary-600 font-medium">Loading About Page...</p>
        </div>
      </div>
    );
  }
  
  if (error && !useDemoData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <ErrorMessage 
          message={error}
          retryAction={() => window.location.reload()}
        />
      </div>
    );
  }
  
  return (
    <div className="about-page-container">
      <Helmet>
        <title>About Us | Ansar Organization</title>
        <meta name="description" content={orgInfo?.metaDescription || "Learn about our mission, values, history, and the team behind Ansar Organization. Discover how we serve our community through faith-based initiatives."} />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('${orgInfo?.heroImage || "/images/about/about-hero.jpg"}')`}}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80 pattern-islamic" style={{color: 'rgba(255,255,255,0.03)'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {orgInfo?.heroTitle || "Our Story of Faith & Service"}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {orgInfo?.heroSubtitle || "For over 18 years, we've been committed to serving our community, guided by Islamic principles of compassion, generosity, and excellence."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#mission" 
                className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 shadow-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Learn More
              </a>
              <Link 
                to="/get-involved" 
                className="px-6 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Get Involved
              </Link>
            </div>
            
            <div className="flex items-center mt-12 gap-6">
              <div className="inline-flex -space-x-2">
                {[1, 2, 3, 4].map((num) => (
                  <img 
                    key={num}
                    src={orgInfo?.communityImages?.[num-1] || `/images/about/community-member-${num}.jpg`}
                    alt="Community member"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-600 flex items-center justify-center text-white text-xs font-medium">
                  +{orgInfo?.communityMembersCount || 50}
                </div>
              </div>
              <p className="text-white/80 text-sm">
                Join <span className="font-semibold text-white">{orgInfo?.totalCommunityMembers || "500+"}</span> community members making a difference
              </p>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
            <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Mission & Vision Tabs Section */}
      <section id="mission" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex border-b border-gray-200">
              <button 
                className={`px-6 py-3 font-medium text-lg ${activeTab === 'mission' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('mission')}
              >
                Our Mission
              </button>
              <button 
                className={`px-6 py-3 font-medium text-lg ${activeTab === 'vision' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('vision')}
              >
                Our Vision
              </button>
              <button 
                className={`px-6 py-3 font-medium text-lg ${activeTab === 'history' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('history')}
              >
                Our History
              </button>
            </div>
            
            <div className="py-8">
              {activeTab === 'mission' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                    <div 
                      className="text-gray-600 mb-4"
                      dangerouslySetInnerHTML={{ __html: orgInfo?.mission || 
                        `<p>To serve our community through faith-based initiatives that promote education, social welfare, and spiritual growth, while upholding the Islamic principles of compassion, generosity, and service to humanity.</p>
                        <p>We strive to be a beacon of positive change, addressing the needs of our community through sustainable programs that empower individuals and families to thrive while staying true to their faith and values.</p>` 
                      }}
                    />
                    <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-md">
                      <p className="text-primary-700 italic">
                        {orgInfo?.missionQuote || '"The best of people are those who are most beneficial to people."'}
                        <span className="block text-sm mt-1 font-medium">{orgInfo?.missionQuoteAuthor || "— Prophet Muhammad (PBUH)"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 relative">
                    <img 
                      src={orgInfo?.missionImage || "/images/about/mission-image.jpg"} 
                      alt="Community service event" 
                      className="rounded-lg shadow-xl w-full h-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-2">
                      <div className="rounded-full bg-primary-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{orgInfo?.peopleSupportedCount || "10,000+"}</p>
                        <p className="text-xs text-gray-500">People Served Annually</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Vision tab and History tab continue with same pattern of using orgInfo or default content */}
              {/* ... other tab content ... */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque" style={{ color: "#1d4ed8", opacity: "0.03" }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              Our Guiding Principles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {orgInfo?.valuesDescription || "These values represent the heart of our organization, guiding every decision we make and every service we provide to our community."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {activeValues.map((value, index) => (
              <ValueCard 
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Continue with remaining sections following the same pattern */}
      {/* Each section uses data from the API if available or falls back to demo data */}
      {/* ... other sections ... */}
      
      {/* CTA Section */}
      <CTASection 
        title={orgInfo?.ctaTitle || "Join Us in Making a Difference"}
        description={orgInfo?.ctaDescription || "Together, we can build a stronger, more compassionate community. There are many ways to support our mission."}
        primaryButtonText={orgInfo?.ctaPrimaryButtonText || "Donate Now"}
        primaryButtonUrl={orgInfo?.ctaPrimaryButtonUrl || "/donate"}
        secondaryButtonText={orgInfo?.ctaSecondaryButtonText || "Volunteer"}
        secondaryButtonUrl={orgInfo?.ctaSecondaryButtonUrl || "/volunteer"}
        backgroundPattern="pattern-arabesque"
      />
    </div>
  );
};

export default AboutPage; 