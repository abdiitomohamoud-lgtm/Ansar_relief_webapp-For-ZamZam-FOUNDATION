import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDonation } from '../../contexts/DonationContext';
import { FaArrowRight, FaUsers, FaClock, FaHeart, FaRegHeart, FaShieldAlt, FaFire, FaHandHoldingHeart, FaRegLightbulb, FaImage, FaMapMarkerAlt, FaCalendarAlt, FaChartLine, FaCheckCircle, FaStar, FaRegStar, FaShare, FaRegShareSquare, FaBookmark, FaRegBookmark, FaEllipsisH, FaChevronRight, FaChevronLeft, FaFilter, FaSearch, FaSort, FaSortUp, FaSortDown, FaTag, FaUserFriends, FaHandshake, FaPrayingHands, FaMosque, FaQuran, FaSchool, FaHospital, FaWater, FaUtensils, FaHome, FaBaby, FaChild, FaUserGraduate, FaUserMd, FaUserNurse, FaUserTie, FaUserCog, FaUserShield, FaUserCheck, FaUserClock, FaUserEdit, FaUserPlus, FaUserMinus, FaUserLock, FaUserSecret, FaUserNinja, FaUserAstronaut, FaUserAlien, FaUserRobot, FaUserInjured, FaUserSlash, FaUserTag, FaUserTimes, FaUsersCog, FaUsersSlash, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Progress, Tooltip, HoverSection, Skeleton, Button, Card, Avatar, Chip, Divider, Tabs, Tab, TabList, TabPanel, TabPanels } from '../common';
import { getCardGradient, getCategoryBadgeStyle, getTextGradient, getCategoryColor, getCategoryIcon } from '../../utils/colorUtils';
import config from '../../utils/config';

// Custom styles for pattern overlay
const styles = `
  .pattern-overlay {
    background-repeat: repeat;
    background-size: 200px;
    width: 100%;
    height: 100%;
  }
`;

// Default images for different campaign types
const defaultImages = {
  'emergency-aid': '/assets/images/campaigns/emergency.jpg',
  'water-project': '/assets/images/campaigns/water-project.jpg',
  'education': '/assets/images/campaigns/education.jpg',
  'ramadan': '/assets/images/campaigns/ramadan.jpg',
  'orphans': '/assets/images/campaigns/orphans.jpg',
  'family-support': '/assets/images/campaigns/family-support.jpg'
};

// Decorative patterns - using direct URLs to public assets
const patterns = {
  arabesque: '/assets/patterns/arabesque.svg',
  geometric: '/assets/patterns/geometric.svg',
  islamic: '/assets/patterns/islamic-pattern.svg',
  dots: '/assets/patterns/dots.svg'
};

// Category icons mapping
const categoryIcons = {
  'Emergency': FaFire,
  'Water': FaWater,
  'Education': FaSchool,
  'Food': FaUtensils,
  'Healthcare': FaHospital,
  'Children': FaBaby,
  'Orphans': FaChild,
  'Family': FaHome,
  'Ramadan': FaMosque,
  'Zakat': FaPrayingHands,
  'Sadaqah': FaHandshake,
  'Waqf': FaQuran,
  'Microfinance': FaUserTie,
  'Skills Training': FaUserGraduate,
  'Medical': FaUserMd,
  'Nursing': FaUserNurse,
  'Administration': FaUserCog,
  'Security': FaUserShield,
  'Verification': FaUserCheck,
  'Monitoring': FaUserClock,
  'Coordination': FaUserEdit,
  'Recruitment': FaUserPlus,
  'Reduction': FaUserMinus,
  'Restriction': FaUserLock,
  'Intelligence': FaUserSecret,
  'Special Operations': FaUserNinja,
  'Space Operations': FaUserAstronaut,
  'Alien Operations': FaRobot,
  'Robotic Operations': FaRobot
};

