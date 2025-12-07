import { motion } from 'framer-motion';
import AboutTabs from '../components/about/AboutTabs';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8B1F4B] to-[#4B1F8B] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black opacity-50"
            style={{
              backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px),
                              linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              opacity: 0.1
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              About Ansar Relief
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dedicated to providing humanitarian aid and sustainable development
              solutions to communities in need across Somali territories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <AboutTabs />
    </div>
  );
};

export default AboutPage; 