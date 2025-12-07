import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaWater, 
  FaBreadSlice, 
  FaBook, 
  FaHands, 
  FaHome, 
  FaHeart, 
  FaMosque, 
  FaHandHoldingHeart,
  FaArrowRight
} from 'react-icons/fa';

const DonationCategories = () => {
  const categories = [
    {
      id: 9,
      title: 'General Sadaqah',
      description: 'Give voluntary charity and support impactful causes',
      icon: FaHandHoldingHeart,
      color: 'from-yellow-500 to-yellow-700',
      bgColor: '#FBBF24',
      textColor: 'text-yellow-500',
      path: '/sadaqah/general-1',
      image: '/images/sadaqah/general-sadaqah.jpg'
    },
    {
      id: 10,
      title: 'Food Sadaqah',
      description: 'Support food security programs and provide meals to those in need.',
      icon: FaBreadSlice,
      color: 'from-amber-500 to-amber-700',
      bgColor: '#F59E0B',
      textColor: 'text-amber-500',
      path: '/sadaqah/general-3',
      image: '/images/sadaqah/food-sadaqah.jpg'
    },
    {
      id: 11,
      title: 'Water Sadaqah',
      description: 'Help provide clean water to communities in need.',
      icon: FaWater,
      color: 'from-blue-500 to-blue-700',
      bgColor: '#3B82F6',
      textColor: 'text-blue-500',
      path: '/sadaqah/specific-1',
      image: '/images/sadaqah/water-sadaqah.jpg'
    },
    {
      id: 1,
      title: 'Water',
      description: 'Provide clean water to communities in need',
      icon: FaWater,
      color: 'from-blue-500 to-blue-700',
      bgColor: '#3B82F6',
      textColor: 'text-blue-500',
      path: '/projects/categories/water',
      image: '/images/sample/campaigns/clean-water.jpg'
    },
    {
      id: 2,
      title: 'Food',
      description: 'Feed the hungry and support food security',
      icon: FaBreadSlice,
      color: 'from-amber-500 to-amber-700',
      bgColor: '#F59E0B',
      textColor: 'text-amber-500',
      path: '/sadaqah/general-3',
      image: '/images/sample/campaigns/food-security.jpg'
    },
    {
      id: 3,
      title: 'Education',
      description: 'Support schools and educational programs',
      icon: FaBook,
      color: 'from-emerald-500 to-emerald-700',
      bgColor: '#10B981',
      textColor: 'text-emerald-500',
      path: '/projects/categories/education',
      image: '/images/sample/campaigns/education.jpg'
    },
    {
      id: 4,
      title: 'Orphans',
      description: 'Help orphaned children receive care and support',
      icon: FaHands,
      color: 'from-purple-500 to-purple-700',
      bgColor: '#8B5CF6',
      textColor: 'text-purple-500',
      path: '/sponsorship/orphan',
      image: '/images/campaigns/hero/orphans.jpg'
    },
    {
      id: 5,
      title: 'Housing',
      description: 'Build and repair homes for displaced families',
      icon: FaHome,
      color: 'from-pink-500 to-pink-700',
      bgColor: '#EC4899',
      textColor: 'text-pink-500',
      path: '/projects/categories/housing',
      image: '/images/campaigns/emergency-aid.jpg'
    },
    {
      id: 6,
      title: 'Medical',
      description: 'Provide healthcare and medical supplies',
      icon: FaHeart,
      color: 'from-red-500 to-red-700',
      bgColor: '#EF4444',
      textColor: 'text-red-500',
      path: '/projects/categories/health',
      image: '/images/sample/campaigns/healthcare.jpg'
    },
    {
      id: 7,
      title: 'Mosques',
      description: 'Build and renovate houses of worship',
      icon: FaMosque,
      color: 'from-teal-500 to-teal-700',
      bgColor: '#14B8A6',
      textColor: 'text-teal-500',
      path: '/projects/categories/mosques',
      image: '/images/campaigns/hero/mosque.jpg'
    },
    {
      id: 8,
      title: 'Zakat',
      description: 'Fulfill your religious obligation to give',
      icon: FaHandHoldingHeart,
      color: 'from-indigo-500 to-indigo-700',
      bgColor: '#6366F1',
      textColor: 'text-indigo-500',
      path: '/campaigns/zakat',
      image: '/images/campaigns/hero/zakat.jpg'
    },
  ];

  // For categories without specific images, use these fallbacks
  const defaultImages = [
    '/images/campaigns/winter.jpg',
    '/images/campaigns/school.jpg',
    '/images/campaigns/ramadan.jpg',
    '/images/campaigns/eid-gifts.jpg'
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-5 pattern-overlay"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block relative mb-2">
            <div className="h-1 w-10 bg-primary-500 absolute -top-4 left-1/2 transform -translate-x-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-heading relative inline-block">
              Make a Difference Today
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-primary-500"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our various donation categories and help those in need around the world. 
            Your generosity can transform lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            // Use default image as fallback if category image doesn't exist
            const fallbackImage = defaultImages[index % defaultImages.length];
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group relative h-64"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
          src={(() => {
            if (category.title === 'Medical') return '/assets/images/campaigns/healthcare.jpg';
            if (category.title === 'Food') return '/assets/images/campaigns/food-security.jpg';
            if (category.title === 'Housing') return '/assets/images/campaigns/housing.jpg';
            return category.image && category.image.trim() ? category.image : '/assets/images/campaigns/emergency.jpg';
          })()}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            if (!e.target.src.includes('/assets/images/campaigns/emergency.jpg')) {
              e.target.src = '/assets/images/campaigns/emergency.jpg';
            }
          }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                </div>
                
                <Link to={category.path} className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                  <div className="mb-4">
                    <div className="bg-white/70 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg mb-3">
                      <IconComponent size={28} color={category.bgColor} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">
                      {category.title}
                    </h3>
                    <p className="text-white/90 text-sm max-w-xs mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  
                  <motion.div 
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-white font-medium text-sm"
                  >
                    Donate Now
                    <FaArrowRight className="ml-2 text-xs" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/campaigns">
            <motion.button 
              className="btn-islamic btn-islamic-primary px-6 py-3 shadow-md flex items-center mx-auto"
              whileHover={{ 
                y: -4, 
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
              }}
              whileTap={{ y: 0 }}
            >
              View All Categories
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <FaArrowRight />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationCategories; 