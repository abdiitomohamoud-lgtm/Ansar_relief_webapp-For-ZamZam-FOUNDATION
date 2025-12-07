// Configuration settings for the application
const config = {
  // Base URL for API endpoints
  apiBaseUrl: process.env.REACT_APP_API_URL || '/api',
  
  // Base URL for assets like images
  assetsBaseUrl: '/assets',
  
  // Image directories
  imagePaths: {
    campaigns: '/assets/images/campaigns',
    sadaqah: '/assets/images/sadaqah',
    sponsorships: '/assets/images/sponsorships',
    logos: '/assets/images/logos',
    news: '/assets/images/news',
    testimonials: '/assets/images/testimonials',
    sample: '/assets/images/sample',
    about: '/assets/images/about'
  },
  
  // Default fallback images
  defaultImages: {
    campaign: '/assets/images/campaigns/emergency.jpg',
    sadaqah: '/assets/images/sadaqah/general-sadaqah.jpg',
    sponsorship: '/assets/images/sponsorships/orphan.jpg',
    news: '/assets/images/news/news-1.jpg',
    avatar: '/images/campaigns/water.jpg',
    logo: '/assets/images/logos/placeholder-logo.png'
  }
};

export default config; 