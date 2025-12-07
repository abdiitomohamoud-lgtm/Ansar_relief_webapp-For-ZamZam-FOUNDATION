import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaWater,
  FaTint,
  FaHandHoldingWater,
  FaUsers,
  FaRegLightbulb,
  FaHandHoldingUsd,
  FaArrowRight,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

const WaterSadaqah = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-800 to-blue-600">
        {/* Background Patterns */}
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.03]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/90 via-blue-700/90 to-blue-600/90"></div>
          <div className="absolute inset-0 bg-noise opacity-20"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[FaWater, FaTint, FaHandHoldingWater].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute text-white/5"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            >
              <Icon className="text-6xl" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 inline-block">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto border-2 border-white/20">
                  <FaWater className="text-4xl text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-400/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Water Sadaqah
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Provide clean and safe water to communities in need
            </p>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-auto" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45.8333C96 41.6667 192 33.3333 288 29.1667C384 25 480 25 576 33.3333C672 41.6667 768 58.3333 864 62.5C960 66.6667 1056 58.3333 1152 50C1248 41.6667 1344 33.3333 1392 29.1667L1440 25V100H0V50Z" fill="#f8fafc" fillOpacity="0.1"/>
          </svg>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.02]"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaHandHoldingWater,
                title: "Clean Water Access",
                description: "Help communities access clean and safe drinking water."
              },
              {
                icon: FaUsers,
                title: "Community Wells",
                description: "Support the construction of wells in water-scarce regions."
              },
              {
                icon: FaRegLightbulb,
                title: "Sustainable Solutions",
                description: "Fund long-term water infrastructure and maintenance."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 pattern-islamic-star opacity-[0.03] transform rotate-45"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.02]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Water Projects</h2>
            <p className="text-xl text-gray-600">Current initiatives bringing clean water to communities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Community Well Project",
                location: "Somalia",
                image: "/images/sadaqah/projects/water-well.jpg",
                progress: 65,
                goal: 15000,
                beneficiaries: "1,000+ people",
                deadline: "15 days left"
              },
              {
                title: "Water Filtration System",
                location: "Yemen",
                image: "/images/sadaqah/projects/water-filtration.jpg",
                progress: 80,
                goal: 10000,
                beneficiaries: "500+ families",
                deadline: "7 days left"
              },
              {
                title: "School Water Supply",
                location: "Palestine",
                image: "/images/sadaqah/projects/education-support.jpg",
                progress: 45,
                goal: 8000,
                beneficiaries: "300+ students",
                deadline: "20 days left"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {project.deadline}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span className="text-gray-600">{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-blue-500 mr-2" />
                    <span className="text-gray-600">{project.beneficiaries}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">${project.progress.toLocaleString()} raised</span>
                      <span className="text-gray-600">${project.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(project.progress / project.goal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center">
                    Support This Project
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.02]"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Impact Stories</h2>
            <p className="text-xl text-gray-600">Real stories of lives changed through water projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Village Transformation",
                location: "Rural Somalia",
                story: "A new well has transformed daily life for 500 villagers, reducing water-related illnesses by 70%.",
                impact: ["500 villagers served", "70% less illness", "2 hours saved daily"],
                image: "/images/sadaqah/stories/village-well.jpg"
              },
              {
                title: "School Attendance Rise",
                location: "Yemen",
                story: "Clean water access at school increased attendance by 45%, especially among young girls.",
                impact: ["45% higher attendance", "200 students benefit", "Improved hygiene"],
                image: "/images/sadaqah/stories/school-impact.jpg"
              },
              {
                title: "Community Health",
                location: "Palestine",
                story: "Water filtration system installation led to 80% reduction in waterborne diseases.",
                impact: ["80% disease reduction", "1000+ people helped", "Sustainable solution"],
                image: "/images/sadaqah/stories/community-health.jpg"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="relative mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <FaHeart className="text-xl text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    {story.location}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{story.story}</p>
                <div className="space-y-2">
                  {story.impact.map((item, i) => (
                    <div key={i} className="flex items-center text-gray-600">
                      <FaCheckCircle className="text-blue-500 mr-2" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 px-4 bg-gray-50 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                    Read Full Story
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Donation Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 pattern-mosque opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-noise opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Provide Water to Those in Need
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Your contribution helps provide sustainable water solutions to communities facing water scarcity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[
                  { amount: 1000, description: "Build a Water Well" },
                  { amount: 500, description: "Water Distribution System" },
                  { amount: 250, description: "Water Filtration Unit" }
                ].map(({ amount, description }, index) => (
                  <motion.button
                    key={amount}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20 hover:bg-white/20 transition-all group"
                  >
                    <div className="text-2xl font-bold mb-2">${amount}</div>
                    <div className="text-sm text-white/80">{description}</div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="px-8 py-4 bg-white text-blue-800 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center group">
                  Donate Now
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all">
                  Set Up Monthly Water Support
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterSadaqah; 