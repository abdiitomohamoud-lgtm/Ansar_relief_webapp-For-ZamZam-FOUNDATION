import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaChalkboardTeacher, FaGraduationCap, FaSchool, FaBook } from 'react-icons/fa';
import { useDonation } from '../../../contexts/DonationContext';

const TeacherSponsorshipPage = () => {
  const { openQuickDonateWithUrgentNeed } = useDonation();
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [data, setData] = useState(null);

  useEffect(() => {
    const navbar = document.querySelector('header') || document.querySelector('nav');
    if (navbar) setNavbarHeight(navbar.offsetHeight);
    const handleResize = () => {
      const navbar = document.querySelector('header') || document.querySelector('nav');
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };
    window.addEventListener('resize', handleResize);
    document.title = "Teacher Sponsorship | Ansar Organization";
    window.scrollTo(0, 0);
    fetch('/api/sponsorship-category/teacher')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  if (!data) {
    return <div className="text-center py-16">No data found.</div>;
  }

  const { hero, impactStats, filters, items, benefits } = data;
  const filteredTeachers = activeFilter === 'all'
    ? items
    : items.filter(teacher => teacher.type === activeFilter);
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-primary-900 overflow-hidden"
        style={{
          marginTop: `${navbarHeight}px`,
          paddingTop: "6rem",
          paddingBottom: "6rem"
        }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${hero?.backgroundImage || ''}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/80"></div>
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-primary-300">{hero?.titleHighlight || 'Teacher'}</span> {hero?.titleRest || 'Sponsorship'}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {hero?.description || ''}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/sponsorship"
                  className="px-6 py-3 bg-white text-primary-700 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                >
                  <FaHandHoldingHeart className="mr-2" />
                  Back to Sponsorship
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(impactStats) && impactStats.length > 0 ? impactStats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="bg-primary-100 p-4 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-primary-600 mx-auto">
                  {stat.icon === 'chalkboard-teacher' && <FaChalkboardTeacher size={24} />}
                  {stat.icon === 'graduation-cap' && <FaGraduationCap size={24} />}
                  {stat.icon === 'school' && <FaSchool size={24} />}
                  {stat.icon === 'book-open' && <FaBook size={24} />}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            )) : <div className="col-span-3 text-center text-gray-400">No impact stats available.</div>}
          </div>
        </div>
      </section>
      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.isArray(filters) && filters.length > 0 ? filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            )) : <span className="text-gray-400">No filters available.</span>}
          </div>
        </div>
      </section>
      {/* Teachers Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredTeachers.length === 0 ? (
            <div className="text-center text-gray-400 py-16">No teachers found for this filter.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${teacher.image || ''}')` }}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                      <span className="text-sm text-gray-500">{teacher.subject}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-500">{teacher.location}</span>
                      {teacher.sponsored && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          Sponsored
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{teacher.story}</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium">
                          {teacher.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Monthly Cost</span>
                        <span className="text-lg font-bold text-primary-600">
                          ${teacher.monthlyCost}
                        </span>
                      </div>
                      {teacher.sponsored ? (
                        <button
                          className="block w-full py-2 rounded-lg font-medium text-center bg-gray-100 text-gray-500 cursor-not-allowed"
                          disabled
                        >
                          Already Sponsored
                        </button>
                      ) : (
                        <button
                          className="block w-full py-2 rounded-lg font-medium text-center bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                          onClick={() => openQuickDonateWithUrgentNeed({
                            ...teacher,
                            title: teacher.name,
                            sponsorCategory: 'teacher'
                          })}
                        >
                          Sponsor Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Impact</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {benefits?.description || ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(benefits?.items) && benefits.items.length > 0 ? benefits.items.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-primary-100 p-4 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-primary-600">
                  {benefit.icon === 'chalkboard' && <FaChalkboardTeacher size={24} />}
                  {benefit.icon === 'book-open' && <FaBook size={24} />}
                  {benefit.icon === 'school' && <FaSchool size={24} />}
                  {benefit.icon === 'graduation-cap' && <FaGraduationCap size={24} />}
                  {benefit.icon === 'user-graduate' && <FaGraduationCap size={24} />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.text}</p>
              </motion.div>
            )) : <div className="col-span-3 text-center text-gray-400">No benefits listed.</div>}
          </div>
        </div>
      </section>
    </>
  );
}

export default TeacherSponsorshipPage;