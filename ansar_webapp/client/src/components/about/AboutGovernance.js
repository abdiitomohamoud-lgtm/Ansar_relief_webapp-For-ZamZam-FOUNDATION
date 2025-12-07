import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaUsers, 
  FaFileAlt, 
  FaHandshake,
  FaBalanceScale,
  FaBullseye
} from 'react-icons/fa';

const AboutGovernance = () => {
  const governanceItems = [
    {
      icon: FaUsers,
      title: 'Board of Directors',
      description: 'Our board provides strategic direction and oversight to ensure we fulfill our mission effectively.'
    },
    {
      icon: FaChartLine,
      title: 'Organizational Structure',
      description: 'A clear hierarchy and defined roles enable efficient decision-making and accountability.'
    },
    {
      icon: FaFileAlt,
      title: 'Policies & Procedures',
      description: 'Comprehensive guidelines ensure consistent, ethical, and effective operations.'
    },
    {
      icon: FaHandshake,
      title: 'Stakeholder Engagement',
      description: 'Regular consultation with beneficiaries, donors, and partners guides our work.'
    },
    {
      icon: FaBalanceScale,
      title: 'Compliance',
      description: 'We adhere to international standards and local regulations in all our operations.'
    },
    {
      icon: FaBullseye,
      title: 'Strategic Planning',
      description: 'Long-term planning ensures sustainable impact and organizational growth.'
    }
  ];

  return (
    <div className="space-y-12">
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Governance Structure</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>
            Qatar Charity maintains a robust governance framework that ensures transparency, accountability, and effective decision-making. Our governance structure is designed to uphold the highest standards of ethical conduct while maximizing our impact on communities we serve.
          </p>
          <p className="mt-4">
            Led by our Board of Directors and executive team, we implement comprehensive policies and procedures that guide our operations, risk management, and strategic planning processes.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {governanceItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <item.icon className="text-3xl text-primary-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-primary-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Good Governance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Transparency</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                  <FaFileAlt className="text-primary-600 text-sm" />
                </span>
                Regular financial reporting and audits
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                  <FaFileAlt className="text-primary-600 text-sm" />
                </span>
                Public disclosure of program outcomes
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                  <FaFileAlt className="text-primary-600 text-sm" />
                </span>
                Clear communication with stakeholders
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Accountability</h4>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                  <FaBalanceScale className="text-primary-600 text-sm" />
                </span>
                Regular board meetings and oversight
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                  <FaBalanceScale className="text-primary-600 text-sm" />
                </span>
                Performance monitoring and evaluation
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                  <FaBalanceScale className="text-primary-600 text-sm" />
                </span>
                Compliance with international standards
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutGovernance; 