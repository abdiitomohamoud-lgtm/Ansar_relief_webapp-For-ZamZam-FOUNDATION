import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMosque, FaHome, FaWater, FaHeartbeat, FaGraduationCap, FaChartLine, FaHandHoldingHeart, FaSearch, FaFilter, FaMapMarkerAlt, FaUsers, FaHandshake, FaTint, FaHospital, FaHandHoldingUsd, FaHandsHelping, FaArrowRight, FaCheckCircle, FaLightbulb, FaGlobe, FaHeart, FaStar, FaAward, FaRegClock, FaRegCalendarAlt, FaPray, FaHandHoldingMedical, FaBookOpen, FaBriefcase, FaHandHoldingWater, FaHandHoldingDollar, FaUserCircle, FaMapMarkedAlt, FaHandshakeAltSlash, FaPrayingHands } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { heroImages, categoryImages, featuredProjectImages, processImages } from '../../assets/images/projects';
import { patterns } from '../../assets/images/patterns';
import { Badge } from '../../components/Badge';
import { Progress } from '../../components/Progress';
import { HoverSection } from '../../components/HoverSection';
import pageData from '../../data/projectsPageData.json';

const ProjectsPage = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'newest'
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };


    handleResize();
    window.addEventListener('resize', handleResize);
    document.title = 'Projects - Qatar Charity';
  }, []);

  // Icon map and dynamic categories/projects (outside useEffect)
  const iconMap = {
    FaMosque: <FaMosque className="text-2xl" />,
    FaHome: <FaHome className="text-2xl" />,
    FaTint: <FaTint className="text-2xl" />,
    FaHospital: <FaHospital className="text-2xl" />,
    FaGraduationCap: <FaGraduationCap className="text-2xl" />,
    FaHandHoldingUsd: <FaHandHoldingUsd className="text-2xl" />,
    FaHandsHelping: <FaHandsHelping className="text-2xl" />,
  };

  // Defensive: fallback to empty array if missing
  const categories = Array.isArray(pageData?.categoriesSection?.categories)
    ? pageData.categoriesSection.categories.map(cat => ({
        ...cat,
        icon: iconMap[cat.icon] || null,
        image: categoryImages[cat.id] || '/images/projects/categories/default.jpg'
      }))
    : [];

  // Use mockProjects from the imported pageData
  let projects = [];
  if (Array.isArray(pageData?.mockProjects)) {
    projects = pageData.mockProjects.map(project => ({
      ...project,
      raisedAmount: project.raisedAmount || Math.floor(Math.random() * (project.targetAmount || 50000)),
      beneficiaries: project.beneficiaries || Math.floor(Math.random() * 1000)
    }));
  }


  // Using mock data directly, no API call needed

  const filteredProjects = projects.filter(project => {
  // Filter by category
  const matchesCategory = activeCategory === 'all' || project.categoryId === activeCategory;
  // Filter by search query
  const matchesSearch = !searchQuery || project.title.toLowerCase().includes(searchQuery.toLowerCase());
  // Filter by status
  const matchesStatus = filters.status === 'all' || project.status === filters.status;
  return matchesCategory && matchesSearch && matchesStatus;
});

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
    if (filters.sortBy === 'oldest') return a.id.localeCompare(b.id);
    if (filters.sortBy === 'most-funded') return b.raisedAmount - a.raisedAmount;
    if (filters.sortBy === 'least-funded') return a.raisedAmount - b.raisedAmount;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - Redesigned for landing page */}
      <div className="relative min-h-[700px] overflow-visible">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ 
            backgroundImage: `url(${heroImages.hero1})`,
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImages.pattern})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/90" />
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary-300/20 rounded-full blur-xl"></div>
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center">
          {/* Hero Content: headline, description, buttons, impact stats */}
          <div className="text-center text-white max-w-4xl px-2 sm:px-6 lg:px-8 pt-32 pb-8 mx-auto flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-1 bg-white/10 backdrop-blur-sm px-1 py-1 rounded-full text-white text-sm font-medium shadow"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-200"></span>
              </span>
              Making a Difference Together
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-md leading-tight text-center"
            >
              {pageData.hero?.headline || "Transform Lives Through Our Projects"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl mb-4 text-white/90 max-w-3xl text-center leading-relaxed"
            >
              {pageData.hero?.description || "Join us in making a lasting impact through our diverse range of projects. From building mosques to providing clean water, your support helps create sustainable change in communities worldwide."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-2 mt-1 justify-center"
            >
              <Link
                to="/sadaqah"
                className="bg-white text-primary-900 hover:bg-gray-100 px-6 py-3 rounded-lg text-base font-semibold shadow transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <FaHandHoldingUsd className="text-lg" />
                Donate Now
              </Link>
              <Link
                to="/initiatives"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-primary-900 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
              >
                <FaHandsHelping className="text-lg" />
                Become a Volunteer
              </Link>
            </motion.div>
            {/* Impact Highlights - moved into hero section */}
            <div className="bg-white/10 backdrop-blur-sm py-6 px-6 mt-8 rounded-xl shadow-lg w-full max-w-3xl">
              <h3 className="text-white text-xl font-semibold mb-4 text-center">{pageData.impactHighlights?.title || "Our Global Impact"}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageData.impactHighlights?.stats?.map((stat, index) => {
                  const StatIcon = iconMap[stat.icon] || FaUsers;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center p-3 rounded-lg group bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300 text-white">
                        <StatIcon className="text-2xl mx-auto" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/90 text-sm font-medium">{stat.label}</div>
                    </motion.div>
                  );
                }) || (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center p-3 rounded-lg group bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300 text-white">
                        <FaMapMarkedAlt className="text-2xl mx-auto" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        50+
                      </div>
                      <div className="text-white/90 text-sm font-medium">Countries</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-center p-3 rounded-lg group bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300 text-white">
                        <FaHandshake className="text-2xl mx-auto" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        500+
                      </div>
                      <div className="text-white/90 text-sm font-medium">Partners</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-center p-3 rounded-lg group bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300 text-white">
                        <FaPrayingHands className="text-2xl mx-auto" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        1000+
                      </div>
                      <div className="text-white/90 text-sm font-medium">Projects</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-center p-3 rounded-lg group bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300 text-white">
                        <FaUsers className="text-2xl mx-auto" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        1M+
                      </div>
                      <div className="text-white/90 text-sm font-medium">Beneficiaries</div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Gradient Fade */}
      </div>

      {/* Project Categories Section - Added below hero, before featured projects */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{pageData.categoriesSection?.title || "Our Project Categories"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{pageData.categoriesSection?.description || "Explore our diverse range of projects designed to make a lasting impact in communities worldwide"}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
              >
                <div className="relative h-72">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 text-white">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-200 transition-colors duration-300">{category.title}</h3>
                    <p className="text-gray-200 text-base mb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{category.count} Projects</span>
                      <Link
                        to={`/projects/categories/${category.id}`}
                        className="inline-flex items-center text-white font-medium hover:text-primary-200 transition-all duration-300 group-hover:gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
                      >
                        View Projects
                        <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects Section - Moved below project categories */}
      {/* Impact Stats - Restored as a separate section (moved below hero, before categories) */}
      <div className="bg-white py-12 shadow-lg mt-12 relative z-10 mx-4 rounded-xl">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-primary-600 text-sm font-semibold tracking-wider uppercase mb-4 block">
                Featured Projects
              </span>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{pageData.featuredProjectsSection?.title || "Make a Difference Today"}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{pageData.featuredProjectsSection?.description || "Support our most impactful projects and help create lasting change in communities worldwide."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAll ? sortedProjects : sortedProjects.slice(0, 6)).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/90 text-primary-600 rounded-full text-sm font-medium">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-700' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Funding Progress */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Funding Progress</span>
                          <span className="font-medium text-primary-600">{Math.round((project.raisedAmount / project.targetAmount) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                            style={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <FaUsers className="text-gray-400" />
                          <span className="text-sm text-gray-600">{project.beneficiaries.toLocaleString()} Beneficiaries</span>
                        </div>
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Learn More
                          <FaArrowRight className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Button */}
          {filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(v => !v)}
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {showAll ? 'Show Less' : 'View All Projects'}
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Process Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-center mb-6"
          >
            Our Process
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <FaSearch className="text-2xl" />,
                title: "Identify",
                description: "We identify communities in need through thorough research and assessment.",
                color: "bg-blue-50 text-blue-600",
                image: processImages.identify
              },
              {
                icon: <FaHandshake className="text-2xl" />,
                title: "Plan",
                description: "We develop comprehensive plans with local stakeholders and experts.",
                color: "bg-green-50 text-green-600",
                image: processImages.plan
              },
              {
                icon: <FaUsers className="text-2xl" />,
                title: "Implement",
                description: "We execute projects with local communities and partners.",
                color: "bg-purple-50 text-purple-600",
                image: processImages.implement
              },
              {
                icon: <FaChartLine className="text-2xl" />,
                title: "Monitor",
                description: "We track progress and impact to ensure sustainable results.",
                color: "bg-orange-50 text-orange-600",
                image: processImages.monitor
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${step.color} rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <FaCheckCircle className="text-primary-600 text-xl" />
                  </div>
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-center mb-6"
          >
            Project Timeline
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
            {[
              {
                title: "Project Initiation",
                description: "We begin by identifying needs and planning our approach",
                icon: <FaRegCalendarAlt className="text-xl" />
              },
              {
                title: "Community Engagement",
                description: "We work closely with local communities to ensure their needs are met",
                icon: <FaUsers className="text-xl" />
              },
              {
                title: "Implementation",
                description: "Our team works on the ground to deliver the project",
                icon: <FaHandshake className="text-xl" />
              },
              {
                title: "Monitoring & Evaluation",
                description: "We track progress and measure impact to ensure success",
                icon: <FaRegClock className="text-xl" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-1/2 pr-8 text-right">
                  {index % 2 === 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  )}
                </div>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white z-10">
                  {item.icon}
                </div>
                <div className="w-1/2 pl-8">
                  {index % 2 !== 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-4"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base mb-6 max-w-2xl mx-auto text-white/90"
          >
            Join us in creating lasting impact through our diverse range of projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/sadaqah"
              className="bg-white text-primary-900 hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FaHandHoldingUsd className="text-base" />
              Donate Now
            </Link>
            <Link
              to="/initiatives"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FaHandsHelping className="text-base" />
              Become a Volunteer
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;