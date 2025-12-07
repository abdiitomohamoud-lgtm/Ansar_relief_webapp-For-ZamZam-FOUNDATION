import React from 'react';
import { motion } from 'framer-motion';
import HoverSection from './HoverSection';

const SubcategoryCards = ({ category }) => {
  // Define subcategories for each main category
  const subcategories = {
    debtors: [
      {
        title: "Medical Debt Relief",
        description: "Support those struggling with medical expenses",
        stats: "150+ families helped",
        theme: "primary"
      },
      {
        title: "Business Recovery",
        description: "Help small business owners recover from financial crisis",
        stats: "75 businesses supported",
        theme: "info"
      },
      {
        title: "Education Debt",
        description: "Clear education-related debts for students",
        stats: "200+ students assisted",
        theme: "success"
      },
      {
        title: "Emergency Relief",
        description: "Immediate assistance for urgent debt situations",
        stats: "24/7 support available",
        theme: "danger"
      }
    ],
    widows: [
      {
        title: "Housing Support",
        description: "Secure housing assistance for widowed families",
        stats: "100+ homes provided",
        theme: "purple"
      },
      {
        title: "Skills Development",
        description: "Vocational training and employment support",
        stats: "250+ women trained",
        theme: "emerald"
      },
      {
        title: "Children's Education",
        description: "Educational support for children of widows",
        stats: "500+ children sponsored",
        theme: "info"
      },
      {
        title: "Healthcare Access",
        description: "Medical care and support services",
        stats: "24/7 healthcare support",
        theme: "danger"
      }
    ],
    dailySadaqa: [
      {
        title: "Daily Meals",
        description: "Provide daily meals to those in need",
        stats: "1000+ meals daily",
        theme: "success"
      },
      {
        title: "Education Support",
        description: "Daily contribution to education funds",
        stats: "50+ schools supported",
        theme: "primary"
      },
      {
        title: "Medical Assistance",
        description: "Regular medical aid and supplies",
        stats: "100+ patients helped monthly",
        theme: "info"
      },
      {
        title: "Emergency Fund",
        description: "Immediate response to urgent needs",
        stats: "24/7 emergency support",
        theme: "warning"
      }
    ],
    water: [
      {
        title: "Well Construction",
        description: "Build new water wells in dry areas",
        stats: "50+ wells constructed",
        theme: "info"
      },
      {
        title: "Water Purification",
        description: "Install water purification systems",
        stats: "100+ systems installed",
        theme: "primary"
      },
      {
        title: "Distribution Network",
        description: "Develop water distribution infrastructure",
        stats: "25+ villages connected",
        theme: "success"
      },
      {
        title: "Maintenance Program",
        description: "Regular maintenance of water facilities",
        stats: "Monthly maintenance",
        theme: "warning"
      }
    ]
  };

  const cards = subcategories[category] || subcategories.dailySadaqa;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {cards.map((card, index) => (
        <HoverSection
          key={index}
          className="p-6"
          theme={card.theme}
          pattern="dots"
          animation="gentle"
        >
          <h3 className="text-lg font-bold mb-2">{card.title}</h3>
          <p className="text-sm mb-4 opacity-90">{card.description}</p>
          <div className="text-sm font-semibold opacity-75">{card.stats}</div>
        </HoverSection>
      ))}
    </div>
  );
};

export default SubcategoryCards; 