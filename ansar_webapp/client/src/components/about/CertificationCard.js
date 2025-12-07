import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificationCard = ({ 
  title, 
  issuer, 
  image, 
  date, 
  description, 
  verificationLink, 
  expiryDate, 
  certNumber,
  category,
  criteria = [],
  delay = 0 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Default content if props aren't provided
  const defaultTitle = "501(c)(3) Non-Profit Certification";
  const defaultIssuer = "Internal Revenue Service";
  const defaultDate = "January 2015";
  const defaultDescription = "Official recognition as a tax-exempt charitable organization in the United States, allowing us to receive tax-deductible contributions.";
  const defaultImage = "/images/certifications/nonprofit-cert.png"; // Placeholder path
  const defaultCategory = "Operational";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg 
                 transition-all duration-300 border-l-4 border-primary-500 relative overflow-hidden"
      layout
    >
      {/* Pattern background overlay */}
      <div className="absolute inset-0 pattern-arabesque" style={{ color: "#1d4ed8", opacity: "0.05" }}></div>
      
      <div className="flex flex-col sm:flex-row gap-5 relative z-10">
        <div className="sm:w-1/4 flex-shrink-0">
          <motion.div 
            className="w-full overflow-hidden rounded-md bg-white p-3 
                     border border-gray-200 flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.05 }}
            layout
            style={{ height: expanded ? '160px' : '140px' }}
          >
            <img
              src={image || defaultImage}
              alt={`${title || defaultTitle} certification`}
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </motion.div>
          
          {(certNumber) && (
            <motion.div 
              className="mt-3 bg-gray-100 rounded-md p-2 text-center"
              layout
            >
              <span className="text-xs text-gray-500 block">Certificate ID</span>
              <span className="text-sm font-mono font-medium text-gray-700">{certNumber}</span>
            </motion.div>
          )}
          
          <motion.div 
            className="mt-3"
            layout
          >
            <div className="text-xs uppercase font-semibold text-gray-400 mb-1 tracking-wider">Issuing Authority</div>
            <div className="flex items-center bg-white rounded-md p-2 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm font-medium">{issuer || defaultIssuer}</div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="sm:w-3/4"
          layout
        >
          <div className="flex flex-wrap justify-between items-start mb-2">
            <div>
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                {category || defaultCategory}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{title || defaultTitle}</h3>
            </div>
            <div className="flex space-x-2">
              <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-1 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {date || defaultDate}
              </span>
              
              {expiryDate && (
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded flex items-center whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Valid until {expiryDate}
                </span>
              )}
            </div>
          </div>
          
          <motion.p 
            className="text-gray-600 mb-3"
            layout
          >
            {description || defaultDescription}
          </motion.p>
          
          <AnimatePresence>
            {expanded && criteria.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <h4 className="font-medium text-gray-800 mb-2">Certification Criteria:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {criteria.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="flex flex-wrap gap-2 mt-4"
            layout
          >
            {(verificationLink) && (
              <a 
                href={verificationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-white hover:bg-primary-600 font-medium inline-flex items-center
                          px-3 py-1.5 rounded-md border border-primary-600 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verify Certificate
              </a>
            )}
            
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium inline-flex items-center
                        px-3 py-1.5 rounded-md border border-gray-300 hover:border-gray-400 bg-white transition-colors duration-200"
            >
              {expanded ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Show More
                </>
              )}
            </button>
            
            <button 
              className="text-sm text-gray-600 hover:text-gray-800 font-medium inline-flex items-center
                        px-3 py-1.5 rounded-md border border-gray-300 hover:border-gray-400 bg-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Share
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Sample certifications data with rich content
export const CertificationExamples = [
  {
    title: "501(c)(3) Non-Profit Certification",
    issuer: "Internal Revenue Service",
    date: "January 15, 2015",
    description: "Official recognition as a tax-exempt charitable organization in the United States, allowing us to receive tax-deductible contributions and operate as a non-profit entity dedicated to our mission of community service and education.",
    image: "/images/certifications/501c3-cert.png",
    verificationLink: "https://apps.irs.gov/app/eos/",
    certNumber: "47-1234567",
    category: "Legal",
    criteria: [
      "Organization must be operated exclusively for religious, charitable, scientific, or educational purposes",
      "No part of the organization's net earnings may inure to the benefit of any private shareholder or individual",
      "No substantial part of the organization's activities may consist of carrying on propaganda or attempting to influence legislation",
      "The organization may not participate in political campaigns"
    ]
  },
  {
    title: "GuideStar Platinum Transparency",
    issuer: "GuideStar by Candid",
    date: "September 30, 2022",
    description: "The highest level of recognition offered by GuideStar, demonstrating our commitment to transparency in reporting our organization's finances, governance, and impact. This certification reflects our dedication to accountability and openness with our stakeholders.",
    image: "/images/certifications/guidestar-platinum.png",
    verificationLink: "https://www.guidestar.org/",
    expiryDate: "September 30, 2024",
    category: "Transparency",
    criteria: [
      "Publishing detailed financial information including audited financial statements",
      "Disclosure of board governance practices and policies",
      "Publishing organizational demographics",
      "Sharing comprehensive information about strategic planning and measurement of programmatic impact",
      "Regular updates to the GuideStar profile with current information"
    ]
  },
  {
    title: "Charity Navigator 4-Star Rating",
    issuer: "Charity Navigator",
    date: "July 12, 2023",
    description: "The highest possible rating from America's largest independent charity evaluator, indicating that our organization exceeds industry standards for financial health, accountability, and transparency. This rating positions us among the most effective and trustworthy charitable organizations in America.",
    image: "/images/certifications/charity-navigator.png",
    verificationLink: "https://www.charitynavigator.org/",
    expiryDate: "July 12, 2024",
    certNumber: "CN-0123456",
    category: "Excellence",
    criteria: [
      "Program expense ratio exceeding 70% of total expenses",
      "Administrative expenses less than 15% of total expenses",
      "Independent and conflict-free board governance",
      "Audited financial statements prepared by an independent accountant",
      "No material diversion of assets in the last 5 years",
      "Detailed listing of board members and executive staff on website"
    ]
  },
  {
    title: "Best Practices Certification",
    issuer: "Standards for Excellence Institute",
    date: "March 5, 2022",
    description: "Recognition for implementing specific management and governance practices that promote ethics and accountability in our daily operations and program implementation. This certification verifies our adherence to the highest standards of nonprofit management excellence.",
    image: "/images/certifications/standards-excellence.png",
    expiryDate: "March 5, 2025",
    certNumber: "SFE22-78910",
    category: "Operational",
    criteria: [
      "Mission-focused board and organizational planning",
      "Strong financial oversight and legal compliance",
      "Responsible human resource management",
      "Transparent fundraising practices",
      "Public engagement and advocacy within legal parameters",
      "Ongoing program evaluation and organizational assessment"
    ]
  },
  {
    title: "Islamic Charity Excellence Award",
    issuer: "Islamic Charity Association of North America",
    date: "December 10, 2022",
    description: "Prestigious recognition of our exceptional contributions to the community through charitable works aligned with Islamic principles of compassion, generosity, and service to humanity. This award acknowledges our successful programs in education, poverty relief, and community development.",
    image: "/images/certifications/islamic-charity-award.png",
    category: "Recognition",
    criteria: [
      "Demonstration of Islamic values in charitable services",
      "Impact assessment showing significant community benefit",
      "Innovative approaches to addressing community needs",
      "Cultural sensitivity and inclusivity in program delivery",
      "Strong community engagement and volunteer participation"
    ]
  }
];

export default CertificationCard; 