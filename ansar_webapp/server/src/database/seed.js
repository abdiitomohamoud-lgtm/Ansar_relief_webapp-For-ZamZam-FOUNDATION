require('dotenv').config();
const connectDB = require('./connection');
const { 
  User, 
  Category, 
  Campaign, 
  Project, 
  Sponsorship, 
  Sadaqah, 
  Testimonial,
  Partner,
  News,
  Event,
  FAQ,
  Team,
  ContactPageContent,
  ContactUserInfo
} = require('../models');
const bcrypt = require('bcryptjs');

// Import seed data
const categoriesData = require('./seedData/categories');
const campaignsData = require('./seedData/campaigns');
const projectsData = require('./seedData/projects');
const sponsorshipsData = require('./seedData/sponsorships');
const sadaqahData = require('./seedData/sadaqah');
const testimonialsData = require('./seedData/testimonials');
const partnersData = require('./seedData/partners');
const newsData = require('./seedData/news');
const eventsData = require('./seedData/events');
const faqsData = require('./seedData/faqs');
const teamData = require('./seedData/team');
const contactPageContentData = require('./seedData/contactPageContent.json');


// Seed database
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearDatabase();
    
    console.log('Database cleared. Starting seed process...');
    
    // Create admin user
    const adminUser = await createAdminUser();

    // Create categories
    const categories = await Category.insertMany(categoriesData);
    console.log(`${categories.length} categories created`);

    // Create campaigns with category references
    const campaignsWithRefs = campaignsData.map(campaign => {
      const category = categories.find(c => c.slug === campaign.categorySlug);
      return {
        ...campaign,
        category: category._id,
        categorySlug: undefined
      };
    });

    const campaigns = await Campaign.insertMany(campaignsWithRefs);
    console.log(`${campaigns.length} campaigns created`);

    // Seed contact page content (single doc)
    await ContactPageContent.deleteMany({});
    await ContactPageContent.create(contactPageContentData);
    console.log('Contact page content seeded');
    
    // Create projects with category references
    const projectsWithRefs = projectsData.map(project => {
      const category = categories.find(c => c.slug === project.categorySlug);
      return {
        ...project,
        category: category._id,
        categorySlug: undefined
      };
    });
    
    const projects = await Project.insertMany(projectsWithRefs);
    console.log(`${projects.length} projects created`);
    
    // Create sponsorships
    const sponsorships = await Sponsorship.insertMany(sponsorshipsData);
    console.log(`${sponsorships.length} sponsorships created`);
    
    // Create sadaqah items with category references
    const sadaqahWithRefs = sadaqahData.map(sadaqah => {
      const category = categories.find(c => c.slug === sadaqah.categorySlug);
      return {
        ...sadaqah,
        category: category._id,
        categorySlug: undefined
      };
    });
    
    const sadaqahItems = await Sadaqah.insertMany(sadaqahWithRefs);
    console.log(`${sadaqahItems.length} sadaqah items created`);
    
    // Create testimonials
    const testimonials = await Testimonial.insertMany(testimonialsData);
    console.log(`${testimonials.length} testimonials created`);
    
    // Create partners
    const partners = await Partner.insertMany(partnersData);
    console.log(`${partners.length} partners created`);
    
    // Create news
    const news = await News.insertMany(newsData);
    console.log(`${news.length} news items created`);
    
    // Create events
    const events = await Event.insertMany(eventsData);
    console.log(`${events.length} events created`);
    
    // Create FAQs
    const faqs = await FAQ.insertMany(faqsData);
    console.log(`${faqs.length} FAQs created`);
    
    // Create team members
    const team = await Team.insertMany(teamData);
    console.log(`${team.length} team members created`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Clear database
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await Campaign.deleteMany({});
    await Project.deleteMany({});
    await Sponsorship.deleteMany({});
    await Sadaqah.deleteMany({});
    await Testimonial.deleteMany({});
    await Partner.deleteMany({});
    await News.deleteMany({});
    await Event.deleteMany({});
    await FAQ.deleteMany({});
    await Team.deleteMany({});
    
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ansarrelief.org',
      password: hashedPassword,
      isAdmin: true
    });
    
    console.log('Admin user created');
    return adminUser;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

// Run seed function
seedDatabase(); 