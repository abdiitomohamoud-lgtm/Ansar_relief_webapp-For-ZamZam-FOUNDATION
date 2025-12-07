import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaDonate, 
  FaShare, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaClock, 
  FaMoneyBillWave, 
  FaMosque, 
  FaHome, 
  FaWater, 
  FaHospital, 
  FaGraduationCap, 
  FaHandHoldingUsd, 
  FaHandsHelping,
  FaFlag,
  FaPeopleCarry,
  FaChartLine,
  FaHandHoldingHeart
} from 'react-icons/fa';
import { useDonation } from '../../contexts/DonationContext';
import { featuredProjectImages } from '../../assets/images/projects';
import { patterns } from '../../assets/images/patterns';

const ProjectDetails = () => {
  const { openQuickDonateWithUrgentNeed } = useDonation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [categoryData, setCategoryData] = useState(null);

  // Define category icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'mosques':
        return <FaMosque className="text-2xl" />;
      case 'housing':
        return <FaHome className="text-2xl" />;
      case 'water':
        return <FaWater className="text-2xl" />;
      case 'health':
        return <FaHospital className="text-2xl" />;
      case 'education':
        return <FaGraduationCap className="text-2xl" />;
      case 'income':
        return <FaHandHoldingUsd className="text-2xl" />;
      case 'relief':
        return <FaHandsHelping className="text-2xl" />;
      default:
        return <FaHandHoldingHeart className="text-2xl" />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projectsDetail/${id}`);
        if (!response.ok) throw new Error('Project not found');
        const data = await response.json();
        setProject({
          ...data,
          image: (data.image && featuredProjectImages[data.image.replace('.jpg', '')]) || featuredProjectImages.project1,
          gallery: Array.isArray(data.gallery)
            ? data.gallery.map(img => (featuredProjectImages[img.replace('.jpg', '')] || featuredProjectImages.project1))
            : []
        });
        // Fetch category page data for this project
        if (data.category) {
          const catRes = await fetch(`/api/projectCategories/${data.category}`);
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategoryData(catData);
          } else {
            setCategoryData(null);
          }
        } else {
          setCategoryData(null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setProject(null);
        setCategoryData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-primary-600 font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the project you're looking for. It may have been moved or deleted.</p>
          <Link to="/projects" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 pt-20 pb-12 relative overflow-hidden">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      {/* Decorative Patterns */}
      <div className="absolute inset-0 pattern-overlay opacity-5" style={{ backgroundImage: `url(${patterns.geometric})` }}></div>
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.arabesque})` }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.islamic})` }}></div>
      
      <style>
        {`
          .pattern-overlay {
            background-repeat: repeat;
            background-size: 200px;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link to="/projects" className="ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ml-2">Projects</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{project.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Project Hero */}
        <div className="bg-white rounded-xl shadow-islamic overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            {/* Project category and status */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium flex items-center bg-primary-100 text-primary-700">
                {getCategoryIcon(project.category)}
                <span className="ml-1.5">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center 
                ${project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                <FaFlag className="mr-1.5" />
                {project.status === 'active' ? 'Active' : 'Completed'}
              </span>
            </div>
            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLiked(!liked)}
                className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-colors"
              >
                <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-colors"
              >
                <FaShare className="text-gray-600" />
              </motion.button>
            </div>
            {/* Back Button - bottom left inside hero */}
            <div className="absolute bottom-6 left-6 z-10">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt />
                <span>{project.location}</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  <span>{project.beneficiaries.toLocaleString()} Beneficiaries</span>
                </div>
                <div className="flex items-center">
                  <FaHandHoldingHeart className="mr-2" />
                  <span>{project.donors} Donors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="mb-6 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b">
                {['overview', 'updates', 'gallery', 'timeline'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                      activeTab === tab 
                        ? `text-primary-700 border-b-2 border-primary-600` 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                      <p className="text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Project Goals</h3>
                      <ul className="space-y-3">
                        {project.goals.map((goal, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 mt-1 bg-primary-100 text-primary-700 p-1 rounded-full">
                              <FaCheckCircle />
                            </span>
                            <span className="ml-3 text-gray-600">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Expected Impact</h3>
                      <div className="bg-primary-50 text-primary-700 p-4 rounded-lg border border-primary-200">
                        <p className="leading-relaxed">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'updates' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Project Updates</h2>
                    <div className="space-y-6">
                      {project.updates.map((update, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="border-l-4 border-primary-600 pl-4 py-2"
                        >
                          <div className="text-sm text-gray-500 mb-1">{update.date}</div>
                          <h3 className="font-medium mb-2 text-primary-700">{update.title}</h3>
                          <p className="text-gray-600">{update.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'gallery' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.gallery.map((image, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img 
                            src={image} 
                            alt={`Project ${index + 1}`} 
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'timeline' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
                    <div className="space-y-6">
                      {project.timeline.map((phase, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{phase.phase}</h3>
                            <span className={`text-sm ${phase.completion === 100 ? 'text-green-600' : 'text-primary-700'}`}>
                              {phase.completion}% Complete
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500"
                              style={{ width: `${phase.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Funding Progress */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-islamic p-6 sticky top-20"
              >
                <h2 className="text-xl font-bold mb-4">Support This Project</h2>
                
              <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Raised so far</span>
                      <span className="font-bold">${project.raisedAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500"
                        style={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{Math.round((project.raisedAmount / project.targetAmount) * 100)}% Complete</span>
                      <span>Goal: ${project.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-primary-50 text-primary-700 p-3 rounded-lg">
                      <div className="text-2xl font-bold">${project.raisedAmount.toLocaleString()}</div>
                      <div className="text-xs">Raised</div>
                    </div>
                    <div className="bg-primary-50 text-primary-700 p-3 rounded-lg">
                      <div className="text-2xl font-bold">{project.donors}</div>
                      <div className="text-xs">Donors</div>
                    </div>
                    <div className="bg-primary-50 text-primary-700 p-3 rounded-lg">
                      <div className="text-2xl font-bold">{project.beneficiaries}</div>
                      <div className="text-xs">Beneficiaries</div>
                    </div>
                </div>
                  
                  <div className="space-y-3">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-islamic-glow transition-all"
                        onClick={() => openQuickDonateWithUrgentNeed(project)}
                      >
                        <FaDonate /> Donate Now
                      </button>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        to="/initiatives"
                        className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <FaPeopleCarry /> Volunteer
                      </Link>
                    </motion.div>
                </div>
                </div>
              </motion.div>
              
              {/* Impact Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-primary-50 rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-primary-700">Project Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <FaUsers className="text-primary-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Beneficiaries</div>
                      <div className="font-bold">{project.beneficiaries.toLocaleString()} people</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <FaMoneyBillWave className="text-primary-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Funding Goal</div>
                      <div className="font-bold">${project.targetAmount.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <FaClock className="text-primary-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Project Duration</div>
                      <div className="font-bold">12 months</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Related Projects */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {project.relatedProjects.map((relatedId) => (
                    <Link key={relatedId} to={`/projects/${relatedId}`} className="block">
                      <div className="flex items-center gap-3 group">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={featuredProjectImages[`project${relatedId}`]} 
                            alt={`Project ${relatedId}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary-600 transition-colors">Featured Project {relatedId}</h4>
                          <p className="text-sm text-gray-500">Similar Project</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;