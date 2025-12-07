import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaRegCalendarAlt,
  FaHandHoldingHeart,
  FaUsers,
  FaRegLightbulb,
  FaHandHoldingUsd,
  FaStar,
  FaChartLine,
  FaArrowRight,
  FaMapMarkerAlt,
  FaHeart,
  FaCheckCircle,
  FaGraduationCap
} from 'react-icons/fa';
import AlaqraboonDonation from '../../components/donations/AlaqraboonDonation';
import HumanitarianCases from '../../components/humanitarian/HumanitarianCases';
import DonationFields from '../../components/donations/DonationFields';

const MonthlySadaqah = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-800 to-teal-600">
        {/* Background Patterns */}
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.03]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-800/90 via-teal-700/90 to-teal-600/90"></div>
          <div className="absolute inset-0 bg-noise opacity-20"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[FaCalendarCheck, FaChartLine, FaStar].map((Icon, index) => (
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
                  <FaRegCalendarAlt className="text-4xl text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-400/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Monthly Sadaqah
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Make a lasting impact with regular monthly donations
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
                icon: FaHandHoldingHeart,
                title: "Consistent Support",
                description: "Provide regular, reliable assistance to those in need."
              },
              {
                icon: FaUsers,
                title: "Community Impact",
                description: "Create sustainable change in communities worldwide."
              },
              {
                icon: FaRegLightbulb,
                title: "Long-term Solutions",
                description: "Support ongoing projects and development initiatives."
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
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-2xl text-teal-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Monthly Impact Programs</h2>
            <p className="text-xl text-gray-600">Sustainable projects creating lasting change</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Orphan Care Program",
                location: "Multiple Countries",
                image: "/images/sadaqah/projects/orphan-care.jpg",
                progress: 70,
                goal: 25000,
                beneficiaries: "100 orphans",
                deadline: "Monthly Support"
              },
              {
                title: "Education Sponsorship",
                location: "Global",
                image: "/images/sadaqah/projects/education-support.jpg",
                progress: 85,
                goal: 30000,
                beneficiaries: "50 students",
                deadline: "Academic Year"
              },
              {
                title: "Widow Support Fund",
                location: "Various Regions",
                image: "/images/sadaqah/projects/widow-support.jpg",
                progress: 65,
                goal: 20000,
                beneficiaries: "75 families",
                deadline: "Ongoing"
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
                  <div className="absolute inset-0 bg-teal-900/20"></div>
                  <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm">
                    {project.deadline}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-teal-500 mr-2" />
                    <span className="text-gray-600">{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-teal-500 mr-2" />
                    <span className="text-gray-600">{project.beneficiaries}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">${project.progress.toLocaleString()} raised</span>
                      <span className="text-gray-600">${project.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${(project.progress / project.goal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors flex items-center justify-center">
                    Start Monthly Support
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Long-term Impact Stories</h2>
            <p className="text-xl text-gray-600">See how monthly donations transform lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Education Journey",
                location: "Palestine",
                story: "Monthly support helped Amira complete her medical degree, now she serves her community as a doctor.",
                impact: ["6 years supported", "Medical degree achieved", "Community service"],
                image: "/images/sadaqah/stories/education-success.jpg"
              },
              {
                title: "Family Stability",
                location: "Yemen",
                story: "Regular monthly assistance helped a widow start a small business to support her four children.",
                impact: ["Business established", "Children in school", "Financial independence"],
                image: "/images/sadaqah/stories/family-support.jpg"
              },
              {
                title: "Orphan's Success",
                location: "Somalia",
                story: "Monthly sponsorship provided Ahmad with education, healthcare, and a path to success.",
                impact: ["Full education", "Healthcare coverage", "Bright future"],
                image: "/images/sadaqah/stories/orphan-success.jpg"
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
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <FaHeart className="text-xl text-teal-500" />
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
                      <FaCheckCircle className="text-teal-500 mr-2" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 px-4 bg-gray-50 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors flex items-center justify-center">
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
      <section className="py-16 bg-gradient-to-br from-teal-900 to-teal-700 relative overflow-hidden">
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
                Start Your Monthly Sadaqah
              </h2>
              <p className="text-xl text-white/90 mb-12">
                Choose a monthly donation amount and help create lasting change.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {[
                  { amount: 100, description: "Basic Monthly Support" },
                  { amount: 250, description: "Enhanced Monthly Impact" },
                  { amount: 500, description: "Comprehensive Support" }
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
                <button className="px-8 py-4 bg-white text-teal-800 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center group">
                  Start Monthly Donation
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold text-lg hover:bg-teal-700 transition-all">
                  Learn More About Impact
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="packages">
        <AlaqraboonDonation />
      </div>

      <div id="cases">
        <HumanitarianCases />
      </div>

      <DonationFields />
    </div>
  );
};

export default MonthlySadaqah; 