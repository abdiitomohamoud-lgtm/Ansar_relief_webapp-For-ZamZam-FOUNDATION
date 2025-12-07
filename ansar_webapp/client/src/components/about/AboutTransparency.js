import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, 
  FaChartBar, 
  FaSearchDollar,
  FaHandshake, 
  FaRegLightbulb,
  FaShieldAlt,
  FaLock,
  FaFileContract,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutTransparency = () => {
  const reports = [
    {
      title: "Annual Report 2022",
      date: "March 2023",
      icon: FaFileAlt,
      link: "/reports/annual-2022"
    },
    { 
      title: "Financial Statement 2022",
      date: "February 2023",
      icon: FaChartBar,
      link: "/reports/financial-2022"
    },
    { 
      title: "Program Impact Report",
      date: "December 2022",
      icon: FaSearchDollar,
      link: "/reports/impact-2022"
    }
  ];

  const policies = [
    {
      title: "Ethics Policy",
      icon: FaShieldAlt,
      description: "Our commitment to ethical standards in all operations",
      link: "/policies/ethics"
    },
    {
      title: "Privacy Policy",
      icon: FaLock,
      description: "How we protect and manage data",
      link: "/policies/privacy"
    },
    {
      title: "Financial Management Policy",
      icon: FaChartBar,
      description: "Standards for financial stewardship",
      link: "/policies/financial"
    },
    {
      title: "Partnership Guidelines",
      icon: FaHandshake,
      description: "Criteria for organizational partnerships",
      link: "/policies/partnerships"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Transparency Overview */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-start">
          <FaRegLightbulb className="text-4xl text-primary-500 mr-6 mt-1" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Transparency</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
                We believe that transparency is essential to building trust with our donors, partners, and beneficiaries. 
                We are committed to providing clear and accurate information about our programs, finances, and impact.
          </p>
          <p className="mt-4">
                As part of this commitment, we regularly publish reports, share program outcomes, and maintain open 
                communication with all stakeholders.
          </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reports and Publications */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-100">
        <div className="flex items-center mb-6">
          <FaFileContract className="text-2xl text-primary-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Reports & Publications</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <report.icon className="text-3xl text-primary-500" />
                <span className="text-sm text-gray-500">{report.date}</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">{report.title}</h4>
              <Link 
                to={report.link} 
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View Report
                <FaExternalLinkAlt className="ml-2 text-xs" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link 
            to="/reports" 
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200 transition-all duration-300"
          >
            View All Reports
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Policies and Standards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <FaFileAlt className="text-2xl text-primary-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Policies & Standards</h3>
        </div>
          <div className="space-y-4">
            {policies.map((policy, index) => (
            <motion.div
              key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
                className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <policy.icon className="text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{policy.title}</h4>
                  <p className="text-gray-600 mb-2">{policy.description}</p>
                  <Link 
                    to={policy.link} 
                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center"
                  >
                    Read More
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <FaInfoCircle className="text-2xl text-primary-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Transparency Certifications</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mr-3 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Charity Navigator</h4>
                <p className="text-gray-600">4-star rating for transparency and accountability</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mr-3 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">BBB Wise Giving Alliance</h4>
                <p className="text-gray-600">Meets all 20 standards for charity accountability</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 text-xl mr-3 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">GuideStar</h4>
                <p className="text-gray-600">Platinum transparency rating</p>
              </div>
            </div>
            <div className="flex items-start mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <FaExclamationTriangle className="text-amber-500 text-xl mr-3 mt-1" />
              <div>
                <h4 className="text-md font-semibold text-gray-900">Verify Our Credentials</h4>
                <p className="text-gray-600 text-sm">You can verify our certifications on each organization's website.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutTransparency; 