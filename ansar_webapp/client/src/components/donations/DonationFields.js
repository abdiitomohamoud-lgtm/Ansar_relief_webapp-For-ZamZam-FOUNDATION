import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaTint,
  FaUsers,
  FaHandHoldingHeart,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaArrowRight,
  FaRegClock,
  FaBoxOpen,
  FaHeart
} from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const DonationFields = () => {
  const fields = [
    {
      icon: FaHome,
      title: 'Shelter',
      description: 'Provide safe housing for families in need',
      color: 'blue',
      link: '/sadaqah/general',
      stats: { beneficiaries: '5,000+', projects: '25+' }
    },
    {
      icon: FaTint,
      title: 'Water',
      description: 'Supply clean water to communities',
      color: 'cyan',
      link: '/sadaqah/water',
      stats: { beneficiaries: '10,000+', projects: '150+' }
    },
    {
      icon: FaUsers,
      title: 'Social',
      description: 'Support community development programs',
      color: 'purple',
      link: '/sadaqah/general',
      stats: { beneficiaries: '15,000+', projects: '45+' }
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Relief',
      description: 'Emergency aid for crisis situations',
      color: 'red',
      link: '/sadaqah/general',
      stats: { beneficiaries: '25,000+', projects: '100+' }
    },
    {
      icon: FaGraduationCap,
      title: 'Education',
      description: 'Enable access to quality education',
      color: 'green',
      link: '/sadaqah/general',
      stats: { beneficiaries: '8,000+', projects: '35+' }
    },
    {
      icon: FaBriefcaseMedical,
      title: 'Healthcare',
      description: 'Provide essential medical services',
      color: 'pink',
      link: '/sadaqah/general',
      stats: { beneficiaries: '12,000+', projects: '40+' }
    },
    {
      icon: FaRegClock,
      title: 'Monthly',
      description: 'Regular support for continuous impact',
      color: 'indigo',
      link: '/sadaqah/monthly',
      stats: { beneficiaries: '3,000+', projects: '15+' }
    },
    {
      icon: FaBoxOpen,
      title: 'Food',
      description: 'Feed families and communities in need',
      color: 'orange',
      link: '/sadaqah/food',
      stats: { beneficiaries: '20,000+', projects: '60+' }
    },
    {
      icon: FaHeart,
      title: 'Friday',
      description: 'Special blessings of Friday charity',
      color: 'emerald',
      link: '/sadaqah/friday',
      stats: { beneficiaries: '5,000+', projects: '30+' }
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-600',
        light: 'bg-blue-50',
        border: 'border-blue-200',
        gradient: 'from-blue-600 to-blue-700',
        lightGradient: 'from-blue-50 to-blue-100',
        shadow: 'shadow-blue-500/20',
        ring: 'ring-blue-500/10'
      },
      cyan: {
        bg: 'bg-cyan-600',
        text: 'text-cyan-600',
        hover: 'hover:bg-cyan-600',
        light: 'bg-cyan-50',
        border: 'border-cyan-200',
        gradient: 'from-cyan-600 to-cyan-700',
        lightGradient: 'from-cyan-50 to-cyan-100',
        shadow: 'shadow-cyan-500/20',
        ring: 'ring-cyan-500/10'
      },
      purple: {
        bg: 'bg-purple-600',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-600',
        light: 'bg-purple-50',
        border: 'border-purple-200',
        gradient: 'from-purple-600 to-purple-700',
        lightGradient: 'from-purple-50 to-purple-100',
        shadow: 'shadow-purple-500/20',
        ring: 'ring-purple-500/10'
      },
      red: {
        bg: 'bg-red-600',
        text: 'text-red-600',
        hover: 'hover:bg-red-600',
        light: 'bg-red-50',
        border: 'border-red-200',
        gradient: 'from-red-600 to-red-700',
        lightGradient: 'from-red-50 to-red-100',
        shadow: 'shadow-red-500/20',
        ring: 'ring-red-500/10'
      },
      green: {
        bg: 'bg-green-600',
        text: 'text-green-600',
        hover: 'hover:bg-green-600',
        light: 'bg-green-50',
        border: 'border-green-200',
        gradient: 'from-green-600 to-green-700',
        lightGradient: 'from-green-50 to-green-100',
        shadow: 'shadow-green-500/20',
        ring: 'ring-green-500/10'
      },
      pink: {
        bg: 'bg-pink-600',
        text: 'text-pink-600',
        hover: 'hover:bg-pink-600',
        light: 'bg-pink-50',
        border: 'border-pink-200',
        gradient: 'from-pink-600 to-pink-700',
        lightGradient: 'from-pink-50 to-pink-100',
        shadow: 'shadow-pink-500/20',
        ring: 'ring-pink-500/10'
      },
      indigo: {
        bg: 'bg-indigo-600',
        text: 'text-indigo-600',
        hover: 'hover:bg-indigo-600',
        light: 'bg-indigo-50',
        border: 'border-indigo-200',
        gradient: 'from-indigo-600 to-indigo-700',
        lightGradient: 'from-indigo-50 to-indigo-100',
        shadow: 'shadow-indigo-500/20',
        ring: 'ring-indigo-500/10'
      },
      orange: {
        bg: 'bg-orange-600',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-600',
        light: 'bg-orange-50',
        border: 'border-orange-200',
        gradient: 'from-orange-600 to-orange-700',
        lightGradient: 'from-orange-50 to-orange-100',
        shadow: 'shadow-orange-500/20',
        ring: 'ring-orange-500/10'
      },
      emerald: {
        bg: 'bg-emerald-600',
        text: 'text-emerald-600',
        hover: 'hover:bg-emerald-600',
        light: 'bg-emerald-50',
        border: 'border-emerald-200',
        gradient: 'from-emerald-600 to-emerald-700',
        lightGradient: 'from-emerald-50 to-emerald-100',
        shadow: 'shadow-emerald-500/20',
        ring: 'ring-emerald-500/10'
      }
    };
    return colors[color];
  };

  // Card hover animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0.8, rotate: -10, opacity: 0.5 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.3, 
        ease: "easeOut"
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3, 
        delay: 0.3 
      }
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-5" style={{ color: '#1E40AF' }}></div>
      
      {/* Floating gradient circles for background effect */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Donation Fields"
          subtitle="Choose from various fields of charitable work to make your contribution and help those most in need"
          tag="MAKE A DIFFERENCE"
          titleColor="blue"
          tagColor="blue"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {fields.map((field, index) => {
            const colors = getColorClasses(field.color);
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 border border-gray-100 ${colors.shadow} ${colors.ring} ring-1 hover:shadow-2xl`}
              >
                <Link to={field.link} className="block p-8 relative h-full">
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 ${colors.bg} opacity-10 rounded-bl-full`}></div>
                  
                  {/* Background gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-gray-50/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Pattern background */}
                  <div className={`absolute inset-0 pattern-dots opacity-0 group-hover:opacity-5 transition-opacity`} style={{ color: colors.text }}></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon with animated container */}
                    <motion.div
                      variants={iconVariants}
                      className={`w-16 h-16 bg-gradient-to-br ${colors.lightGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border ${colors.border} shadow-md`}
                    >
                      <field.icon className={`text-2xl ${colors.text}`} />
                    </motion.div>
                    
                    <div>
                      {/* Title with underline effect */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 relative inline-block">
                        {field.title}
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${colors.gradient} group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100`}></span>
                      </h3>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">{field.description}</p>
                    </div>
                    
                    {/* Stats with improved visualization */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-6 p-4 bg-gray-50/80 backdrop-blur-sm rounded-lg group-hover:bg-gradient-to-br group-hover:from-gray-50/90 group-hover:to-white/90 transition-colors duration-300 shadow-sm">
                      <div className="text-sm">
                          <p className={`${colors.text} font-bold text-base`}>{field.stats.beneficiaries}</p>
                          <p className="text-gray-600 font-medium">Beneficiaries</p>
                      </div>
                        <div className={`h-10 w-px bg-gray-200 group-hover:${colors.bg} group-hover:opacity-10 transition-colors duration-300`}></div>
                      <div className="text-sm text-right">
                          <p className={`${colors.text} font-bold text-base`}>{field.stats.projects}</p>
                          <p className="text-gray-600 font-medium">Projects</p>
                      </div>
                    </div>

                      {/* Call to action button */}
                      <motion.div 
                        variants={buttonVariants}
                        className={`inline-flex items-center text-sm font-medium py-2.5 px-5 rounded-full bg-gradient-to-r ${colors.gradient} text-white shadow-sm transform transition-all duration-300`}
                      >
                        <span>
                        Donate Now
                      </span>
                        <FaArrowRight className="ml-2" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Fields
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DonationFields; 