import React from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaUsers, FaHeart, FaHome, FaGraduationCap, FaBook, FaWater, FaBreadSlice, FaMosque, FaCalendarAlt } from 'react-icons/fa';
import HoverSection from './HoverSection';

const FeatureImpactSection = ({ category }) => {
  // Define features and impact stories for each category
  const categoryContent = {
    debtors: {
      feature: {
        icon: FaHandHoldingHeart,
        title: "Debt Relief Program",
        description: "Help individuals and families overcome financial hardship through our comprehensive debt relief initiative.",
        color: "bg-blue-600"
      },
      impact: {
        title: "Ahmad's Story",
        description: "After losing his job, Ahmad struggled with mounting debts. Through our program, he received support to clear his debts and start fresh.",
        image: "/images/campaigns/impact/debtors-story.jpg"
      }
    },
    widows: {
      feature: {
        icon: FaHome,
        title: "Widow Support Initiative",
        description: "Provide sustainable support for widows through housing, education, and employment opportunities.",
        color: "bg-purple-600"
      },
      impact: {
        title: "Fatima's Journey",
        description: "As a widow with three children, Fatima found hope through our support program, enabling her to start a small business.",
        image: "/images/campaigns/impact/widows-story.jpg"
      }
    },
    students: {
      feature: {
        icon: FaGraduationCap,
        title: "Student Scholarship Fund",
        description: "Enable bright minds to continue their education through comprehensive scholarship support.",
        color: "bg-green-600"
      },
      impact: {
        title: "Sarah's Achievement",
        description: "With educational support, Sarah completed her medical degree and now serves her community as a doctor.",
        image: "/images/campaigns/impact/student-story.jpg"
      }
    },
    dailySadaqa: {
      feature: {
        icon: FaCalendarAlt,
        title: "Daily Giving Program",
        description: "Make a difference every day through our structured daily sadaqa initiatives.",
        color: "bg-yellow-600"
      },
      impact: {
        title: "Community Impact",
        description: "Regular daily donations have helped establish a sustainable food bank serving 100+ families daily.",
        image: "/images/campaigns/impact/daily-story.jpg"
      }
    },
    water: {
      feature: {
        icon: FaWater,
        title: "Clean Water Projects",
        description: "Provide access to clean water through well construction and water purification systems.",
        color: "bg-cyan-600"
      },
      impact: {
        title: "Village Transformation",
        description: "A new water well has transformed life for 500 residents in a remote village, eliminating water-borne diseases.",
        image: "/images/campaigns/impact/water-story.jpg"
      }
    },
    food: {
      feature: {
        icon: FaBreadSlice,
        title: "Food Security Program",
        description: "Ensure no one goes hungry through our comprehensive food distribution network.",
        color: "bg-red-600"
      },
      impact: {
        title: "Feeding Families",
        description: "Our food program now supports 1000+ families with regular nutritious meals and food packages.",
        image: "/images/campaigns/impact/food-story.jpg"
      }
    },
    masjid: {
      feature: {
        icon: FaMosque,
        title: "Masjid Support Initiative",
        description: "Help maintain and develop places of worship for communities in need.",
        color: "bg-emerald-600"
      },
      impact: {
        title: "Community Center",
        description: "A renovated masjid now serves as both a prayer space and educational center for 300+ community members.",
        image: "/images/campaigns/impact/masjid-story.jpg"
      }
    }
  };

  const content = categoryContent[category] || categoryContent.dailySadaqa;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Feature Card */}
      <HoverSection
        className="p-6"
        theme={content.feature.color.replace('bg-', '')}
        pattern="hexagons"
      >
        <content.feature.icon className="text-4xl mb-4" />
        <h3 className="text-xl font-bold mb-2">{content.feature.title}</h3>
        <p className="text-gray-600">{content.feature.description}</p>
      </HoverSection>

      {/* Impact Story */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-48">
          <img
            src={content.impact.image}
            alt={content.impact.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-bold mb-2">{content.impact.title}</h3>
            <p className="text-sm text-white/90">{content.impact.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureImpactSection; 