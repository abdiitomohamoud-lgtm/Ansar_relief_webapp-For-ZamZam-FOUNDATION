import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard';
import { heroImages } from '../../../assets/images/projects';
import { FaChartBar, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';

// Add default hero image and icons
const defaultHeroImage = "/assets/images/projects/default-hero.jpg";
const statIcons = [
  <FaChartBar className="w-6 h-6 text-primary-700" />,
  <FaCheckCircle className="w-6 h-6 text-green-600" />,
  <FaClock className="w-6 h-6 text-yellow-600" />,
  <FaUsers className="w-6 h-6 text-blue-600" />
];

const ProjectCategoryPage = ({ category }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'newest'
  });
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projectCategories/${category}`);
        if (!res.ok) throw new Error('Category not found');
        const data = await res.json();
        setCategoryData(data);
        // Fetch projects for this category
        if (Array.isArray(data.projectIds)) {
          // You may want to fetch each project detail, or if you have a batch endpoint, use that
          const projectPromises = data.projectIds.map(id => fetch(`/api/projectsDetail/${id}`).then(r => r.json()));
          const projectsData = await Promise.all(projectPromises);
          setProjects(projectsData);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching category page:', error);
        setCategoryData(null);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-primary-600 font-medium">Loading category page...</p>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the category you're looking for.</p>
        </div>
      </div>
    );
  }

  const filteredProjects = projects.filter(project => {
    const title = project.title || '';
    const description = project.description || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aId = a.id || '';
    const bId = b.id || '';
    if (filters.sortBy === 'newest') return bId.localeCompare(aId);
    if (filters.sortBy === 'oldest') return aId.localeCompare(bId);
    if (filters.sortBy === 'most-funded') return (b.raisedAmount || 0) - (a.raisedAmount || 0);
    if (filters.sortBy === 'least-funded') return (a.raisedAmount || 0) - (b.raisedAmount || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden pt-20">
        {/* Back Button - bottom left inside hero */}
        <div className="absolute bottom-6 left-6 z-10">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg shadow hover:bg-primary-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
        {/* Background Image */}
        <img
          src={categoryData.heroImage || defaultHeroImage}
          alt={categoryData.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ zIndex: 1 }}
        />
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(/assets/images/patterns/pattern.png)`, zIndex: 2 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-700/90" style={{ zIndex: 3 }} />
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4" style={{ zIndex: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryData.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {categoryData.description}
            </p>
          </motion.div>
        </div>
      </div>
      {/* Impact Stats */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-2">{statIcons[0]}</div>
              <div className="text-3xl font-bold text-primary-900 mb-2">
                {categoryData.impactStats?.projects ?? 0}
              </div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-2">{statIcons[1]}</div>
              <div className="text-3xl font-bold text-green-700 mb-2">
                {categoryData.impactStats?.completed ?? 0}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-2">{statIcons[2]}</div>
              <div className="text-3xl font-bold text-yellow-700 mb-2">
                {categoryData.impactStats?.ongoing ?? 0}
              </div>
              <div className="text-sm text-gray-600">Ongoing</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-primary-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-2">{statIcons[3]}</div>
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {categoryData.impactStats?.beneficiaries ?? 0}
              </div>
              <div className="text-sm text-gray-600">Beneficiaries</div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Projects Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCategoryPage;