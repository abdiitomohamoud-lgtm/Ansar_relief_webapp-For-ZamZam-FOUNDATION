// Load environment variables at the very beginning
require('dotenv').config({ path: __dirname + '/../.env' });

// Debug: Log the STRIPE_SECRET_KEY to verify it's loaded
console.log('STRIPE_SECRET_KEY loaded:', process.env.STRIPE_SECRET_KEY ? 'YES' : 'NO');
if (process.env.STRIPE_SECRET_KEY) {
  console.log('STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY.length);
}

// Debug: Log all environment variables
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// After all built-in middleware and before other routes:
const userProfileRoutes = require('./routes/userProfile.routes');
const userFormsRoutes = require('./routes/userForms.routes');
const contactUserInfoRoutes = require('./routes/contactUserInfo.routes');

// After all built-in middleware and before other routes:
console.log('Starting server...');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import database connection
const connectDB = require('./database/connection');


// Contact Page Content route
const contactPageContentRoutes = require('./routes/contactPageContent.routes');
const volunteerRoutes = require('../routes/volunteer');
const authRoutes = require('./routes/auth.routes');
const campaignRoutes = require('./routes/campaign.routes');
const donationRoutes = require('./routes/donation.routes');
const userRoutes = require('./routes/user.routes');
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
const commentRoutes = require('./routes/comment.routes');
const aboutRoutes = require('./routes/about.routes');
const initiativesRoutes = require('./routes/initiatives.routes');
const approachRoutes = require('./routes/approach.routes');
const donateRoutes = require('./routes/donate.routes');
const initiativesPageRoutes = require('./routes/initiativesPage.routes');
const campaignPageRoutes = require('./routes/campaignPage.routes');
const sponsorshipPageRoutes = require('./routes/sponsorshipPage.routes');
const projectsPageRoutes = require('../routes/projectsPage');
const contactRoutes = require('../routes/contact');
const userProfilePageRoutes = require('./routes/userProfilePage.routes');
const loginPageContentRoutes = require('../routes/loginPageContent');

// Import error handling middleware
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');// Register cart route
const cartRoutes = require('../routes/cart');

// Create Express app
const app = express();


// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Register payment route after app is initialized
const paymentRoutes = require('../routes/payment');
app.use('/api/payment', paymentRoutes);

// Set port
const PORT = process.env.PORT || 5000;
// Event Registration route
const eventRegistrationRoutes = require('./routes/eventRegistration.routes');

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
const avatarRoutes = require('./routes/avatar');
app.use('/api/user/avatar', avatarRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/user/forms', userFormsRoutes);
app.use('/api/contact-user-info', contactUserInfoRoutes);
app.use('/api/contact-page-content', contactPageContentRoutes);
app.use('/api', contactRoutes);
app.use('/api', volunteerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);
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
app.use('/api/news', commentRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/initiatives', initiativesRoutes);
app.use('/api/approach', approachRoutes);
app.use('/api/donate', donateRoutes);
app.use('/api/initiatives-page', initiativesPageRoutes);
app.use('/api/campaign-page', campaignPageRoutes);
app.use('/api/sponsorship', sponsorshipPageRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/projects-page', projectsPageRoutes);
app.use('/api/login-page-content', loginPageContentRoutes);
const projectsDetailPageRoutes = require('../routes/projectsDetailPage');
app.use('/api/projectsDetail', projectsDetailPageRoutes);
const projectCategoryPageRoutes = require('../routes/projectCategoryPage');
app.use('/api/projectCategories', projectCategoryPageRoutes);
const sponsorshipCategoryPageRoutes = require('./routes/sponsorshipCategoryPage.routes');
app.use('/api/sponsorship-category', sponsorshipCategoryPageRoutes);
app.use('/api/user-profile-page', userProfilePageRoutes);
// Add verification route
const verificationRoutes = require('../routes/verification');
app.use('/api', verificationRoutes);
const sadaqahCardRoutes = require('../routes/sadaqahCard');
app.use('/api/sadaqah', sadaqahCardRoutes);

// Register event registration route
app.use('/api/event-registration', eventRegistrationRoutes);

// API documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    message: 'API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      campaigns: '/api/campaigns',
      donations: '/api/donations',
      users: '/api/users',
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
      team: '/api/team',
      initiatives: '/api/initiatives'
    }
  });
});

// Base route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Ansar Humanitarian Relief API',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables from config file
// Database connection string
const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/ansar_db';

// Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// Start server
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});