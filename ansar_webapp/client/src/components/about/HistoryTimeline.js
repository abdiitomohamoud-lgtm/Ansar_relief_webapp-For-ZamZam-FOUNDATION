import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFlag, 
  FaHandshake, 
  FaGlobe, 
  FaAward, 
  FaUsers, 
  FaBuilding,
  FaHandHoldingHeart,
  FaMosque,
  FaLaptopMedical
} from 'react-icons/fa';

const timelineEvents = [
  {
    year: "2005",
    title: "Organization Founded",
    description: "Our organization was established with a mission to serve communities in need.",
    icon: FaFlag,
    color: "bg-blue-100 text-blue-600"
  },
  {
    year: "2008",
    title: "First International Project",
    description: "Expanded operations beyond local communities to serve people internationally.",
    icon: FaGlobe,
    color: "bg-green-100 text-green-600"
  },
  {
    year: "2012",
    title: "Major Partnership",
    description: "Formed strategic partnerships with international aid organizations.",
    icon: FaHandshake,
    color: "bg-purple-100 text-purple-600"
  },
  {
    year: "2015",
    title: "Excellence Award",
    description: "Received recognition for transparency and impact in humanitarian work.",
    icon: FaAward,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    year: "2017",
    title: "Community Center",
    description: "Opened our first dedicated community center to provide integrated services.",
    icon: FaBuilding,
    color: "bg-red-100 text-red-600"
  },
  {
    year: "2019",
    title: "Volunteer Program Launch",
    description: "Started a structured volunteer program engaging over 500 people.",
    icon: FaUsers,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    year: "2020",
    title: "Emergency Response Program",
    description: "Launched specialized division for rapid response to humanitarian crises.",
    icon: FaLaptopMedical,
    color: "bg-pink-100 text-pink-600"
  },
  {
    year: "2022",
    title: "Education Initiative",
    description: "Established scholarship programs and educational resources for communities.",
    icon: FaHandHoldingHeart,
    color: "bg-teal-100 text-teal-600"
  },
  {
    year: "2023",
    title: "Mosque Construction Initiative",
    description: "Began a dedicated program for building and renovating mosques worldwide.",
    icon: FaMosque,
    color: "bg-emerald-100 text-emerald-600"
  }
];

const HistoryTimeline = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our Journey Through Time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From our humble beginnings to our current global impact, explore the key milestones that have shaped our organization.
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 rounded-full"></div>
          
          {/* Timeline events */}
          <div className="relative z-10">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-16 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="text-2xl font-bold text-primary-600 mb-2">{event.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </motion.div>
                </div>
                
                {/* Center icon */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 rounded-full ${event.color} flex items-center justify-center shadow-lg z-20 border-4 border-white`}
                  >
                    <event.icon size={24} />
                  </motion.div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary-50 rounded-xl text-primary-700">
            <FaHandHoldingHeart className="mr-2" />
            <span className="font-medium">Our journey continues as we expand our impact and reach more communities in need.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryTimeline; 