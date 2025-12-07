import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight, FaArrowLeft, FaGlobe, FaUsers, FaHandsHelping, FaHome,
  FaWater, FaMedkit, FaBook, FaHeartbeat, FaSeedling, FaPrayingHands,
  FaChevronRight, FaShieldAlt, FaGraduationCap, FaUtensils,
  FaDonate, FaHandHoldingHeart, FaMosque, FaClipboardCheck
} from 'react-icons/fa';

const ICONS = {
  FaArrowRight, FaArrowLeft, FaGlobe, FaUsers, FaHandsHelping, FaHome,
  FaWater, FaMedkit, FaBook, FaHeartbeat, FaSeedling, FaPrayingHands,
  FaChevronRight, FaShieldAlt, FaGraduationCap, FaUtensils,
  FaDonate, FaHandHoldingHeart, FaMosque, FaClipboardCheck
};

const HeroSection = ({ heroSlides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const intervalRef = useRef(null);

  // Defensive fallback
  const slides = heroSlides.length > 0 ? heroSlides : [];

  // Set up autoplay
  useEffect(() => {
    if (isAutoplay && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNextSlide();
      }, 6000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isAutoplay, slides.length]);

  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Enhanced animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    })
  };

  // Background images
  const backgroundImages = [
    {
      url: "/images/backgrounds/geometric-arabesque.svg",
      position: "absolute top-0 left-0 w-full h-full opacity-10 z-0 object-cover",
      animation: {
        scale: [1, 1.05, 1],
        opacity: [0.1, 0.15, 0.1],
        duration: 20,
        repeat: Infinity
      }
    },
    {
      url: "/images/backgrounds/mosque-silhouette.svg",
      position: "absolute bottom-0 left-0 w-full h-64 md:h-80 opacity-15 z-0 object-contain object-bottom",
      animation: {
        y: [0, -5, 0],
        opacity: [0.15, 0.2, 0.15],
        duration: 15,
        repeat: Infinity
      }
    },
    {
      url: "/images/backgrounds/islamic-ornament.svg",
      position: "absolute top-0 right-0 w-72 h-72 opacity-10 z-0 object-contain",
      animation: {
        rotate: [0, 5, 0, -5, 0],
        opacity: [0.1, 0.15, 0.1],
        duration: 25,
        repeat: Infinity
      }
    }
  ];

  // Animated decorative elements
  const decorativeElements = [
    { 
      size: 'w-28 h-28', 
      top: '15%', 
      left: '10%', 
      delay: 0,
      shape: 'rounded-2xl rotate-12',
      color: 'bg-primary-500/10 border border-primary-300/20 backdrop-blur-sm'
    },
    { 
      size: 'w-36 h-36', 
      top: '65%', 
      left: '5%', 
      delay: 1.5,
      shape: 'rounded-3xl -rotate-12',
      color: 'bg-accent-500/10 border border-accent-300/20 backdrop-blur-sm'
    },
    { 
      size: 'w-32 h-32', 
      top: '20%', 
      right: '12%', 
      delay: 0.7,
      shape: 'rounded-full',
      color: 'bg-emerald-500/10 border border-emerald-300/20 backdrop-blur-sm'
    },
    { 
      size: 'w-24 h-24', 
      bottom: '25%', 
      right: '15%', 
      delay: 2,
      shape: 'rounded-full',
      color: 'bg-violet-500/10 border border-violet-300/20 backdrop-blur-sm'
    }
  ];
  
  // At the top of the render, if slides is empty, return null or a fallback
  if (!slides.length) return null;

  return (
    <section className="relative overflow-hidden min-h-[80vh] md:min-h-[85vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-56 md:pt-64 pb-64 md:pb-72">
      {/* Global Background Images */}
      {backgroundImages.map((bg, index) => (
        <motion.img
          key={`bg-${index}`}
          src={bg.url}
          alt=""
          className={bg.position}
          animate={bg.animation}
          transition={{
            duration: bg.animation.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ))}
      
      {/* Enhanced pattern backgrounds */}
      <div className="absolute inset-0 pattern-grid opacity-30 mix-blend-soft-light z-10"></div>
      <div className="absolute inset-0 pattern-islamic-star opacity-20 mix-blend-overlay z-10"></div>
      
      {/* Pulsing radial gradient background */}
      <motion.div 
        className="absolute inset-0 bg-radial-gradient opacity-40 z-5"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      {/* Fixed Background Overlay */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      {/* Animated decorative elements */}
      {decorativeElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.size} ${el.shape} ${el.color} z-20`}
          style={{ 
            top: el.top, 
            left: el.left, 
            right: el.right,
            bottom: el.bottom
          }}
          animate={{
            y: [0, 15, 0],
            rotate: ['0deg', '5deg', '0deg', '-5deg', '0deg'],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 20,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Hero slider with enhanced controls */}
      <div 
        className="h-full relative py-20 md:py-28"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slide content */}
        <AnimatePresence initial={false} custom={1}>
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className="absolute inset-0"
              >
                {/* Enhanced background with parallax effect */}
                <div className="absolute inset-0 overflow-hidden mx-6 md:mx-10 my-6 md:my-10 rounded-2xl shadow-2xl">
                  <motion.div 
                    className="w-full h-full"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                  >
                  <motion.img 
                    src={slide.image} 
                    alt={slide.title} 
                      className="w-full h-full object-cover opacity-50"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    onError={(e) => {
                      e.target.src = '/images/sample/campaigns/earthquake-relief.jpg';
                    }}
                  />
                  </motion.div>
                  
                  {/* Enhanced gradient overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
                  
                  {/* Enhanced texture overlay */}
                  <div className="absolute inset-0 pattern-dots opacity-30 mix-blend-soft-light"></div>
                  
                  {/* Slide-specific decorative pattern overlays */}
                  {slide.backgroundPatterns && slide.backgroundPatterns.map((pattern, idx) => (
                    <motion.img
                      key={`pattern-${slide.id}-${idx}`}
                      src={pattern}
                      alt=""
                      className={`absolute ${idx === 0 ? 'top-0 right-0 w-1/3 h-1/3' : 'bottom-0 left-0 w-1/2 h-1/2'} object-contain opacity-10 mix-blend-overlay`}
                      animate={{
                        opacity: [0.1, 0.15, 0.1],
                        rotate: idx === 0 ? [0, 5, 0] : [0, -5, 0]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ))}
                </div>
                
                {/* Enhanced slide content with improved layout */}
                <div className="container mx-auto h-full px-6 md:px-10 pt-20 relative z-30 flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
                    {/* Left content column */}
                  <motion.div 
                      className="lg:col-span-7 text-white space-y-10 px-6 md:px-8 py-10 md:py-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                      {/* License badge and icon */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-5 mb-8"
                    >
                        <div className={`w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br ${slide.iconBg} rounded-full flex items-center justify-center border border-white/30 shadow-xl shadow-black/20`}>
                          <span className="text-white text-2xl md:text-4xl">{slide.icon}</span>
                      </div>
                        <span className="text-sm md:text-base bg-black/50 text-white px-5 py-2 rounded-full backdrop-blur-md inline-flex items-center space-x-2 shadow-xl border border-white/10">
                        <FaShieldAlt className="mr-2 text-white" />
                          <span className="font-medium">License: {slide.licenseNumber}</span>
                      </span>
                    </motion.div>
                    
                      {/* Enhanced headline */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center">
                          <div className="h-0.5 w-10 bg-white/60 mr-3"></div>
                          <span className="text-sm uppercase tracking-wider font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full inline-block backdrop-blur-sm">Our Mission</span>
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight text-shadow-xl">
                          <motion.span 
                            className="block relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            {slide.title}
                            <motion.span 
                              className="absolute -bottom-3 left-0 h-2 bg-gradient-to-r from-white/90 to-white/20 rounded-full shadow-glow-white"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                              transition={{ duration: 1, delay: 0.8 }}
                          />
                        </motion.span>
                      </h2>
                    </motion.div>
                    
                      {/* Enhanced subtitle */}
                    <motion.p 
                        className={`text-2xl md:text-3xl font-bold ${slide.gradientText} drop-shadow-2xl`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                    
                      {/* Enhanced description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      className="relative"
                    >
                      <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-white/90 to-white/40 rounded-full"></div>
                        <p className="text-white/95 text-lg md:text-xl bg-black/30 backdrop-blur-md pl-6 pr-6 py-4 rounded-xl border border-white/10 shadow-2xl leading-relaxed">
                        {slide.description}
                      </p>
                    </motion.div>
                    
                      {/* Impact highlight */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="bg-white/10 backdrop-blur-md px-4 py-3 inline-flex items-center rounded-lg text-sm text-white/90 border border-white/10 shadow-lg"
                    >
                      <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></span>
                      <span className="font-medium">{slide.highlight}</span>
                    </motion.div>
                    
                      {/* Enhanced call-to-action buttons */}
                    <motion.div 
                        className="pt-10 flex flex-wrap gap-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Link 
                        to={slide.btnLink}
                          className={`bg-gradient-to-r ${slide.iconBg} hover:opacity-90 text-white px-8 py-4 rounded-full shadow-2xl flex items-center group relative overflow-hidden border border-white/20`}
                      >
                        <span className="relative z-10 flex items-center font-bold text-lg">{slide.btnText}</span>
                        <FaChevronRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                        {/* Enhanced button shine effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatDelay: 1.5
                          }}
                        />
                      </Link>
                      
                      <Link 
                        to="/about"
                          className="border-2 border-white/50 hover:bg-white/20 text-white px-6 py-3.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl flex items-center group"
                      >
                        <span className="flex items-center font-bold">Learn More <FaArrowRight className="ml-2 opacity-80 group-hover:translate-x-1 transition-all" /></span>
                      </Link>
                    </motion.div>
                  </motion.div>
                    
                    {/* Right content column - Animated impact cards */}
                    <motion.div 
                      className="lg:col-span-5 hidden lg:flex flex-col space-y-6 items-end justify-center px-6"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                        {slide.stats && slide.stats.length > 0 && slide.stats.map((card, idx) => {
                          const StatIcon = ICONS[card.icon] || FaArrowRight;
                          return (
                            <motion.div
                              key={idx}
                              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden group"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 + (idx * 0.1) }}
                              whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                              <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${card.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                              
                              <div className="relative z-10">
                                <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${card.color} text-white mb-3`}>
                                  <StatIcon />
                                </div>
                                <div className="text-4xl font-bold text-white mb-1">{card.value}</div>
                                <div className="text-sm text-white/80">{card.title}</div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Enhanced navigation arrows */}
        <div className="absolute inset-y-0 left-0 md:left-8 flex items-center z-40">
          <motion.button 
            onClick={goToPrevSlide}
            className="bg-black/30 backdrop-blur-md text-white p-3 md:p-5 rounded-full hover:bg-white/20 border border-white/10 shadow-xl transition-all duration-300 ml-6"
            whileHover={{ x: 5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <FaArrowLeft />
          </motion.button>
        </div>
        
        <div className="absolute inset-y-0 right-0 md:right-8 flex items-center z-40">
          <motion.button 
            onClick={goToNextSlide}
            className="bg-black/30 backdrop-blur-md text-white p-3 md:p-5 rounded-full hover:bg-white/20 border border-white/10 shadow-xl transition-all duration-300 mr-6"
            whileHover={{ x: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <FaArrowRight />
          </motion.button>
        </div>
        
        {/* Enhanced slide indicators */}
        <div className="absolute -bottom-32 md:-bottom-36 left-0 right-0 flex justify-center gap-3 z-40">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-4 transition-all ${
                index === currentSlide 
                ? 'bg-white w-16 rounded-full shadow-lg' 
                : 'bg-white/40 hover:bg-white/60 w-4 rounded-full'
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Enhanced wave divider at bottom with more space */}
      <div className="absolute -bottom-2 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-white">
          <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,74.7C672,75,768,53,864,48C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
              </div>
            
      {/* Mobile impact stats section (visible only on mobile) with more padding */}
      <div className="lg:hidden mt-32 px-8 pb-24 relative z-30">
        <div className="grid grid-cols-2 gap-6">
          {slides[currentSlide] && slides[currentSlide].stats && slides[currentSlide].stats.slice(0, 4).map((card, idx) => {
            const StatIcon = ICONS[card.icon] || FaArrowRight;
            return (
              <motion.div 
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (idx * 0.1) }}
              >
                <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${card.color} opacity-40`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${card.color} text-white mb-2`}>
                    <StatIcon />
                </div>
                  <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
                  <div className="text-sm text-white/80">{card.title}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// In the slide rendering logic, replace icon JSX with dynamic lookup:
// Example usage inside render:
// const Icon = ICONS[slide.icon] || FaArrowRight;
// <Icon ... />

// When rendering each slide:
// const Icon = ICONS[slide.icon] || FaArrowRight;
// ...