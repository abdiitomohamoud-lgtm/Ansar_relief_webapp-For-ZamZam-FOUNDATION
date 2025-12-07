import React from 'react';
import { motion } from 'framer-motion';

const ReportCard = ({ 
  title, 
  downloadUrl, 
  thumbnailImage, 
  year, 
  summary, 
  fileSize, 
  reportType,
  category,
  featured = false,
  delay = 0 
}) => {
  // Default content if props aren't provided
  const defaultTitle = "Annual Impact Report";
  const defaultYear = "2023";
  const defaultSummary = "This report outlines our key achievements, community impact, and financial transparency for the year.";
  const defaultImage = "/images/reports/report-thumbnail.jpg"; // Placeholder path
  const defaultFileSize = "2.4 MB";
  const defaultReportType = "PDF";
  const defaultCategory = "Annual Reports";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 
                 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden
                 ${featured ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Pattern background overlay */}
      <div className="absolute inset-0 pattern-islamic" style={{ color: "#2c3e50" }}></div>
      
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary-500 text-white text-xs font-bold py-1 px-3 shadow-md transform rotate-45 translate-x-2 -translate-y-1">
            FEATURED
          </div>
        </div>
      )}
      
      <div className="flex flex-col h-full relative z-10">
        <div className="h-48 overflow-hidden">
          <img
            src={thumbnailImage || defaultImage}
            alt={`${title || defaultTitle} thumbnail`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2 z-20">
            <span className="bg-white bg-opacity-90 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              {reportType || defaultReportType}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 rounded-full 
                         inline-block">
              {year || defaultYear}
            </div>
            <div className="text-gray-500 text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {fileSize || defaultFileSize}
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4-2.5a1 1 0 00-1.038 0l-4 2.5A1 1 0 014 16V4z" clipRule="evenodd" />
              </svg>
              {category || defaultCategory}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 h-14">{title || defaultTitle}</h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3 h-18">{summary || defaultSummary}</p>
          </div>
          
          <div className="flex space-x-2">
            <a
              href={downloadUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md \
                        transition-colors duration-200 font-medium flex items-center justify-center \
                        group"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download</span>
            </a>
            <a
              href={downloadUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 \
                        px-3 py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
              aria-label="View Report"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Sample usage with richer example data
export const ReportExamples = [
  {
    title: "Annual Impact Report: Building Communities, Transforming Lives",
    year: "2023",
    summary: "A comprehensive overview of our community initiatives, educational programs, and humanitarian efforts throughout 2023. Learn how your support has transformed lives across our communities.",
    thumbnailImage: "/images/reports/annual-report-2023.jpg",
    downloadUrl: "/reports/ansar-annual-report-2023.pdf",
    fileSize: "3.2 MB",
    reportType: "PDF",
    category: "Annual Reports",
    featured: true
  },
  {
    title: "Financial Transparency Report: Accountability in Action",
    year: "2023",
    summary: "Detailed breakdown of donations received, allocation of funds, and impact metrics for our financial stakeholders. Our commitment to transparency ensures every contribution is properly managed.",
    thumbnailImage: "/images/reports/financial-report-2023.jpg",
    downloadUrl: "/reports/ansar-financial-report-2023.pdf",
    fileSize: "1.8 MB",
    reportType: "PDF",
    category: "Financial Reports"
  },
  {
    title: "Community Engagement Study: Voices of Change",
    year: "2022",
    summary: "Research findings on the effectiveness of our community programs and recommendations for future initiatives. This study includes survey results from 500+ community members and program participants.",
    thumbnailImage: "/images/reports/community-report-2022.jpg",
    downloadUrl: "/reports/ansar-community-study-2022.pdf",
    fileSize: "4.5 MB",
    reportType: "PDF",
    category: "Research"
  },
  {
    title: "Youth Program Assessment: Nurturing Future Leaders",
    year: "2023",
    summary: "An evaluation of our youth mentorship and educational programs, featuring success stories, challenges faced, and strategic recommendations for expanding our impact among young community members.",
    thumbnailImage: "/images/reports/youth-report-2023.jpg",
    downloadUrl: "/reports/ansar-youth-assessment-2023.pdf",
    fileSize: "2.7 MB",
    reportType: "PDF",
    category: "Program Reports"
  },
  {
    title: "Quarterly Donors Newsletter: Winter Edition",
    year: "Q4 2023",
    summary: "Updates on recent projects, success stories, and upcoming initiatives for our valued donors. This edition highlights the collective impact of our winter donation campaign.",
    thumbnailImage: "/images/reports/donors-newsletter-q4-2023.jpg",
    downloadUrl: "/reports/ansar-donors-newsletter-q4-2023.pdf",
    fileSize: "1.2 MB",
    reportType: "PDF",
    category: "Newsletters"
  }
];

export default ReportCard;