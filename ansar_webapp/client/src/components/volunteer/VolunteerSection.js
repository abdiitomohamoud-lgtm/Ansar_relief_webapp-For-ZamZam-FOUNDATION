import { motion } from 'framer-motion';
import { FaUserTie, FaUsers, FaGraduationCap, FaExternalLinkAlt } from 'react-icons/fa';
import { Card, CardBody } from '../common';

const VolunteerSection = ({ opportunities, onApply }) => {
  return (
    <div className="space-y-16">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Volunteer With Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our mission to make a difference in communities across Somali territories. Your skills and dedication can help create lasting change.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
                <CardBody className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8B1F4B] to-[#4B1F8B] rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500">
                      <FaUserTie className="text-2xl" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-[#8B1F4B] transition-colors duration-300">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-600">{opportunity.description}</p>
                  </div>
                  <div className="flex-grow space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#8B1F4B] mb-3 flex items-center gap-2">
                        <FaUsers className="text-lg" />
                        Commitment
                      </h4>
                      <p className="text-gray-600 bg-[#8B1F4B]/5 px-4 py-2 rounded-lg">
                        {opportunity.commitment}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#8B1F4B] mb-3 flex items-center gap-2">
                        <FaGraduationCap className="text-lg" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {opportunity.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#8B1F4B] rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => onApply(opportunity.title)}
                    className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-[#8B1F4B] to-[#4B1F8B] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Apply Now
                    <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VolunteerSection; 