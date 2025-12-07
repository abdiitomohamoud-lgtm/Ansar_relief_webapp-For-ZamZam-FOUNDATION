import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, FaGlobe, FaProjectDiagram, FaHandHoldingHeart, 
  FaShieldAlt, FaFileAlt
} from 'react-icons/fa';
import aboutService from '../../services/about.service';
import StatCard from '../../components/about/StatCard';
import TeamMember from '../../components/about/TeamMember';
import TimelineEvent from '../../components/about/TimelineEvent';
import TabContent from '../../components/about/TabContent';
import ValueCard from '../../components/about/ValueCard';
import BoardMember from '../../components/about/BoardMember';
import ReportCard from '../../components/about/ReportCard';
import CertificationCard from '../../components/about/CertificationCard';
import { Link } from 'react-router-dom';
import './AboutStyles.css';

// Import images
import heroImage from '../../assets/images/about/about-hero.jpg';
import communityMember1 from '../../assets/images/about/community-member-1.jpg';
import communityMember2 from '../../assets/images/about/community-member-2.jpg';
import communityMember3 from '../../assets/images/about/community-member-3.jpg';
import communityMember4 from '../../assets/images/about/community-member-4.jpg';

// Import mock data
import aboutPageData from '../../data/aboutPageData.json';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isLoading, setIsLoading] = useState(false); // No longer loading since we're using mock data
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState(aboutPageData);
  const [navbarHeight, setNavbarHeight] = useState(64); // Default height - will be updated

  // Community member images array
  const communityMembers = [
    communityMember1,
    communityMember2,
    communityMember3,
    communityMember4
  ];

  // Using mock data directly, no API calls needed
  useEffect(() => {
    // Set document title
    document.title = "About Us | Ansar Organization";
    
    // Get actual navbar height for precise calculations
    const navbar = document.querySelector('header') || document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About Us', icon: FaUsers },
    { id: 'mission', label: 'Mission & Vision', icon: FaGlobe },
    { id: 'history', label: 'Our History', icon: FaProjectDiagram },
    { id: 'team', label: 'Our Team', icon: FaHandHoldingHeart },
    { id: 'governance', label: 'Governance', icon: FaShieldAlt },
    { id: 'transparency', label: 'Transparency', icon: FaFileAlt }
  ];

    return (
    <div className="about-page-container" style={{ marginTop: `-${navbarHeight}px` }}>
    <div className="min-h-screen bg-gray-50">
        {/* Enhanced Hero Section with Animation and Depth */}
        <section className="relative bg-primary-900 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 right-40 w-56 h-56 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-islamic" style={{color: 'rgba(255,255,255,0.04)'}}></div>
          
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${pageData && pageData.hero && pageData.hero.backgroundImage ? pageData.hero.backgroundImage : (pageData && pageData.hero && pageData.hero.image ? pageData.hero.image : heroImage)})`}}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/85"></div>
        </div>
          
          <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 mb-5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-300"></span>
                  </span>
                  {pageData && pageData.hero && pageData.hero.subtitle ? pageData.hero.subtitle : 'Serving Our Community Since 2005'}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {pageData && pageData.hero && pageData.hero.title ? pageData.hero.title : 'Our Story of '}<span className="text-primary-300">Faith</span> & <span className="text-primary-300">Service</span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {pageData && pageData.hero && pageData.hero.description ? pageData.hero.description : "For over 18 years, we've been committed to serving our community, guided by Islamic principles of compassion, generosity, and excellence."}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#mission"
                    className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                    onClick={e => {
                      e.preventDefault();
                      const missionSection = document.getElementById('mission');
                      if (missionSection) {
                        missionSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Learn More
                  </a>
                  
                  <Link 
                    to="/volunteer"
                    className="px-6 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Get Involved
                  </Link>
                </div>
              </motion.div>
          
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-16 md:mt-20"
              >
                <div className="flex flex-wrap items-center gap-6">
                  <div className="inline-flex -space-x-4">
                    {communityMembers.map((img, num) => (
                      <img 
                        key={num}
                        src={img}
                        alt={`Community member ${num + 1}`}
                        className="w-12 h-12 rounded-full border-2 border-white object-cover ring-2 ring-primary-500 ring-offset-2 ring-offset-primary-900"
                      />
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-primary-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-primary-500 ring-offset-2 ring-offset-primary-900">
                      +50
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white/90 text-sm">
                      Join <span className="font-semibold text-white">500+</span> community members making a difference
                    </p>
                    <div className="flex items-center mt-1 text-primary-300 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Serving communities across the greater metropolitan area
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center">
                    <div className="mr-3 bg-primary-500/20 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">10,000+</p>
                      <p className="text-white/70 text-xs">Volunteer Hours</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center">
                    <div className="mr-3 bg-primary-500/20 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">25+</p>
                      <p className="text-white/70 text-xs">Community Programs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced wave separator with animation */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-[1px] overflow-hidden leading-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto relative z-10" fill="#ffffff">
              <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
        </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(pageData && pageData.impactStats ? pageData.impactStats : []).map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4 py-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className={`text-lg ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            {activeTab === 'about' && (
              <TabContent
                title="About Our Organization"
                description="Learn about who we are, our programs, and how we make a difference in our community."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-primary-600">Who We Are</h3>
                    <p className="text-gray-600 mb-4">
                      {pageData.story.whoWeAre}
                    </p>
                    <p className="text-gray-600">
                      {pageData.story.mission}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-primary-600">Our Approach</h3>
                    <p className="text-gray-600 mb-4">
                      {pageData.story.approaches}
                    </p>
                    <p className="text-gray-600">
                      Through partnerships with other community organizations, government agencies, and private donors, we maximize our impact and ensure comprehensive support for those we serve.
                    </p>
                  </motion.div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-semibold mb-6 text-center">Our Programs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pageData.overview.programs.map((program, index) => (
                    <motion.div
                      key={program.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center mb-4">
                          {React.createElement(program.icon, { className: "text-3xl text-primary-600 mr-4" })}
                          <h3 className="text-xl font-semibold">{program.title}</h3>
                        </div>
                      <p className="text-gray-600">{program.description}</p>
                        <div className="mt-4">
                          {(() => {
                            const available = [
                              'water',
                              'relief',
                              'mosques',
                              'income',
                              'housing',
                              'health',
                              'education'
                            ];
                            const slug = program.title.toLowerCase().replace(/\s+/g, '-');
                            const match = available.find(cat => slug.includes(cat));
                            if (match) {
                              return (
                                <a 
                                  href={`/projects/categories/${match}`}
                                  className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center"
                                >
                                  Learn more
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </a>
                              );
                            }
                            return null;
                          })()}
                        </div>
                    </motion.div>
                  ))}
                  </div>
                </div>
              </TabContent>
            )}

            {activeTab === 'mission' && (
              <TabContent
                title="Our Mission & Vision"
                description={pageData && pageData.mission ? pageData.mission.description : ''}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-primary-600">Our Mission</h3>
                    <p className="text-gray-600">{pageData && pageData.mission ? pageData.mission.statement : ''}</p>
                </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-primary-600">Our Vision</h3>
                    <p className="text-gray-600">{pageData && pageData.mission ? pageData.mission.vision : ''}</p>
                  </motion.div>
                </div>

                  <div className="mt-16">
                    <h3 className="text-2xl font-semibold mb-8 text-center">Our Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {(pageData && pageData.mission && pageData.mission.values ? pageData.mission.values : []).map((value, index) => (
                        <ValueCard
                          key={value.title}
                          icon={value.icon}
                          title={value.title}
                          description={value.description}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                </div>
              </TabContent>
            )}

            {activeTab === 'history' && (
              <TabContent
                title={pageData && pageData.history && pageData.history.title ? pageData.history.title : "Our History"}
                description={pageData && pageData.history && pageData.history.description ? pageData.history.description : 'Discover our journey, milestones, and the impact we\'ve made since our founding.'}
              >
                <div className="mt-16">
                  {(pageData && pageData.history && pageData.history.events ? pageData.history.events : [
                    { year: "2010", title: "Founded Ansar Relief", description: "A small group of volunteers launches Ansar Relief to respond to local crises.", image: "/images/history/2010.jpg" },
                    { year: "2015", title: "International Expansion", description: "Ansar Relief begins operations in 10 new countries.", image: "/images/history/2015.jpg" },
                    { year: "2020", title: "3 Million Lives Impacted", description: "Reached a major milestone in humanitarian aid and sustainable development.", image: "/images/history/2020.jpg" }
                  ]).map((event, index) => (
                    <TimelineEvent
                      key={event.year}
                      year={event.year}
                      title={event.title}
                      description={event.description}
                      image={event.image}
                      isLeft={index % 2 === 0}
                      delay={index * 0.2}
                    />
                  ))}
                </div>
              </TabContent>
            )}

            {activeTab === 'team' && (
              <TabContent
                title={pageData && pageData.team && pageData.team.title ? pageData.team.title : "Our Team"}
                description={pageData && pageData.team && pageData.team.description ? pageData.team.description : "Meet our dedicated leadership and staff who drive our mission forward."}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                  {(pageData && pageData.team && pageData.team.members ? pageData.team.members : [
                    { name: "Ahmed Al-Mansour", role: "Executive Director", bio: "15+ years in humanitarian work with extensive experience in emergency response.", image: "/images/team/ahmed.jpg" },
                    { name: "Sarah Johnson", role: "Operations Director", bio: "Former UNHCR leader with expertise in logistics and field operations.", image: "/images/team/sarah.jpg" },
                    { name: "Dr. Fatima Khalid", role: "Programs Director", bio: "Public health expert with a focus on sustainable development programs.", image: "/images/team/fatima.jpg" },
                    { name: "Michael Chen", role: "Partnerships Director", bio: "Specialist in building cross-sector partnerships for humanitarian impact.", image: "/images/team/michael.jpg" }
                  ]).map((member, index) => (
                    <TeamMember
                      key={member.name}
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      image={member.image}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabContent>
            )}

              {activeTab === 'governance' && (
                <TabContent
                  title="Governance"
                  description={pageData.governance.description}
                >
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-8">Board of Directors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {pageData?.governance?.structure?.board?.map((member, index) => (
                        <BoardMember
                          key={member.name}
                          name={member.name}
                          role={member.role}
                          image={member.image}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-16">
                    <h3 className="text-2xl font-semibold mb-8">Committees</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {pageData?.governance?.structure?.committees?.map((committee, index) => (
                        <motion.div
                          key={committee.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-6 rounded-xl shadow-lg"
                        >
                          <h4 className="text-xl font-semibold mb-2">{committee.name}</h4>
                          <p className="text-gray-600">{committee.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabContent>
              )}

              {activeTab === 'transparency' && (
                <TabContent
                  title="Transparency & Accountability"
                  description={pageData.transparency && pageData.transparency.description ? pageData.transparency.description : ''}
                >
                  {/* Reports & Publications Section */}
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Our Reports & Publications</h3>
                    <p className="text-gray-600 max-w-3xl mb-8">
                      Transparency and accountability are core values of our organization. 
                      Browse our reports to learn more about our impact, financials, and community engagement.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(pageData.transparency && pageData.transparency.reports ? pageData.transparency.reports : []).map((report, index) => (
                        <ReportCard key={index} {...report} delay={index * 0.1} />
                      ))}
                    </div>
                    <div className="text-center mt-10">
                      <button className="bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-6 border 
                                        border-primary-600 rounded-md transition-colors duration-200 inline-flex items-center">
                        <span>View All Reports</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Certifications & Recognition Section */}
                  <div className="mt-16">
                    <h3 className="text-2xl font-semibold mb-4">Our Certifications & Recognition</h3>
                    <p className="text-gray-600 max-w-3xl mb-8">
                      We maintain the highest standards of excellence in our operations. 
                      These certifications reflect our commitment to transparency, accountability, and best practices.
                    </p>
                    <div className="space-y-6 max-w-4xl mx-auto">
                      {(pageData.transparency && pageData.transparency.certifications ? pageData.transparency.certifications : []).map((cert, index) => (
                        <CertificationCard key={index} {...cert} delay={index * 0.1} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Financial Transparency Section - New Content */}
                  <div className="mt-16">
                    <h3 className="text-2xl font-semibold mb-4">Financial Transparency</h3>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <p className="text-gray-600 mb-6">
                        We are committed to financial transparency and responsible stewardship of all donations. Our financial records are regularly audited by independent firms, and we maintain detailed records of how funds are allocated to programs, administrative costs, and fundraising.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-lg mb-2 text-primary-600">Program Expenses</h4>
                          <div className="text-3xl font-bold text-gray-800 mb-1">{pageData.transparency && pageData.transparency.financials ? pageData.transparency.financials.programExpenses : ''}</div>
                          <p className="text-sm text-gray-600">Funds directly supporting our community programs and services</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-lg mb-2 text-primary-600">Administrative</h4>
                          <div className="text-3xl font-bold text-gray-800 mb-1">{pageData.transparency && pageData.transparency.financials ? pageData.transparency.financials.administrative : ''}</div>
                          <p className="text-sm text-gray-600">Essential operational and administrative expenses</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-lg mb-2 text-primary-600">Fundraising</h4>
                          <div className="text-3xl font-bold text-gray-800 mb-1">{pageData.transparency && pageData.transparency.financials ? pageData.transparency.financials.fundraising : ''}</div>
                          <p className="text-sm text-gray-600">Costs associated with fundraising activities and donor engagement</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <a 
                          href="/financial-reports" 
                          className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          View Detailed Financial Reports
                        </a>
                      </div>
                    </div>
                  </div>
                </TabContent>
              )}
          </div>
      </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <section className="relative py-20 bg-primary-900">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Join Us in Making a Difference
          </motion.h2>
          
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Together, we can create lasting change and bring hope to those in need.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#donate"
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors duration-300"
            >
              Make a Donation
            </a>
            <a
              href="#volunteer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
                >
                  Become a Volunteer
            </a>
          </motion.div>
        </div>
      </section>

      {/* Board Members Section with Enhanced Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              Leadership Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Board</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse board brings together expertise in various fields, united by a shared commitment to serving our community with integrity and vision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pageData.governance.structure.board.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: member.delay, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary-50">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium text-center mb-3">{member.role}</p>
                  <p className="text-gray-600 text-center mb-4">{member.description}</p>
                  
                  {/* Add buttons/links to board member cards */}
                  <div className="flex space-x-2 mt-2">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                      </a>
                    )}
                    
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </button>
                    
                    <Link
                      to={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-sm"
                    >
                      View Bio
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/team" 
              className="inline-flex items-center px-5 py-2.5 bg-white border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors duration-200 font-medium"
            >
              Meet Our Staff
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default AboutPage;