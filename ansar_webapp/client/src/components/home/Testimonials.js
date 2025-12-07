import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { LoadingSpinner } from '../common';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch testimonials
    const fetchTestimonials = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock testimonials data
        const mockTestimonials = [
          {
            id: 1,
            name: 'Ahmed Hassan',
            role: 'Regular Donor',
            avatar: '/images/testimonials/person1.jpg',
            text: 'I have been donating to Ansar Charity for over 5 years. Their transparency and the impact they create is truly remarkable. I can see exactly how my donations are making a difference.',
            rating: 5
          },
          {
            id: 2,
            name: 'Fatima Ali',
            role: 'Volunteer',
            avatar: '/images/testimonials/person2.jpg',
            text: 'As a volunteer, I\'ve witnessed first-hand the incredible work Ansar Charity does in communities worldwide. The team is dedicated, compassionate, and truly committed to making a difference.',
            rating: 4.5
          },
          {
            id: 3,
            name: 'Mohammad Qureshi',
            role: 'Corporate Partner',
            avatar: '/images/testimonials/person3.jpg',
            text: 'Our company has partnered with Ansar Charity on several initiatives. Their professionalism and the impact of their programs have exceeded our expectations. A truly outstanding organization.',
            rating: 5
          }
        ];
        
        setTestimonials(mockTestimonials);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
    
    // Auto-rotate testimonials
    const rotationTimer = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(rotationTimer);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pattern-geometric opacity-5 pattern-overlay"></div>
      
      {/* Decorative elements */}
      <div className="decorative-pattern decorative-pattern-1 pattern-arabesque"></div>
      <div className="decorative-pattern decorative-pattern-2 pattern-islamic-star"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <div className="decorative-line mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              What Our Donors Say
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Hear from the people who support our mission and help make our work possible
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card mb-8"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md mb-4 md:mb-0">
                  <img 
                    src={testimonials[currentIndex]?.avatar} 
                    alt={testimonials[currentIndex]?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[currentIndex]?.name)}&background=random`;
                    }}
                  />
                </div>
                <div className="md:ml-6 flex-grow text-center md:text-left">
                  <FaQuoteLeft className="text-primary-300 text-3xl mb-4 mx-auto md:mx-0" />
                  <p className="text-gray-700 text-lg italic mb-4">"{testimonials[currentIndex]?.text}"</p>
                  <div className="mb-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = testimonials[currentIndex]?.rating || 0;
                      return star <= Math.floor(rating) ? (
                        <FaStar key={star} className="inline-block text-accent-500 mr-1" />
                      ) : star <= rating ? (
                        <FaStarHalfAlt key={star} className="inline-block text-accent-500 mr-1" />
                      ) : (
                        <FaStar key={star} className="inline-block text-gray-300 mr-1" />
                      );
                    })}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonials[currentIndex]?.name}</h4>
                  <p className="text-primary-600">{testimonials[currentIndex]?.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex 
                    ? 'bg-primary-600 w-6 transition-all duration-300' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 