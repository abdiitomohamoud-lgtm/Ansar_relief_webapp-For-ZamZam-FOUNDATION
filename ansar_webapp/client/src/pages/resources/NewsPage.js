import React from 'react';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const newsItems = [
    {
      title: "Emergency Relief Efforts in Syria",
      category: "Emergency Response",
      date: "March 20, 2024",
      image: "/images/news/syria-relief.jpg",
      excerpt: "Our team has successfully delivered essential supplies to affected communities in northern Syria, reaching over 10,000 families in need.",
      readMore: "/news/emergency-relief-syria"
    },
    {
      title: "New Water Project Launches in Yemen",
      category: "Water & Sanitation",
      date: "March 15, 2024",
      image: "/images/news/yemen-water.jpg",
      excerpt: "We're excited to announce the launch of our new water infrastructure project in Yemen, which will provide clean water to 5,000 households.",
      readMore: "/news/yemen-water-project"
    },
    {
      title: "Volunteer Spotlight: Sarah Johnson",
      category: "Volunteer Stories",
      date: "March 10, 2024",
      image: "/images/news/volunteer-spotlight.jpg",
      excerpt: "Meet Sarah Johnson, who has dedicated the past year to helping communities rebuild after natural disasters.",
      readMore: "/news/volunteer-spotlight-sarah"
    },
    {
      title: "Impact Report: Education Programs 2023",
      category: "Education",
      date: "March 5, 2024",
      image: "/images/news/education-impact.jpg",
      excerpt: "Our education initiatives have reached over 50,000 children across 10 countries, providing access to quality education.",
      readMore: "/news/education-impact-2023"
    },
    {
      title: "New Partnership with Global Aid Foundation",
      category: "Partnerships",
      date: "March 1, 2024",
      image: "/images/news/partnership.jpg",
      excerpt: "We're proud to announce a new strategic partnership that will expand our humanitarian reach across Asia.",
      readMore: "/news/global-aid-partnership"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">News & Updates</h1>
          
          <div className="mb-8">
            <p className="text-gray-600">
              Stay informed about our latest humanitarian efforts, program updates, and impact stories from around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <time className="text-sm text-gray-500 mb-2 block">{item.date}</time>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <a
                    href={item.readMore}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
                  >
                    Read more
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to receive the latest updates directly in your inbox.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsPage; 