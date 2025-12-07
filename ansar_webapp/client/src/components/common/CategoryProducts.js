import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaArrowRight, FaCheck, FaGraduationCap, FaHome, FaHospital, FaStore, FaUtensils, FaWater, FaPray, FaBook, FaBriefcase } from 'react-icons/fa';
import HoverSection from './HoverSection';

const CategoryProducts = ({ category }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  // Define products and donation options for each category
  const categoryProducts = {
    debtors: {
      title: "Debt Relief Programs",
      description: "Choose how you want to help those in debt",
      products: [
        {
          title: "Emergency Debt Relief",
          description: "Provide immediate assistance to families facing urgent debt situations",
          amounts: [100, 500, 1000, 5000],
          defaultAmount: 500,
          benefits: [
            "Immediate financial relief",
            "Debt counseling support",
            "Emergency assistance",
            "Family stability support"
          ],
          image: "/images/campaigns/products/debt-relief.jpg",
          theme: "blue",
          icon: FaHandHoldingHeart
        },
        {
          title: "Medical Debt Support",
          description: "Help clear medical debts for those unable to pay",
          amounts: [200, 1000, 2000, 5000],
          defaultAmount: 1000,
          benefits: [
            "Cover critical medical expenses",
            "Access to healthcare",
            "Mental health support",
            "Ongoing medical assistance"
          ],
          image: "/images/campaigns/products/medical-debt.jpg",
          theme: "cyan",
          icon: FaHospital
        },
        {
          title: "Business Recovery Fund",
          description: "Support small business owners recover from financial crisis",
          amounts: [500, 2000, 5000, 10000],
          defaultAmount: 2000,
          benefits: [
            "Business rehabilitation",
            "Financial planning",
            "Equipment support",
            "Training and mentorship"
          ],
          image: "/images/campaigns/products/business-recovery.jpg",
          theme: "emerald",
          icon: FaStore
        },
        {
          title: "Education Debt Relief",
          description: "Help students clear their education-related debts",
          amounts: [300, 1000, 3000, 5000],
          defaultAmount: 1000,
          benefits: [
            "Clear tuition fees",
            "Cover study materials",
            "Support living expenses",
            "Enable continued education"
          ],
          image: "/images/campaigns/products/education-debt.jpg",
          theme: "indigo",
          icon: FaGraduationCap
        },
        {
          title: "Housing Debt Support",
          description: "Assist families struggling with housing-related debts",
          amounts: [500, 2000, 5000, 10000],
          defaultAmount: 2000,
          benefits: [
            "Rent assistance",
            "Mortgage support",
            "Utility bill help",
            "Housing stability"
          ],
          image: "/images/campaigns/products/housing-debt.jpg",
          theme: "purple",
          icon: FaHome
        }
      ]
    },
    widows: {
      title: "Widow Support Programs",
      description: "Support programs designed to help widows and their families",
      products: [
        {
          title: "Housing Support",
          description: "Provide safe and stable housing for widowed families",
          amounts: [300, 1000, 3000, 6000],
          defaultAmount: 1000,
          benefits: [
            "Secure accommodation",
            "Utilities coverage",
            "Home maintenance",
            "Community support"
          ],
          image: "/images/campaigns/products/widow-housing.jpg",
          theme: "purple",
          icon: FaHome
        },
        {
          title: "Children's Education",
          description: "Support education for children of widowed mothers",
          amounts: [200, 500, 1000, 2000],
          defaultAmount: 500,
          benefits: [
            "School fees coverage",
            "Educational materials",
            "Transport assistance",
            "Extra-curricular support"
          ],
          image: "/images/campaigns/products/children-education.jpg",
          theme: "indigo",
          icon: FaGraduationCap
        },
        {
          title: "Skills Development",
          description: "Enable widows to become financially independent",
          amounts: [250, 750, 1500, 3000],
          defaultAmount: 750,
          benefits: [
            "Vocational training",
            "Business startup kit",
            "Mentorship program",
            "Market linkages"
          ],
          image: "/images/campaigns/products/skills-development.jpg",
          theme: "pink",
          icon: FaBriefcase
        },
        {
          title: "Healthcare Support",
          description: "Provide medical care and support for widowed families",
          amounts: [150, 500, 1000, 2000],
          defaultAmount: 500,
          benefits: [
            "Medical checkups",
            "Medicine coverage",
            "Mental health support",
            "Emergency care"
          ],
          image: "/images/campaigns/products/widow-healthcare.jpg",
          theme: "red",
          icon: FaHospital
        },
        {
          title: "Food Security Program",
          description: "Ensure regular nutritious meals for widowed families",
          amounts: [100, 300, 600, 1200],
          defaultAmount: 300,
          benefits: [
            "Monthly food packages",
            "Fresh produce",
            "Nutritional guidance",
            "Special occasion meals"
          ],
          image: "/images/campaigns/products/widow-food.jpg",
          theme: "amber",
          icon: FaUtensils
        }
      ]
    },
    water: {
      title: "Water Projects",
      description: "Support clean water initiatives and infrastructure",
      products: [
        {
          title: "Well Construction",
          description: "Build new water wells in areas lacking access to clean water",
          amounts: [1000, 3000, 5000, 10000],
          defaultAmount: 3000,
          benefits: [
            "Clean water access",
            "Community development",
            "Disease prevention",
            "Sustainable solution"
          ],
          image: "/images/campaigns/products/water-well.jpg",
          theme: "blue",
          icon: FaWater
        },
        {
          title: "Water Purification",
          description: "Install water purification systems in communities",
          amounts: [500, 1500, 3000, 6000],
          defaultAmount: 1500,
          benefits: [
            "Safe drinking water",
            "Improved health",
            "Local maintenance",
            "Community training"
          ],
          image: "/images/campaigns/products/water-purification.jpg",
          theme: "cyan",
          icon: FaWater
        },
        {
          title: "School Water Projects",
          description: "Provide clean water access in schools",
          amounts: [300, 1000, 2000, 4000],
          defaultAmount: 1000,
          benefits: [
            "Student health",
            "Sanitation facilities",
            "Hygiene education",
            "Better attendance"
          ],
          image: "/images/campaigns/products/school-water.jpg",
          theme: "indigo",
          icon: FaGraduationCap
        },
        {
          title: "Masjid Water Systems",
          description: "Install water systems in masajid for wudu and drinking",
          amounts: [400, 1200, 2400, 5000],
          defaultAmount: 1200,
          benefits: [
            "Wudu facilities",
            "Drinking fountains",
            "Water storage",
            "Regular maintenance"
          ],
          image: "/images/campaigns/products/masjid-water.jpg",
          theme: "emerald",
          icon: FaPray
        },
        {
          title: "Emergency Water Relief",
          description: "Provide immediate water assistance in crisis situations",
          amounts: [200, 600, 1200, 2400],
          defaultAmount: 600,
          benefits: [
            "Rapid response",
            "Water distribution",
            "Emergency supplies",
            "Crisis support"
          ],
          image: "/images/campaigns/products/emergency-water.jpg",
          theme: "red",
          icon: FaWater
        }
      ]
    }
  };

  const content = categoryProducts[category] || categoryProducts.dailySadaqa;

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl text-gray-600">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2">
                  <product.icon className="text-white text-xl" />
                  <h3 className="text-xl font-bold text-white">{product.title}</h3>
                </div>
              </div>
            </div>

            {/* Product Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Benefits:</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <FaCheck className={`text-${product.theme}-500 mt-1 mr-2 flex-shrink-0`} />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Donation Amounts */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Select Amount:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.amounts.map((amount, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedAmount === amount
                          ? `bg-${product.theme}-600 text-white`
                          : `bg-${product.theme}-50 text-${product.theme}-700 hover:bg-${product.theme}-100`
                      }`}
                    >
                      {amount} QAR
                    </button>
                  ))}
                </div>
              </div>

              {/* Donate Button */}
              <button
                className={`w-full bg-${product.theme}-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-${product.theme}-700 transition-colors flex items-center justify-center`}
              >
                <FaHandHoldingHeart className="mr-2" />
                Donate Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts; 