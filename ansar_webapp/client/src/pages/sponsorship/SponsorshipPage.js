import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import {
  FaUser, FaGraduationCap, FaHome, FaChalkboardTeacher, FaWheelchair,
  FaBook, FaStethoscope, FaUtensils, FaShieldAlt, FaChartLine, FaComments,
  FaCalendarAlt, FaGift, FaSchool, FaUserFriends, FaHandHoldingUsd, FaChartPie
} from 'react-icons/fa';

const iconMap = {
  FaUser, FaGraduationCap, FaHome, FaChalkboardTeacher, FaWheelchair,
  FaBook, FaStethoscope, FaUtensils, FaShieldAlt, FaChartLine, FaComments,
  FaCalendarAlt, FaGift, FaSchool, FaUserFriends, FaHandHoldingUsd, FaChartPie
};

const SponsorshipPage = () => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Get actual navbar height for precise calculations
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
    document.title = "Sponsorship | Ansar Organization";
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetch('/api/sponsorship')
      .then(res => res.json())
      .then(arr => setData(Array.isArray(arr) ? arr[0] : arr));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { hero, impactStats, categories, benefits, processSteps, testimonials } = data;

  return (
    <div className="sponsorship-page">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-primary-900 to-primary-800 overflow-hidden min-h-[80vh] flex items-center" 
        style={{ marginTop: `${navbarHeight}px` }}
      >
        <div className="absolute inset-0 bg-pattern-islamic opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300/20 via-primary-500/20 to-primary-300/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300/20 via-primary-500/20 to-primary-300/20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block bg-primary-100/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-primary-300 font-semibold">{hero?.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {hero?.subtitle}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                {hero?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {hero?.ctaButtons?.map((btn, idx) => (
                  <Link
                    key={idx}
                    to={btn.anchor}
                    className={idx === 0
                      ? "px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      : "px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"}
                  >
                    {btn.text}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats?.map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100 hover:border-primary-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`${stat.color} mb-4 flex justify-center items-center`}>
                  {iconMap[stat.icon] && React.createElement(iconMap[stat.icon], { size: 32 })}
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary-100 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold">Our Programs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive sponsorship programs tailored to meet various needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-pattern-islamic opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url('${category.image}')`}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <span className="text-white/90 text-sm">{category.stats}</span>
                    </div>
                    <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                      From ${category.monthlyAmount}/month
                    </div>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="bg-primary-100 p-4 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                    {/* You may want to map icon string to actual icon component if needed */}
                    {iconMap[category.icon] && React.createElement(iconMap[category.icon], { size: 24 })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.features?.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <FaCheckCircle className="text-primary-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={category.path}
                    className="block w-full py-3 bg-primary-600 text-white rounded-lg font-medium text-center hover:bg-primary-700 transition-colors group-hover:shadow-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary-100 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Sponsors Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our community of sponsors about their experiences and impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -top-4 left-8 bg-primary-600 text-white p-2 rounded-full">
                  <FaStar />
                </div>
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-primary-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary-100 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold">Comprehensive Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Holistic Development
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our sponsorship programs provide comprehensive support to ensure sustainable development and lasting impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits?.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary-100 p-4 w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-primary-600">
                  {iconMap[benefit.icon] && React.createElement(iconMap[benefit.icon], { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-6">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details?.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary-100 px-4 py-2 rounded-full mb-4">
              <span className="text-primary-600 font-semibold">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple 4-step process makes it easy to start making a difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps?.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -top-4 left-8 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="bg-primary-100 p-4 w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-primary-600 mx-auto">
                  {iconMap[step.icon] && React.createElement(iconMap[step.icon], { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-white font-semibold">Make a Difference</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Lives?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of compassionate sponsors and help build a better future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sponsorship/orphan"
                className="px-8 py-4 bg-white text-primary-900 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Sponsoring
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorshipPage; 