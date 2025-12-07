import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Import components
import HeroSection from '../../components/common/HeroSection';
import ValueCard from '../../components/about/ValueCard';
import BoardMember from '../../components/about/BoardMember';
import ReportCard from '../../components/about/ReportCard';
import CertificationCard from '../../components/about/CertificationCard';
import HistoryTimeline from '../../components/about/HistoryTimeline';
import TestimonialCard from '../../components/about/TestimonialCard';
import StatisticCard from '../../components/about/StatisticCard';
import ContactCTA from '../../components/common/ContactCTA';
import Spinner from '../../components/common/Spinner';

// Import services
import {
  getOrganizationInfo,
  getBoardMembers,
  getOrganizationTimeline,
  getReports,
  getCertifications,
  getTestimonials,
  getStatistics,
  getFAQs
} from '../../services/aboutService';

// Import styles
import './AboutStyles.css';

// Import fallback data (will be used if API calls fail)
import { 
  valueSamples as fallbackValues, 
  boardMemberSamples as fallbackBoardMembers,
  timelineEvents as fallbackTimeline,
  testimonialSamples as fallbackTestimonials,
  statisticsSamples as fallbackStatistics
} from './AboutDataSamples';

const AboutPage = () => {
  // State for data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [organizationInfo, setOrganizationInfo] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [reports, setReports] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization information
        const organizationInfoResponse = await getOrganizationInfo();
        setOrganizationInfo(organizationInfoResponse);

        // Fetch board members
        const boardMembersResponse = await getBoardMembers();
        setBoardMembers(boardMembersResponse);

        // Fetch organization timeline
        const timelineResponse = await getOrganizationTimeline();
        setTimeline(timelineResponse);

        // Fetch reports
        const reportsResponse = await getReports();
        setReports(reportsResponse);

        // Fetch certifications
        const certificationsResponse = await getCertifications();
        setCertifications(certificationsResponse);

        // Fetch testimonials
        const testimonialsResponse = await getTestimonials();
        setTestimonials(testimonialsResponse);

        // Fetch statistics
        const statisticsResponse = await getStatistics();
        setStatistics(statisticsResponse);

        // Fetch FAQs
        const faqsResponse = await getFAQs();
        setFaqs(faqsResponse);

        // If all data is fetched successfully, set loading to false
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Rest of the component content */}
    </div>
  );
};

export default AboutPage; 