import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock, FaTag, FaUser, FaArrowLeft } from 'react-icons/fa';

// Import mock data
import newsData from '../data/news.js';

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false); // No longer loading since we're using mock data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using mock data directly, no API calls needed
    setLoading(true);
    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        setNews(newsData);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load news.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="loader" /></div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 px-4 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center text-primary-600 hover:underline">
            <FaArrowLeft className="mr-2" /> Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">All News</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {(Array.isArray(news) ? news : []).map(item => (
            <Link to={`/news/${item.id}`} key={item.id} className="block bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden border border-gray-100 hover:border-primary-200 group">
              <div className="h-56 w-full overflow-hidden relative">
                <img
                  src={item.image || '/images/news/default.jpg'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/images/news/default.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded text-xs font-semibold shadow">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                  <FaRegClock /> {item.date} &bull; {item.readTime || '3 min read'}
                </div>
                <h2 className="text-xl font-bold mb-1 text-gray-900 line-clamp-2 group-hover:text-primary-700 transition-colors">{item.title}</h2>
                <p className="text-gray-700 mb-2 line-clamp-3">{item.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-1">
                  {item.tags && item.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium">
                      <FaTag className="mr-1" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FaUser /> {item.author || 'Admin'}
                  <span className="ml-auto font-semibold text-primary-600">{item.comments || 0} Comments</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNews;