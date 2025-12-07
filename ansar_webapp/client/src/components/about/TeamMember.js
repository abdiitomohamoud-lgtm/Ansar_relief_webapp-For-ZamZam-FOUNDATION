import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Import team member images
import teamMember1 from '../../assets/images/about/team-member-1.jpg';
import teamMember2 from '../../assets/images/about/team-member-2.jpg';
import teamMember3 from '../../assets/images/about/team-member-3.jpg';
import teamMember4 from '../../assets/images/about/team-member-4.jpg';

// Map of team member images
const teamMemberImages = {
  'John Doe': teamMember1,
  'Jane Smith': teamMember2,
  'Ahmed Hassan': teamMember3,
  'Sarah Johnson': teamMember4,
  // Add fallback for any other team members
  default: teamMember1
};

const TeamMember = ({ name, role, bio, image, social, delay = 0 }) => {
  // Use the mapped image or fallback to default
  const memberImage = teamMemberImages[name] || teamMemberImages.default;
  const [showBio, setShowBio] = React.useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={memberImage}
            alt={name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-primary-600 text-sm mb-3">{role}</p>
          <p className="text-gray-600 text-sm mb-4">{bio.length > 80 ? bio.slice(0, 80) + '...' : bio}</p>
          <button
            className="text-primary-600 underline text-sm mb-4"
            onClick={() => setShowBio(true)}
          >
            View Bio
          </button>
          <div className="flex space-x-4">
            {social?.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
            {social?.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            )}
            {social?.email && (
              <a
                href={`mailto:${social.email}`}
                className="text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
      {showBio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-primary-600 text-lg"
              onClick={() => setShowBio(false)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2 text-primary-600">{name}</h3>
            <p className="text-primary-600 text-sm mb-2">{role}</p>
            <img src={memberImage} alt={name} className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
            <p className="text-gray-700 text-base whitespace-pre-line">{bio}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMember; 