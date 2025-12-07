import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegClock, FaRegBookmark, FaBookmark, FaArrowRight, FaRegCalendar, FaArrowLeft } from 'react-icons/fa';
import { HoverSection, Badge } from '../../components/common';
import config from '../../utils/config';

const LatestNews = ({ news = [] }) => {
  const [savedArticles, setSavedArticles] = useState({});
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  // Slider state for second row
  const [sliderIndex, setSliderIndex] = useState(0);
  const cardsPerView = 3; // Show 3 cards at a time (adjust for mobile if needed)
  const newsCards = news.slice(1);
  const maxIndex = Math.max(0, newsCards.length - cardsPerView);

  useEffect(() => {
    if (!autoplay || !news.length) return;
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) =>
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [news, autoplay, currentFeaturedIndex]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleSavedArticle = (id, e) => {
    if (e) e.stopPropagation();
    setSavedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrevFeatured = useCallback(() => {
    const featuredArticles = news.filter(article => article.featured);
    if (featuredArticles.length <= 1) return;
    
    setCurrentFeaturedIndex(prevIndex => 
      prevIndex === 0 ? featuredArticles.length - 1 : prevIndex - 1
    );
  }, [news]);

  const handleNextFeatured = useCallback(() => {
    const featuredArticles = news.filter(article => article.featured);
    if (featuredArticles.length <= 1) return;
    
    setCurrentFeaturedIndex(prevIndex => 
      prevIndex === featuredArticles.length - 1 ? 0 : prevIndex + 1
    );
  }, [news]);

  // Add slider navigation handlers for news cards
  const handlePrev = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setSliderIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  // Decorative elements
  const decorElements = [
    { top: '5%', left: '3%', rotation: 15, size: 'w-24 h-24', delay: 0.2, pattern: 'pattern-hexagon' },
    { top: '70%', right: '5%', rotation: -20, size: 'w-16 h-16', delay: 0.5, pattern: 'pattern-dots' },
    { bottom: '15%', left: '8%', rotation: 30, size: 'w-20 h-20', delay: 0.8, pattern: 'pattern-floral' }
  ];

  // Get category badge style
  const getCategoryBadgeStyle = (category) => {
    switch(category) {
      case 'Emergency':
        return 'bg-red-100 text-red-900';
      case 'Education':
        return 'bg-blue-100 text-blue-900';
      case 'Healthcare':
        return 'bg-green-100 text-green-900';
      case 'Environment':
        return 'bg-blue-100 text-blue-900';
      case 'Food':
        return 'bg-orange-100 text-orange-900';
      case 'Empowerment':
        return 'bg-purple-100 text-purple-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  // Get variant by index
  const getVariantByIndex = (index) => {
    const variants = ["primary", "accent", "secondary", "emerald", "violet"];
    return variants[index % variants.length];
  };

  // Replace handleImageError to use config.defaultImages.news
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = config.defaultImages.news || '/assets/images/news/news-1.jpg';
  };

  // In all <img src={...}> for news images, use a helper to resolve the path
  function resolveNewsImage(image) {
    if (!image) return config.defaultImages.news;
    // If already absolute (starts with http or /assets), return as is
    if (/^(https?:\/\/|\/assets)/.test(image)) return image;
    // Otherwise, prepend news image path
    return `${config.imagePaths.news}/${image.replace(/^\/+/, '')}`;
  }

  if (!news.length) {
    return (
      <div className="text-center py-12 text-gray-500">No news available at this time.</div>
    );
  }

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Enhanced pattern background */}
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial-primary opacity-5"></div>
      
      {/* Decorative elements with enhanced animations */}
      {decorElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.size} ${el.pattern} opacity-5 rounded-lg backdrop-blur-sm`}
          style={{ 
            top: el.top, 
            right: el.right,
            bottom: el.bottom,
            left: el.left,
            transform: `rotate(${el.rotation}deg)` 
          }}
          animate={{ 
            rotate: [el.rotation, el.rotation + 15, el.rotation],
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 12,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          {/* Enhanced section header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4 shadow-sm"
            >
              Latest Updates
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              News & Impact Stories
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-6 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-700 max-w-2xl mx-auto"
            >
              Stay informed about our latest initiatives and the impact we're making together
            </motion.p>
          </div>

          {/* Featured Article (first news item) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-16 group hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-[600px] md:h-[700px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
              <img
                src={resolveNewsImage(news[0]?.image)}
                alt={news[0]?.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm shadow-lg ${getCategoryBadgeStyle(news[0]?.category)}`}>
                      {news[0]?.category}
                    </span>
                    <div className="flex items-center text-white/90 space-x-4 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg">
                      <span className="flex items-center">
                        <FaRegClock className="mr-2" />
                        {news[0]?.readTime} min read
                      </span>
                      <span className="flex items-center">
                        <FaRegCalendar className="mr-2" />
                        {formatDate(news[0]?.date)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-shadow-lg">
                    {news[0]?.title}
                  </h3>
                  <p className="text-xl text-white/90 mb-8 line-clamp-2 max-w-3xl text-shadow">
                    {news[0]?.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center backdrop-blur-sm bg-black/20 p-2 rounded-xl">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={news[0]?.authorImage}
                          alt={news[0]?.author}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(news[0]?.author)}&background=random`;
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-white font-medium">{news[0]?.author}</p>
                        <p className="text-white/80 text-sm">{news[0]?.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/news/${news[0]?.id}`}
                        className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors group shadow-lg hover:shadow-xl"
                      >
                        Read Full Story
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button
                        onClick={(e) => toggleSavedArticle(news[0]?.id, e)}
                        className="inline-flex items-center px-4 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
                      >
                        {savedArticles[news[0]?.id] ? (
                          <><FaBookmark className="mr-2" /> Saved</>
                        ) : (
                          <><FaRegBookmark className="mr-2" /> Save Article</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* News Grid as Slider */}
          <div className="relative mt-8">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 text-primary-600 hover:bg-primary-50 disabled:opacity-30"
              onClick={handlePrev}
              disabled={sliderIndex === 0}
              aria-label="Previous"
              style={{ display: newsCards.length > cardsPerView ? 'block' : 'none' }}
            >
              <FaArrowLeft />
            </button>
            <div className="overflow-x-hidden">
              <div
                className="flex transition-transform duration-500 gap-8"
                style={{ transform: `translateX(-${sliderIndex * (100 / cardsPerView)}%)` }}
              >
                {newsCards.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="min-w-[320px] max-w-[400px] flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group transform hover:-translate-y-1"
                    style={{ width: `calc(100%/${cardsPerView} - 2rem)` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={resolveNewsImage(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm shadow-lg ${getCategoryBadgeStyle(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                        <div className="flex items-center">
                          <FaRegCalendar className="mr-2 text-gray-500" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <FaRegClock className="mr-2 text-gray-500" />
                          <span>{item.readTime} min read</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={item.authorImage}
                              alt={item.author}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.author)}&background=random`;
                              }}
                            />
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">{item.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => toggleSavedArticle(item.id, e)}
                            className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
                            aria-label={savedArticles[item.id] ? "Remove from saved" : "Save article"}
                          >
                            <FaBookmark className={`w-5 h-5 ${savedArticles[item.id] ? 'text-primary-600' : ''}`} />
                          </button>
                          <Link
                            to={`/news/${item.id}`}
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                          >
                            Read More
                            <FaArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 text-primary-600 hover:bg-primary-50 disabled:opacity-30"
              onClick={handleNext}
              disabled={sliderIndex === maxIndex}
              aria-label="Next"
              style={{ display: newsCards.length > cardsPerView ? 'block' : 'none' }}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="text-center mt-16">
          <Link
            to="/news"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 font-semibold group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All News & Stories
            <FaArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;