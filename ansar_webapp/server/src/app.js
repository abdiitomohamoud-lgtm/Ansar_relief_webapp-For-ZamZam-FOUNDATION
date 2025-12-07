// ...existing code...
// ...existing code...
// ...existing code...
const userProfileRoutes = require('./routes/userProfile.routes');
app.use('/api/user', userProfileRoutes);
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

console.log('=== app.js loaded ===');

// Import routes
const authRoutes = require('./routes/auth.routes');
const volunteerRoutes = require('../../routes/volunteer');
const userRoutes = require('./routes/user.routes');
const campaignRoutes = require('./routes/campaign.routes');
const donationRoutes = require('./routes/donation.routes');
const sadaqahRoutes = require('./routes/sadaqah.routes');
const sponsorshipRoutes = require('./routes/sponsorship.routes');
const projectRoutes = require('./routes/project.routes');
const categoryRoutes = require('./routes/category.routes');
const uploadRoutes = require('./routes/upload.routes');
const adminRoutes = require('./routes/admin.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const partnerRoutes = require('./routes/partner.routes');
const newsRoutes = require('./routes/news.routes');
const eventRoutes = require('./routes/event.routes');
const faqRoutes = require('./routes/faq.routes');
const teamRoutes = require('./routes/team.routes');
const homeRoutes = require('./routes/home.routes');
const aboutRoutes = require('./routes/about.routes');
const initiativesRoutes = require('./routes/initiatives.routes');
const approachRoutes = require('./routes/approach.routes');
const donateRoutes = require('./routes/donate.routes');
const loginPageContentRoutes = require('../routes/loginPageContent');
console.log('About to require initiativesPage.routes.js');
const initiativesPageRoutes = require('./routes/initiativesPage.routes');
console.log('About to require campaignPage.routes.js');
const campaignPageRoutes = require('./routes/campaignPage.routes');
console.log('Loaded campaignPage.routes.js:', typeof campaignPageRoutes);
const sponsorshipPageRoutes = require('./routes/sponsorshipPage.routes');
const userProfilePageRoutes = require('./routes/userProfilePage.routes');
const userFormsRoutes = require('./routes/userForms.routes');
const avatarRoutes = require('./routes/avatar');

// Start express app
const app = express();
app.use('/api', volunteerRoutes);

// app.enable('trust proxy'); // Disabled for security with express-rate-limit
// If behind a proxy (e.g. Heroku), use: app.set('trust proxy', 1);

// Set up view engine for email templates (if needed)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARES

// Implement CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads/avatars', express.static(path.join(__dirname, '../public/uploads/avatars')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: [
    'duration',
    'amount',
    'price',
    'category',
    'tags',
    'sort'
  ]
}));

// Compression middleware
app.use(compression());

// Add request timestamp middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: req.requestTime
  });
});

// API documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    message: 'Ansar API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      campaigns: '/api/campaigns',
      donations: '/api/donations',
      sadaqah: '/api/sadaqah',
      sponsorships: '/api/sponsorships',
      projects: '/api/projects',
      categories: '/api/categories',
      upload: '/api/upload',
      admin: '/api/admin',
      testimonials: '/api/testimonials',
      partners: '/api/partners',
      news: '/api/news',
      events: '/api/events',
      faqs: '/api/faqs',
      team: '/api/team'
    }
  });
});

// API Routes
const cartRoutes = require('./routes/cart.routes');
app.use('/api/auth', authRoutes);
app.use('/api/login-page-content', loginPageContentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/sadaqah', sadaqahRoutes);
app.use('/api/sponsorships', sponsorshipRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/initiatives', initiativesRoutes);
app.use('/api/approach', approachRoutes);
app.use('/api/donate', donateRoutes);
app.use('/api/initiatives-page', initiativesPageRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/campaign-page', campaignPageRoutes);
app.use('/api/sponsorship', sponsorshipPageRoutes);
app.use('/api/user-profile-page', userProfilePageRoutes);
app.use('/api/user/forms', userFormsRoutes);
app.use('/api/user/avatar', avatarRoutes);
const sponsorshipCategoryPageRoutes = require('./routes/sponsorshipCategoryPage.routes');
app.use('/api/sponsorship-category', sponsorshipCategoryPageRoutes);
app.use('/api/projects-page', require('../routes/projectsPage'));
app.use('/api/projectsDetail', require('../routes/projectsDetailPage'));
app.use('/api/projectCategories', require('../routes/projectCategoryPage'));
console.log('Registered /api/campaign-page');

// Base route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Ansar Humanitarian Relief API',
    version: '1.0.0'
  });
});

// Register sponsorship page route before catch-all
app.use('/api/sponsorship', sponsorshipPageRoutes);

// Handle undefined routes
app.all('*', notFoundHandler);

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
