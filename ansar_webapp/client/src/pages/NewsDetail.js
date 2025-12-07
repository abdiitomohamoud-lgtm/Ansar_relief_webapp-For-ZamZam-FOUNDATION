import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRegClock, FaTag, FaUser, FaEye } from 'react-icons/fa';
import config from '../utils/config';
import NewsComments from '../components/news/NewsComments';
import GalleryModal from '../components/news/GalleryModal';

// Import mock data
import newsData from '../data/news.js';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(false); // No longer loading since we're using mock data
  const [error, setError] = useState(null);
  const [views, setViews] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    // Set document title
    document.title = "News Detail - Ansar Relief";
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Using mock data directly, no API calls needed
    setLoading(true);
    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        // Find the specific news item by ID
        const selectedNews = newsData.find(item => item.id === id) || newsData[0] || null;
        
        if (selectedNews) {
          setNews(selectedNews);
          // Set all news except the current one
          setAllNews(newsData.filter(item => item.id !== id));
          setLoading(false);
          // Simulate page views (random for demo)
          setViews(Math.floor(Math.random() * 1000) + 100);
        } else {
          setError('News not found.');
          setLoading(false);
        }
      }, 500);
    } catch (err) {
      setError('Failed to load news.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition">
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 px-4 pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Main News Content */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={news.image || config.defaultImages.news || '/images/news/default.jpg'}
              alt={news.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={e => {
                e.target.onerror = null;
                e.target.src = config.defaultImages.news || '/images/news/default.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium text-gray-700 flex items-center">
              <FaRegClock className="mr-1 text-primary-500" size={12} />
              {news.date} &bull; {news.readTime}
            </div>
            <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded text-xs font-medium">
              {news.category}
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/80 px-3 py-1 rounded text-xs font-medium text-gray-700">
              <FaEye className="mr-1 text-primary-500" size={12} />
              {views} views
            </div>
          </div>
          <div className="p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Link to="/news" className="inline-flex items-center text-primary-600 hover:underline">
                <FaArrowLeft className="mr-2" /> Back to News
              </Link>
              <Link to="/news" className="ml-4 text-sm text-primary-700 font-semibold hover:underline">
                View All News
              </Link>
              <span className="inline-flex items-center text-gray-500 text-sm">
                <FaUser className="mr-1" /> {news.author}
              </span>
              <span className="inline-flex items-center text-gray-500 text-sm">
                <FaRegClock className="mr-1" /> {news.date}
              </span>
              <span className="inline-flex items-center text-gray-500 text-sm">
                {news.comments} Comments
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">{news.title}</h1>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Main Article Image */}
              <div className="flex-shrink-0 w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
                <img
                  src={news.image || config.defaultImages.news || '/images/news/default.jpg'}
                  alt={news.title}
                  className="w-full h-64 object-cover rounded-xl"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = config.defaultImages.news || '/images/news/default.jpg';
                  }}
                />
              </div>
              {/* Article Excerpt and Highlights */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-lg text-gray-700 mb-4">{news.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {news.tags && news.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium">
                      <FaTag className="mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* --- DETAILED CONTENT --- */}
            <div className="prose max-w-none mb-8 text-gray-800 text-lg leading-relaxed bg-primary-50/30 rounded-xl p-6 shadow-inner">
              {news.content ? (
                <>
                  {news.content.split('\n').map((para, idx) => (
                    <p key={idx} className="mb-4">{para}</p>
                  ))}
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-700">Key Highlights</h2>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Impactful statistics and real-life stories</li>
                    <li>Community involvement and feedback</li>
                    <li>Future plans and sustainability</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-primary-800 mb-6 bg-primary-100/40 rounded">
                    "Together, we are making a difference in the lives of thousands."
                  </blockquote>
                  <h3 className="text-xl font-semibold mb-2 text-primary-600">How You Can Help</h3>
                  <p className="mb-4">Support our ongoing projects by donating, volunteering, or spreading the word. Every action counts!</p>
                </>
              ) : (
                <p>No additional content available for this article.</p>
              )}
            </div>
            {/* --- GALLERY SECTION --- */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(news.gallery && news.gallery.length > 0 ? news.gallery : [news.image]).map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow group relative cursor-pointer" onClick={() => { setGalleryOpen(true); setGalleryIndex(idx); }}>
                    <img
                      src={img || config.defaultImages.news || '/images/news/default.jpg'}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = config.defaultImages.news || '/images/news/default.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-lg">View</div>
                  </div>
                ))}
              </div>
              <GalleryModal open={galleryOpen} images={news.gallery && news.gallery.length > 0 ? news.gallery : [news.image]} index={galleryIndex} onClose={() => setGalleryOpen(false)} />
            </div>
            {/* --- COMMENTS SECTION --- */}
            <NewsComments newsId={news.id} />
          </div>
        </div>
        {/* Sidebar: All News Links */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-4 text-primary-700">All News</h3>
            <ul className="space-y-3">
              {(Array.isArray(allNews) ? allNews : []).filter(n => n.id !== news.id).map(item => (
                <li key={item.id}>
                  <Link
                    to={`/news/${item.id}`}
                    className="block text-gray-700 hover:text-primary-600 font-medium transition-colors truncate"
                  >
                    {item.title}
                  </Link>
                  <div className="text-xs text-gray-400">{item.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default NewsDetail;
