import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaGlobe, FaHandHoldingHeart, FaHome, FaUsers, FaHeart, 
  FaArrowRight, FaClipboardList, FaChartLine, FaHandsHelping,
  FaRegLightbulb, FaTrophy, FaChartPie, FaProjectDiagram
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Counter = ({ value, count, title, icon, duration = 2, color, description, label }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Use either value or count prop, defaulting to 0 if neither is provided
  const targetValue = value !== undefined ? value : (count !== undefined ? count : 0);

  useEffect(() => {
    let start = 0;
    let animationFrameId;
    const step = Math.ceil(targetValue / (duration * 60));

    const updateCount = () => {
      start += step;
      if (start < targetValue) {
        setDisplayNumber(start);
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayNumber(targetValue);
      }
    };

    if (inView) {
      updateCount();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, targetValue, duration]);

  // Format large numbers in a readable way
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  // Get gradient based on color prop
  const getGradient = () => {
    switch(color) {
      case 'primary':
        return 'from-primary-700 via-primary-600 to-primary-800';
      case 'secondary':
        return 'from-secondary-700 via-secondary-600 to-secondary-800';
      case 'accent':
        return 'from-accent-700 via-accent-600 to-accent-800';
      case 'emerald':
        return 'from-emerald-700 via-emerald-600 to-emerald-800';
      case 'violet':
        return 'from-violet-700 via-violet-600 to-violet-800';
      case 'amber':
        return 'from-amber-700 via-amber-600 to-amber-800';
      case 'cyan':
        return 'from-cyan-700 via-cyan-600 to-cyan-800';
      default:
        return 'from-primary-700 via-primary-600 to-primary-800';
    }
  };

  const getTextColor = () => {
    switch(color) {
      case 'primary':
        return 'text-primary-700 dark:text-primary-300';
      case 'secondary':
        return 'text-secondary-700 dark:text-secondary-300';
      case 'accent':
        return 'text-accent-700 dark:text-accent-300';
      case 'emerald':
        return 'text-emerald-700 dark:text-emerald-300';
      case 'violet':
        return 'text-violet-700 dark:text-violet-300';
      case 'amber':
        return 'text-amber-700 dark:text-amber-300';
      case 'cyan':
        return 'text-cyan-700 dark:text-cyan-300';
      default:
        return 'text-primary-700 dark:text-primary-300';
    }
  };

  const getBackgroundColor = () => {
    switch(color) {
      case 'primary':
        return 'bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      case 'secondary':
        return 'bg-gradient-to-br from-secondary-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      case 'accent':
        return 'bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      case 'violet':
        return 'bg-gradient-to-br from-violet-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      case 'amber':
        return 'bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      case 'cyan':
        return 'bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-900/95';
      default:
        return 'bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    }
  };

  const getBorderColor = () => {
    switch(color) {
      case 'primary':
        return 'border-l-4 border-primary-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      case 'secondary':
        return 'border-l-4 border-secondary-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      case 'accent':
        return 'border-l-4 border-accent-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      case 'emerald':
        return 'border-l-4 border-emerald-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      case 'violet':
        return 'border-l-4 border-violet-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      case 'amber':
        return 'border-l-4 border-amber-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      case 'cyan':
        return 'border-l-4 border-cyan-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
      default:
        return 'border-l-4 border-primary-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    }
  };

  const getGlowColor = () => {
    switch(color) {
      case 'primary':
        return 'shadow-glow-primary';
      case 'secondary':
        return 'shadow-glow-secondary';
      case 'accent':
        return 'shadow-glow-accent';
      case 'emerald':
        return 'shadow-glow-emerald';
      case 'violet':
        return 'shadow-glow-violet';
      case 'amber':
        return 'shadow-glow-accent';
      case 'cyan':
        return 'shadow-glow';
      default:
        return 'shadow-glow-primary';
    }
  };

  // Get gradient text color
  const getGradientText = () => {
    switch(color) {
      case 'primary':
        return 'text-primary-700 dark:text-primary-300';
      case 'secondary':
        return 'text-secondary-700 dark:text-secondary-300';
      case 'accent':
        return 'text-accent-700 dark:text-accent-300';
      case 'emerald':
        return 'text-emerald-700 dark:text-emerald-300';
      case 'violet':
        return 'text-violet-700 dark:text-violet-300';
      case 'amber':
        return 'text-amber-700 dark:text-amber-300';
      case 'cyan':
        return 'text-cyan-700 dark:text-cyan-300';
      default:
        return 'text-primary-700 dark:text-primary-300';
    }
  };

  // Get text gradient class
  const getTextGradient = (color) => {
    switch(color) {
      case 'primary':
        return 'bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-300 dark:to-primary-500';
      case 'secondary':
        return 'bg-gradient-to-r from-secondary-800 to-secondary-600 dark:from-secondary-300 dark:to-secondary-500';
      case 'accent':
        return 'bg-gradient-to-r from-accent-800 to-accent-600 dark:from-accent-300 dark:to-accent-500';
      case 'emerald':
        return 'bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500';
      case 'amber':
        return 'bg-gradient-to-r from-amber-800 to-amber-600 dark:from-amber-300 dark:to-amber-500';
      case 'violet':
        return 'bg-gradient-to-r from-violet-800 to-violet-600 dark:from-violet-300 dark:to-violet-500';
      case 'cyan':
        return 'bg-gradient-to-r from-cyan-800 to-cyan-600 dark:from-cyan-300 dark:to-cyan-500';
      default:
        return 'bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-300 dark:to-primary-500';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`${getBackgroundColor()} ${getBorderColor()} backdrop-blur-sm relative rounded-xl p-6 py-7 shadow-xl overflow-hidden text-center`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      whileHover={{ 
        y: -15, 
        transition: { duration: 0.4 },
        boxShadow: "0 25px 30px rgba(0, 0, 0, 0.12)"
      }}
    >
      <div className="relative z-10">
        <motion.div 
          className={`w-14 h-14 md:w-16 md:h-16 text-white bg-gradient-to-br ${getGradient()} rounded-xl md:rounded-2xl p-3.5 md:p-4 shadow-xl mb-4 inline-flex items-center justify-center ${getGlowColor()}`}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            transition: { duration: 0.3 } 
          }}
        >
          {icon}
        </motion.div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center mb-2">
            <span className={`text-3xl md:text-4xl font-bold ${getTextGradient(color)} bg-clip-text text-transparent`}>
              {label ? formatNumber(displayNumber) : (displayNumber !== null && displayNumber !== undefined ? formatNumber(displayNumber) : '0')}
            </span>
            {label && label.includes('+') && (
              <span className="text-2xl font-bold text-accent-700 dark:text-accent-300 ml-1">+</span>
            )}
          </div>
          
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 leading-tight">{title}</p>
          
          {description && (
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-sm font-normal mx-auto max-w-[85%] leading-snug"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {description}
            </motion.p>
          )}
          
          <motion.div 
            className={`w-16 h-1 bg-gradient-to-r ${getGradient()} rounded-full mx-auto mt-3`}
            initial={{ width: 0 }}
            animate={inView ? { width: "4rem" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 w-28 h-28 pattern-dots opacity-5 dark:opacity-10 transform rotate-12"></div>
      <div className="absolute -left-4 -bottom-4 w-28 h-28 pattern-floral opacity-5 dark:opacity-10 transform -rotate-12"></div>
    </motion.div>
  );
};

const ImpactStats = () => {
  const stats = [
    {
      id: 1,
      value: 45,
      title: 'Countries Served',
      icon: <FaGlobe size={36} />,
      color: 'primary',
      description: 'Serving communities across continents'
    },
    {
      id: 2,
      value: 1250000,
      title: 'Lives Impacted',
      icon: <FaHandHoldingHeart size={36} />,
      color: 'accent',
      description: 'Direct assistance to those in need'
    },
    {
      id: 3,
      value: 8700,
      title: 'Projects Completed',
      icon: <FaChartPie size={36} />,
      color: 'emerald',
      description: 'Success stories from around the world'
    },
    {
      id: 4,
      value: 12500,
      title: 'Volunteers',
      icon: <FaUsers size={36} />,
      color: 'violet',
      description: 'Passionate supporters of our mission'
    },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Pattern background */}
      <div className="absolute inset-0 pattern-grid opacity-5 dark:opacity-10"></div>
      
      {/* Decorative blurs */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 rounded-full bg-primary-100/30 dark:bg-primary-900/20 blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-accent-100/30 dark:bg-accent-900/20 blur-[150px]"></div>
      
      {/* Decorative elements - reduced opacity for better text contrast */}
      <motion.div 
        className="absolute top-20 right-10 w-36 h-36 pattern-hexagon opacity-5 dark:opacity-15 rounded-lg"
        animate={{
          rotate: [0, 30, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-10 w-48 h-48 pattern-mosaic opacity-5 dark:opacity-15 rounded-lg"
        animate={{
          rotate: [0, -20, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating shapes with reduced opacity for better text contrast */}
      <motion.div
        className="absolute left-[15%] top-[20%] w-12 h-12 rounded-full bg-primary-400/10 dark:bg-primary-500/20"
        animate={{
          y: [0, -15, 0],
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute right-[15%] top-[30%] w-8 h-8 rounded-md bg-accent-400/10 dark:bg-accent-500/20 rotate-45"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
          rotate: [45, 90, 45]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center mb-5 space-x-2"
          >
            <span className="h-px w-12 bg-gradient-to-r from-primary-500 to-accent-500"></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-accent-700 dark:from-primary-300 dark:to-accent-300 font-bold text-sm uppercase tracking-wide px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30">Making A Difference</span>
            <span className="h-px w-12 bg-gradient-to-r from-accent-500 to-primary-500"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-shadow-sm font-heading"
          >
            Our Global Impact
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Through your generosity and the dedicated efforts of our volunteers, we've made a significant difference in communities around the world
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative z-10 max-w-6xl mx-auto px-2">
          <Counter 
            icon={<FaGlobe className="text-primary-600 dark:text-primary-400" size={22} />}
            value={24} 
            title="Countries Served" 
            label="24+"
            color="primary" 
          />
          <Counter 
            icon={<FaUsers className="text-secondary-600 dark:text-secondary-400" size={22} />}
            value={850000} 
            title="Lives Impacted" 
            label="850K+"
            color="secondary" 
          />
          <Counter 
            icon={<FaProjectDiagram className="text-accent-600 dark:text-accent-400" size={22} />}
            value={1250} 
            title="Projects Completed" 
            label="1.2K+"
            color="accent" 
          />
          <Counter 
            icon={<FaHandsHelping className="text-emerald-600 dark:text-emerald-400" size={22} />}
            value={5000} 
            title="Volunteers" 
            label="5K+"
            color="emerald" 
          />
        </div>
        
        {/* Impact callouts */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <motion.div 
            className="bg-gradient-to-br from-primary-50 via-primary-100/70 to-primary-50/50 dark:from-gray-800 dark:via-primary-900/20 dark:to-gray-800/90 rounded-xl shadow-2xl border border-primary-200 dark:border-primary-700/40 p-8 relative overflow-hidden backdrop-blur-sm group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -15,
              scale: 1.02,
              boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.4 } 
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-full h-full pattern-dots opacity-10 dark:opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-primary-400/15 dark:bg-primary-400/10 blur-2xl group-hover:bg-primary-400/25 transition-all duration-700"></div>
            <div className="absolute top-0 right-0 w-32 h-32 pattern-dots opacity-10 dark:opacity-20 rotate-45 scale-75 transform origin-top-right group-hover:rotate-90 transition-transform duration-700"></div>
            
            {/* Floating decorative element */}
            <motion.div 
              className="absolute -right-4 top-12 w-16 h-16 rounded-lg bg-primary-500/10 dark:bg-primary-500/20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="p-5 bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 rounded-2xl inline-block mb-6 shadow-lg border border-primary-100 dark:border-primary-800/40 group-hover:shadow-primary-500/20 transition-all duration-300"
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <FaHandsHelping size={32} />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">Make a Difference Today</h3>
              
              <p className="text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-lg">
                Your donation, no matter how small, contributes to changing lives and creating lasting impact for communities in need around the world.
              </p>
              
              <Link 
                to="/donate" 
                className="inline-flex items-center justify-center px-7 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white rounded-xl shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center font-bold">
                  <FaHeart className="mr-2.5 group-hover:scale-125 transition-transform duration-300" /> Donate Now
                </span>
                
                {/* Improved button shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 1
                  }}
                />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-accent-50 via-accent-100/70 to-accent-50/50 dark:from-gray-800 dark:via-accent-900/20 dark:to-gray-800/90 rounded-xl shadow-2xl border border-accent-200 dark:border-accent-700/40 p-8 relative overflow-hidden backdrop-blur-sm group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -15,
              scale: 1.02,
              boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.4 } 
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-full h-full pattern-hexagon opacity-10 dark:opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-accent-400/15 dark:bg-accent-400/10 blur-2xl group-hover:bg-accent-400/25 transition-all duration-700"></div>
            <div className="absolute top-0 left-0 w-32 h-32 pattern-hexagon opacity-10 dark:opacity-20 rotate-12 scale-75 transform origin-top-left group-hover:-rotate-12 transition-transform duration-700"></div>
            
            {/* Floating decorative element */}
            <motion.div 
              className="absolute -left-4 top-24 w-16 h-16 rounded-full bg-accent-500/10 dark:bg-accent-500/20"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -10, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="p-5 bg-white dark:bg-gray-700 text-accent-600 dark:text-accent-400 rounded-2xl inline-block mb-6 shadow-lg border border-accent-100 dark:border-accent-800/40 group-hover:shadow-accent-500/20 transition-all duration-300"
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <FaChartLine size={32} />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-300">Join Our Mission</h3>
              
              <p className="text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-lg">
                Become a volunteer or partner with us to help expand our reach and amplify our impact around the world.
              </p>
              
              <Link 
                to="/volunteer" 
                className="inline-flex items-center justify-center px-7 py-4 bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 text-white rounded-xl shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center font-bold">
                  <FaUsers className="mr-2.5 group-hover:scale-125 transition-transform duration-300" /> Get Involved
                </span>
                
                {/* Improved button shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 1
                  }}
                />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-emerald-50 via-emerald-100/70 to-emerald-50/50 dark:from-gray-800 dark:via-emerald-900/20 dark:to-gray-800/90 rounded-xl shadow-2xl border border-emerald-200 dark:border-emerald-700/40 p-8 relative overflow-hidden backdrop-blur-sm group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -15,
              scale: 1.02,
              boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.4 } 
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-full h-full pattern-grid opacity-10 dark:opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-400/15 dark:bg-emerald-400/10 blur-2xl group-hover:bg-emerald-400/25 transition-all duration-700"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 pattern-grid opacity-10 dark:opacity-20 rotate-6 scale-75 transform origin-bottom-right group-hover:rotate-45 transition-transform duration-700"></div>
            
            {/* Floating decorative element */}
            <motion.div 
              className="absolute right-12 bottom-12 w-16 h-16 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 rotate-12"
              animate={{
                y: [0, 15, 0],
                rotate: [12, 24, 12],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="p-5 bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 rounded-2xl inline-block mb-6 shadow-lg border border-emerald-100 dark:border-emerald-800/40 group-hover:shadow-emerald-500/20 transition-all duration-300"
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <FaRegLightbulb size={32} />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">Learn About Our Impact</h3>
              
              <p className="text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-lg">
                Discover the stories of transformation and explore the lasting change our projects have created in communities worldwide.
              </p>
              
              <Link 
                to="/impact" 
                className="inline-flex items-center justify-center px-7 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center font-bold">
                  <FaTrophy className="mr-2.5 group-hover:scale-125 transition-transform duration-300" /> See Our Success
                </span>
                
                {/* Improved button shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 1
                  }}
                />
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/impact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white font-bold rounded-full border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:bg-white dark:hover:bg-gray-700/90 transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10 bg-gradient-to-r from-primary-800 to-accent-800 dark:from-primary-300 dark:to-accent-300 bg-clip-text text-transparent">View Our Full Impact Report</span>
            <motion.span
              className="relative z-10 bg-gradient-to-r from-primary-800 to-accent-800 dark:from-primary-300 dark:to-accent-300 bg-clip-text text-transparent"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight size={16} />
            </motion.span>
            {/* Button shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/70 dark:via-gray-600/40 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatDelay: 2 
              }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats; 