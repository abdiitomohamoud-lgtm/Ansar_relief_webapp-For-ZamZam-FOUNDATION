import React from 'react';
import { motion } from 'framer-motion';
import { FaRegClock, FaRegCalendar, FaArrowRight, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NewsCard = ({ item, savedArticles, toggleSavedArticle, formatDate, getCategoryBadgeStyle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.1 }}
      className="min-w-[320px] max-w-[400px] flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group transform hover:-translate-y-1"
      style={{ width: `calc(100%/3 - 2rem)` }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/images/sample/news-placeholder.jpg";
          }}
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
  );
};

export default NewsCard;