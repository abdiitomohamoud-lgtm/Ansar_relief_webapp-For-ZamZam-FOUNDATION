const HomePageData = require('../models/homePageData.model');

// Simple health check endpoint
exports.getHome = (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Home endpoint is working',
    timestamp: new Date().toISOString()
  });
};

// Get home page data with proper error handling
exports.getHomePageData = async (req, res) => {
  try {
    // Check if the collection exists and has documents
    const count = await HomePageData.countDocuments();
    
    if (count === 0) {
      // Return default data if collection is empty
      return res.status(200).json({
        status: 'success',
        message: 'Using default home page data',
        data: getDefaultHomeData()
      });
    }
    
    // Fetch the first document if collection exists
    const homePageData = await HomePageData.findOne();
    res.status(200).json({
      status: 'success',
      data: homePageData
    });
    
  } catch (error) {
    console.error('Error in getHomePageData:', error);
    
    // Return default data in case of error
    res.status(200).json({
      status: 'success',
      message: 'Using default home page data due to error',
      data: getDefaultHomeData(),
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Default home page data
function getDefaultHomeData() {
  return {
    featuredCampaigns: [],
    impactStats: {
      beneficiaries: 0,
      countries: 0,
      projects: 0,
      volunteers: 0
    },
    urgentCases: [],
    currentCampaigns: [],
    programs: [],
    sadaqahTypes: [],
    sponsorshipPrograms: [],
    howWeWorkSteps: [],
    appInfo: {},
    heroSlides: [],
    news: [],
    testimonials: [],
    partners: []
  };
}