// Image loading and error handling component
const CampaignImage = ({ src, alt, className, type = 'emergency-aid' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [triedPlaceholder, setTriedPlaceholder] = useState(false);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);
    
    // Log the image source to debug
    console.log('Loading image:', src);
  }, [src]);

  const handleLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setIsLoading(false);
  };

  const handleError = () => {
    console.error(`Image failed to load: ${imageSrc} | triedPlaceholder: ${triedPlaceholder}`);
    setHasError(true);
    setIsLoading(false);
    // Use placeholder image for any broken/missing image, but only once
    if (!triedPlaceholder) {
      setImageSrc('/assets/images/campaigns/water.jpg'); // Update to correct path if needed
      setTriedPlaceholder(true);
    } else {
      // Already tried placeholder, do not attempt again
      console.error('Placeholder image also failed to load. No further fallback.');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <FaImage className="w-12 h-12 text-gray-300" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent">
        <div className="absolute inset-0 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.islamic})` }}></div>
      </div>
      {hasError && (
        <div className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 rounded">
          ⚠️ Image Error
        </div>
      )}
    </div>
  );
};

// Category filter component
const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        variant={activeCategory === 'all' ? 'primary' : 'outline'}
        size="sm"
        className="rounded-full"
        onClick={() => onSelectCategory('all')}
      >
        All Categories
      </Button>
      {categories.map((category) => {
        const Icon = categoryIcons[category] || FaTag;
        return (
          <Button
            key={category}
            variant={activeCategory === category ? 'primary' : 'outline'}
            size="sm"
            className={`rounded-full ${activeCategory === category ? `bg-${getCategoryColor(category)}-500 border-${getCategoryColor(category)}-500` : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <Icon className="mr-1.5" />
            {category}
          </Button>
        );
      })}
    </div>
  );
};

// Campaign card component
const CampaignCard = ({ campaign, onSave, savedCampaigns, index }) => {
  // const [isHovered, setIsHovered] = useState(false); // Removed unused variable
  const progress = Math.round((campaign.raised / campaign.goal) * 100);
  const CategoryIcon = categoryIcons[campaign.category] || FaTag;
  const categoryColor = getCategoryColor(campaign.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group h-full"
      // onMouseEnter and onMouseLeave removed (isHovered not used)
    >
      <HoverSection theme={categoryColor} className="h-full">
        <div className="relative h-72 overflow-hidden rounded-t-xl">
          <CampaignImage
            src={campaign.image}
            alt={campaign.title}
            type={campaign.type}
            className="transform transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category and Urgency Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge
              variant="light"
              size="sm"
              className={`bg-${categoryColor}-100 text-${categoryColor}-800 border border-${categoryColor}-200`}
            >
              <CategoryIcon className="mr-1" />
              {campaign.category}
            </Badge>
            {campaign.urgency === "High" && (
              <Badge
                variant="danger"
                size="sm"
                className="flex items-center bg-red-100 text-red-800 border border-red-200"
              >
                <FaFire className="mr-1" />
                Urgent
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => onSave(campaign)}
              className="w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            >
              {savedCampaigns.includes(campaign.id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-600" />
              )}
            </button>
            <button
              className="w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            >
              <FaShare className="text-gray-600" />
            </button>
          </div>
          
          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 flex items-center bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
            <FaMapMarkerAlt className="mr-1.5 text-primary-300" />
            {campaign.location}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {campaign.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {campaign.description}
          </p>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-900">
                ${campaign.raised.toLocaleString()}
              </span>
              <span className="text-gray-600">
                of ${campaign.goal.toLocaleString()}
              </span>
            </div>
            <Progress
              value={campaign.raised}
              max={campaign.goal}
              variant={categoryColor}
              className="h-2.5 rounded-full"
            />
            <div className="mt-1 text-xs text-gray-500 flex justify-between">
              <span>{progress}% Funded</span>
              <span>{campaign.daysLeft} days left</span>
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">Donors</div>
              <div className="text-sm font-semibold text-gray-900">{campaign.donorsCount}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">Impact</div>
              <div className="text-sm font-semibold text-gray-900">{campaign.impact}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-500">License</div>
              <div className="text-xs font-semibold text-gray-900">{campaign.licenseNumber}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => ({ ...campaign, donationAmount: campaign.amount || campaign.raised || 0 })}
              className={`flex-1 px-4 py-2.5 bg-gradient-to-r from-${categoryColor}-500 to-${categoryColor}-600 text-white rounded-lg font-medium text-center transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg`}
            >
              <FaHandHoldingHeart className="mr-2" />
              Donate Now
            </button>
            <Link
              to={`/campaigns/${campaign.id}`}
              className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium text-center transition-all duration-300 hover:bg-gray-50 flex items-center justify-center"
            >
              <FaRegLightbulb className="mr-2" />
              Learn More
            </Link>
          </div>
        </div>
      </HoverSection>
    </motion.div>
  );
};

// Category details component
const CategoryDetails = ({ category, campaigns }) => {
  const categoryColor = getCategoryColor(category);
  const CategoryIcon = categoryIcons[category] || FaTag;
  const filteredCampaigns = campaigns.filter(campaign => campaign.category === category);
  const totalRaised = filteredCampaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalGoal = filteredCampaigns.reduce((sum, campaign) => sum + campaign.goal, 0);
  const totalDonors = filteredCampaigns.reduce((sum, campaign) => sum + campaign.donorsCount, 0);
  const progress = Math.round((totalRaised / totalGoal) * 100);

  return (
    <div className={`bg-gradient-to-br from-${categoryColor}-50 to-white rounded-xl p-6 shadow-lg mb-8`}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className={`w-20 h-20 rounded-full bg-${categoryColor}-100 flex items-center justify-center`}>
          <CategoryIcon className={`w-10 h-10 text-${categoryColor}-600`} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className={`text-2xl font-bold text-${categoryColor}-800 mb-2`}>{category} Campaigns</h3>
          <p className="text-gray-600 mb-4">
            {category === 'Emergency' && 'Urgent humanitarian aid for communities in crisis.'}
            {category === 'Water' && 'Providing clean water access to communities in need.'}
            {category === 'Education' && 'Supporting education initiatives for children and adults.'}
            {category === 'Food' && 'Ensuring food security for vulnerable communities.'}
            {category === 'Healthcare' && 'Providing medical care and health services.'}
            {category === 'Children' && "Supporting children's welfare and development."}
            {category === 'Orphans' && 'Providing care and support for orphaned children.'}
            {category === 'Family' && 'Supporting families in need with essential resources.'}
            {category === 'Ramadan' && 'Special initiatives during the holy month of Ramadan.'}
            {category === 'Zakat' && 'Managing and distributing Zakat funds to eligible recipients.'}
            {category === 'Sadaqah' && 'Facilitating voluntary charitable giving.'}
            {category === 'Waqf' && 'Establishing and managing charitable endowments.'}
            {!['Emergency', 'Water', 'Education', 'Food', 'Healthcare', 'Children', 'Orphans', 'Family', 'Ramadan', 'Zakat', 'Sadaqah', 'Waqf'].includes(category) && 
              `Supporting ${category.toLowerCase()} initiatives to create positive change.`}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500">Active Campaigns</div>
              <div className="text-xl font-bold text-gray-900">{filteredCampaigns.length}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500">Total Raised</div>
              <div className="text-xl font-bold text-gray-900">${totalRaised.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500">Total Goal</div>
              <div className="text-xl font-bold text-gray-900">${totalGoal.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-500">Total Donors</div>
              <div className="text-xl font-bold text-gray-900">{totalDonors.toLocaleString()}</div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-900">Overall Progress</span>
              <span className="text-gray-600">{progress}%</span>
            </div>
            <Progress
              value={totalRaised}
              max={totalGoal}
              variant={categoryColor}
              className="h-2.5 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null); // Removed unused variable
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('urgent');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockCampaigns = [
          {
            id: 1,
            title: "Emergency Relief Fund for Gaza",
            description: "Providing urgent humanitarian aid including medical supplies, food packages, and essential items to families affected by the crisis.",
            image: '/assets/images/campaigns/emergency.jpg',
            raised: 85000,
            goal: 100000,
            donorsCount: 450,
            daysLeft: 15,
            licenseNumber: "ERC-2024-001",
            category: "Emergency",
            urgency: "High",
            color: "red",
            impact: "Supports 1,000+ families",
            type: 'emergency-aid',
            location: "Gaza Strip",
            startDate: "2024-03-01",
            endDate: "2024-06-30",
            updates: [
              { date: "2024-03-15", title: "First Aid Delivery", description: "Successfully delivered first batch of medical supplies" },
              { date: "2024-04-01", title: "Food Distribution", description: "Distributed food packages to 500 families" }
            ],
            milestones: [
              { amount: 25000, description: "Medical Supplies" },
              { amount: 50000, description: "Food Packages" },
              { amount: 75000, description: "Shelter Materials" },
              { amount: 100000, description: "Complete Relief Package" }
            ]
          },
          {
            id: 2,
            title: "Clean Water Initiative",
            description: "Building sustainable water systems to provide clean drinking water to communities facing severe water shortages.",
            image: '/assets/images/campaigns/water-project.jpg',
            raised: 35000,
            goal: 50000,
            donorsCount: 280,
            daysLeft: 30,
            licenseNumber: "WTR-2024-002",
            category: "Water",
            urgency: "Medium",
            color: "blue",
            impact: "Reaches 500+ households",
            type: 'water-project',
            location: "Yemen",
            startDate: "2024-02-15",
            endDate: "2024-08-31",
            updates: [
              { date: "2024-03-01", title: "Site Survey Complete", description: "Identified 5 locations for water wells" },
              { date: "2024-04-15", title: "First Well Operational", description: "First water well successfully completed" }
            ],
            milestones: [
              { amount: 15000, description: "Survey & Planning" },
              { amount: 30000, description: "First Well" },
              { amount: 45000, description: "Second Well" },
              { amount: 50000, description: "Complete Water System" }
            ]
          },
          {
            id: 3,
            title: "Education Support Program",
            description: "Empowering children through education by providing school supplies, uniforms, and supporting teacher training programs.",
            image: '/assets/images/campaigns/education.jpg',
            raised: 25000,
            goal: 40000,
            donorsCount: 190,
            daysLeft: 45,
            licenseNumber: "EDU-2024-003",
            category: "Education",
            urgency: "Medium",
            color: "green",
            impact: "Helps 300+ students",
            type: 'education',
            location: "Bangladesh",
            startDate: "2024-03-10",
            endDate: "2024-09-30",
            updates: [
              { date: "2024-04-01", title: "Materials Distributed", description: "School supplies delivered to 3 schools" },
              { date: "2024-05-15", title: "Teacher Training", description: "Training program for 15 teachers completed" }
            ],
            milestones: [
              { amount: 10000, description: "School Supplies" },
              { amount: 20000, description: "Teacher Training" },
              { amount: 30000, description: "School Renovation" },
              { amount: 40000, description: "Complete Education Support" }
            ]
          },
          {
            id: 4,
            title: "Food Security Project",
            description: "Ensuring sustainable food access for vulnerable communities through agricultural development and food distribution programs.",
            image: '/assets/images/campaigns/ramadan.jpg',
            raised: 42000,
            goal: 60000,
            donorsCount: 320,
            daysLeft: 25,
            licenseNumber: "FSP-2024-004",
            category: "Food",
            urgency: "High",
            color: "orange",
            impact: "Feeds 750+ families",
            type: 'ramadan',
            location: "Somalia",
            startDate: "2024-02-01",
            endDate: "2024-07-31",
            updates: [
              { date: "2024-03-15", title: "Seeds Distributed", description: "Agricultural seeds distributed to 200 farmers" },
              { date: "2024-04-30", title: "First Harvest", description: "First harvest of crops successfully completed" }
            ],
            milestones: [
              { amount: 15000, description: "Seeds & Tools" },
              { amount: 30000, description: "Training Programs" },
              { amount: 45000, description: "Storage Facilities" },
              { amount: 60000, description: "Complete Food Security" }
            ]
          },
          {
            id: 5,
            title: "Healthcare Access Initiative",
            description: "Providing essential medical services and healthcare support to underserved communities and remote areas.",
            image: '/assets/images/campaigns/family-support.jpg',
            raised: 55000,
            goal: 75000,
            donorsCount: 380,
            daysLeft: 20,
            licenseNumber: "HCA-2024-005",
            category: "Healthcare",
            urgency: "High",
            color: "purple",
            impact: "Serves 2,000+ patients",
            type: 'family-support',
            location: "Afghanistan",
            startDate: "2024-01-15",
            endDate: "2024-08-31",
            updates: [
              { date: "2024-02-15", title: "Medical Camp Setup", description: "First medical camp established in remote area" },
              { date: "2024-04-01", title: "Equipment Arrived", description: "Medical equipment and supplies delivered" }
            ],
            milestones: [
              { amount: 20000, description: "Medical Supplies" },
              { amount: 40000, description: "Medical Camps" },
              { amount: 60000, description: "Healthcare Workers" },
              { amount: 75000, description: "Complete Healthcare Access" }
            ]
          },
          {
            id: 6,
            title: "Orphan Support Program",
            description: "Supporting orphaned children with education, healthcare, and essential needs for a better future.",
            image: '/assets/images/campaigns/orphans.jpg',
            raised: 28000,
            goal: 45000,
            donorsCount: 210,
            daysLeft: 35,
            licenseNumber: "OSP-2024-006",
            category: "Orphans",
            urgency: "Medium",
            color: "pink",
            impact: "Supports 150+ children",
            type: 'orphans',
            location: "Syria",
            startDate: "2024-03-05",
            endDate: "2024-10-31",
            updates: [
              { date: "2024-04-10", title: "Education Started", description: "Education program started for 50 children" },
              { date: "2024-05-20", title: "Healthcare Provided", description: "Healthcare check-ups completed for all children" }
            ],
            milestones: [
              { amount: 15000, description: "Education Support" },
              { amount: 30000, description: "Healthcare Support" },
              { amount: 45000, description: "Complete Orphan Support" }
            ]
          },
          {
            id: 7,
            title: "Ramadan Food Distribution",
            description: "Providing iftar meals and food packages to families during the holy month of Ramadan.",
            image: '/assets/images/campaigns/ramadan.jpg',
            raised: 32000,
            goal: 50000,
            donorsCount: 240,
            daysLeft: 10,
            licenseNumber: "RFD-2024-007",
            category: "Ramadan",
            urgency: "High",
            color: "teal",
            impact: "Feeds 1,200+ families",
            type: 'ramadan',
            location: "Pakistan",
            startDate: "2024-03-10",
            endDate: "2024-04-10",
            updates: [
              { date: "2024-03-15", title: "Distribution Started", description: "Food packages distributed to 300 families" },
              { date: "2024-03-25", title: "Iftar Meals", description: "Iftar meals provided to 500 people" }
            ],
            milestones: [
              { amount: 15000, description: "Food Packages" },
              { amount: 30000, description: "Iftar Meals" },
              { amount: 50000, description: "Complete Ramadan Support" }
            ]
          },
          {
            id: 8,
            title: "Family Support Initiative",
            description: "Providing financial assistance and essential resources to families facing economic hardship.",
            image: '/assets/images/campaigns/family-support.jpg',
            raised: 18000,
            goal: 30000,
            donorsCount: 150,
            daysLeft: 40,
            licenseNumber: "FSI-2024-008",
            category: "Family",
            urgency: "Medium",
            color: "indigo",
            impact: "Supports 100+ families",
            type: 'family-support',
            location: "Jordan",
            startDate: "2024-03-01",
            endDate: "2024-08-31",
            updates: [
              { date: "2024-04-05", title: "First Distribution", description: "Financial assistance provided to 30 families" },
              { date: "2024-05-10", title: "Resource Distribution", description: "Essential resources distributed to 50 families" }
            ],
            milestones: [
              { amount: 10000, description: "Financial Assistance" },
              { amount: 20000, description: "Resource Distribution" },
              { amount: 30000, description: "Complete Family Support" }
            ]
          },
          {
            id: 9,
            title: "Zakat Distribution Program",
            description: "Managing and distributing Zakat funds to eligible recipients according to Islamic principles.",
            image: '/assets/images/campaigns/ramadan.jpg',
            raised: 95000,
            goal: 120000,
            donorsCount: 520,
            daysLeft: 5,
            licenseNumber: "ZDP-2024-009",
            category: "Zakat",
            urgency: "High",
            color: "cyan",
            impact: "Supports 2,500+ recipients",
            type: 'ramadan',
            location: "Multiple Countries",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            updates: [
              { date: "2024-03-01", title: "First Quarter Distribution", description: "Zakat distributed to 1,000 recipients" },
              { date: "2024-06-01", title: "Second Quarter Distribution", description: "Zakat distributed to 1,500 recipients" }
            ],
            milestones: [
              { amount: 30000, description: "First Quarter" },
              { amount: 60000, description: "Second Quarter" },
              { amount: 90000, description: "Third Quarter" },
              { amount: 120000, description: "Complete Zakat Distribution" }
            ]
          }
        ];
        
        setCampaigns(mockCampaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        // setError removed (error state not used)
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, []);

  const handleSave = (campaign) => {
    setSavedCampaigns(prev => 
      prev.includes(campaign.id)
        ? prev.filter(id => id !== campaign.id)
        : [...prev, campaign.id]
    );
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Get unique categories
  const categories = [...new Set(campaigns.map(campaign => campaign.category))];

  // Filter campaigns based on active category and search term
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesCategory = activeCategory === 'all' || campaign.category === activeCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === 'urgent') {
      return a.urgency === 'High' ? -1 : b.urgency === 'High' ? 1 : 0;
    } else if (sortBy === 'newest') {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortBy === 'ending') {
      return a.daysLeft - b.daysLeft;
    } else if (sortBy === 'progress') {
      return (b.raised / b.goal) - (a.raised / a.goal);
    }
    return 0;
  });

  // Pagination
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = sortedCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  const totalPages = Math.ceil(sortedCampaigns.length / campaignsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Add styles */}
      <style>{styles}</style>
      
      {/* Decorative Patterns */}
      <div className="absolute inset-0 pattern-overlay opacity-5" style={{ backgroundImage: `url(${patterns.geometric})` }}></div>
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.arabesque})` }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 pattern-overlay opacity-10" style={{ backgroundImage: `url(${patterns.islamic})` }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
          <span className={`${getTextGradient('red')} bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4 block`}>
            Make a Difference
          </span>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative">
            <span className="relative inline-block">
            Featured Campaigns
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Support our most urgent causes and help us create lasting change in communities worldwide.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="urgent">Most Urgent</option>
                <option value="newest">Newest</option>
                <option value="ending">Ending Soon</option>
                <option value="progress">Most Funded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            <span className="relative inline-block">
              Browse by Category
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
            </span>
          </h3>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Category Details */}
        {activeCategory !== 'all' && (
          <div className="mb-12">
            <CategoryDetails
              category={activeCategory}
              campaigns={campaigns}
            />
          </div>
        )}

        {/* Campaigns Grid */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            <span className="relative inline-block">
              Active Campaigns
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
            </span>
          </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {loading ? (
              // Loading skeleton cards
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <Skeleton height="h-56" className="rounded-t-xl" />
                  <div className="p-6 space-y-4">
                    <Skeleton height="h-6" width="w-3/4" />
                    <Skeleton height="h-4" count={2} />
                    <Skeleton height="h-2" className="mt-4" />
                    <div className="flex justify-between mt-4">
                      <Skeleton height="h-4" width="w-1/4" />
                      <Skeleton height="h-4" width="w-1/4" />
                    </div>
                  </div>
                </motion.div>
              ))
              ) : currentCampaigns.length > 0 ? (
                currentCampaigns.map((campaign, index) => (
                  <CampaignCard
                  key={campaign.id}
                    campaign={campaign}
                    onSave={handleSave}
                    savedCampaigns={savedCampaigns}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No campaigns found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
                      </div>

        {/* Pagination */}
        {!loading && currentCampaigns.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentPage === i + 1
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
                      <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
                      </button>
                      </div>
                    </div>
            )}

        {/* View All Link */}
        <div className="text-center mt-16">
          <Link
            to="/campaigns"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-500 text-primary-600 font-semibold rounded-lg transition-all duration-300 hover:bg-primary-500 hover:text-white group shadow-md hover:shadow-lg"
          >
            View All Campaigns
            <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns; 