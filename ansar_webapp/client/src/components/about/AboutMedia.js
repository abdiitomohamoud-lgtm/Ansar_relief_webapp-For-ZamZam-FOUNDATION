import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaNewspaper, 
  FaPhotoVideo, 
  FaDownload, 
  FaBlog,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaFacebook
} from 'react-icons/fa';

const AboutMedia = () => {
  const newsItems = [
    {
      title: 'Qatar Charity extends Eid al-Fitr greetings',
      date: '27-03-2025',
      excerpt: 'As the crescent moon signals the end of Ramadan, Qatar Charity extends its warmest congratulations and best wishes to the Qatari leadership, government, citizens...',
      category: 'News'
    },
    {
      title: 'Qatar Charity Distributes Ramadan Food Baskets in Sudan',
      date: '25-03-2025',
      excerpt: 'Continuing the charitable efforts of the people of Qatar, field teams from Qatar Charity in Sudan distributed Ramadan food baskets to the mothers of orphans...',
      category: 'Field Updates'
    },
    {
      title: 'Humanitarian initiatives launched in Somalia',
      date: '24-03-2025',
      excerpt: "Qatar's generous donations funded two humanitarian projects in Somalia, easing the suffering of children with heart conditions and supporting persons with special needs...",
      category: 'Projects'
    }
  ];

  const mediaCategories = [
    {
      icon: FaNewspaper,
      title: 'News & Updates',
      description: 'Latest news about our programs and initiatives'
    },
    {
      icon: FaPhotoVideo,
      title: 'Media Gallery',
      description: 'Photos and videos from our projects worldwide'
    },
    {
      icon: FaDownload,
      title: 'Publications',
      description: 'Reports, brochures, and other resources'
    },
    {
      icon: FaBlog,
      title: 'Blog',
      description: 'Stories and insights from the field'
    }
  ];

  const socialLinks = [
    { icon: FaYoutube, name: 'YouTube', url: '#', color: 'hover:text-red-600' },
    { icon: FaInstagram, name: 'Instagram', url: '#', color: 'hover:text-pink-600' },
    { icon: FaTwitter, name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: FaFacebook, name: 'Facebook', url: '#', color: 'hover:text-blue-600' }
  ];

  return (
    <div className="space-y-12">
      {/* Latest News Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Media Categories */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {mediaCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <category.icon className="text-3xl text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Explore →
            </button>
          </motion.div>
        ))}
      </section>

      {/* Social Media Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h3>
          <p className="text-gray-600">Stay connected with our latest updates and stories</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm ${social.color} transition-colors`}
            >
              <social.icon className="text-xl" />
              <span className="font-medium">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-6">
            Get the latest updates about our work and impact delivered to your inbox
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutMedia; 