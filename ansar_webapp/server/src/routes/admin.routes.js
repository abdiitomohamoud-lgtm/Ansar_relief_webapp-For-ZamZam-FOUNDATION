const express = require('express');
const { protect, admin } = require('../middleware/auth.middleware');
const validate = require('../../middleware/validate');
const { createUserSchema, updateUserSchema } = require('../../validation/user.validation');
const { createCampaignSchema, updateCampaignSchema } = require('../../validation/campaign.validation');

// Import admin controllers
const adminUserController = require('../controllers/admin/user.controller');
const adminCampaignController = require('../controllers/admin/campaign.controller');
const adminDonationController = require('../controllers/admin/donation.controller');
const adminSponsorshipController = require('../controllers/admin/sponsorship.controller');
const adminProjectController = require('../controllers/admin/project.controller');
const adminSadaqahController = require('../controllers/admin/sadaqah.controller');
const adminMediaController = require('../controllers/admin/media.controller');
const adminTestimonialController = require('../controllers/admin/testimonial.controller');
const adminPartnerController = require('../controllers/admin/partner.controller');
const adminNewsController = require('../controllers/admin/news.controller');
const adminEventController = require('../controllers/admin/event.controller');
const adminFAQController = require('../controllers/admin/faq.controller');
const adminTeamController = require('../controllers/admin/team.controller');
const adminDashboardController = require('../controllers/admin/dashboard.controller');
const adminCategoryController = require('../controllers/admin/category.controller');

const router = express.Router();

// All routes are protected with admin middleware
router.use(protect);
router.use(admin);

/**
 * Dashboard routes
 */
router.get('/dashboard', adminDashboardController.getDashboardStats);

/**
 * User management routes
 */
router.get('/users', adminUserController.getUsers);
router.get('/users/:id', adminUserController.getUserById);
router.post('/users', validate(createUserSchema), adminUserController.createUser);
router.put('/users/:id', validate(updateUserSchema), adminUserController.updateUser);
router.delete('/users/:id', adminUserController.deleteUser);

/**
 * Campaign management routes
 */
router.get('/campaigns', adminCampaignController.getCampaigns);
router.get('/campaigns/:id', adminCampaignController.getCampaignById);
router.post('/campaigns', validate(createCampaignSchema), adminCampaignController.createCampaign);
router.put('/campaigns/:id', validate(updateCampaignSchema), adminCampaignController.updateCampaign);
router.delete('/campaigns/:id', adminCampaignController.deleteCampaign);

/**
 * Donation management routes
 */
router.get('/donations', adminDonationController.getDonations);
router.get('/donations/:id', adminDonationController.getDonationById);
router.put('/donations/:id', adminDonationController.updateDonation);
router.put('/donations/:id/status', adminDonationController.updateDonationStatus);
router.delete('/donations/:id', adminDonationController.deleteDonation);

/**
 * Sponsorship management routes
 */
router.get('/sponsorships', adminSponsorshipController.getSponsorships);
router.get('/sponsorships/:id', adminSponsorshipController.getSponsorshipById);
router.post('/sponsorships', adminSponsorshipController.createSponsorship);
router.put('/sponsorships/:id', adminSponsorshipController.updateSponsorship);
router.delete('/sponsorships/:id', adminSponsorshipController.deleteSponsorship);

/**
 * Project management routes
 */
router.get('/projects', adminProjectController.getProjects);
router.get('/projects/:id', adminProjectController.getProjectById);
router.post('/projects', adminProjectController.createProject);
router.put('/projects/:id', adminProjectController.updateProject);
router.delete('/projects/:id', adminProjectController.deleteProject);

/**
 * Sadaqah management routes
 */
router.get('/sadaqah', adminSadaqahController.getSadaqahItems);
router.get('/sadaqah/:id', adminSadaqahController.getSadaqahById);
router.post('/sadaqah', adminSadaqahController.createSadaqah);
router.put('/sadaqah/:id', adminSadaqahController.updateSadaqah);
router.delete('/sadaqah/:id', adminSadaqahController.deleteSadaqah);

/**
 * Media management routes
 */
router.get('/media', adminMediaController.getMediaItems);
router.get('/media/:id', adminMediaController.getMediaById);
router.post('/media', adminMediaController.uploadMedia);
router.put('/media/:id', adminMediaController.updateMedia);
router.delete('/media/:id', adminMediaController.deleteMedia);

/**
 * Testimonial management routes
 */
router.get('/testimonials', adminTestimonialController.getTestimonials);
router.get('/testimonials/:id', adminTestimonialController.getTestimonialById);
router.post('/testimonials', adminTestimonialController.createTestimonial);
router.put('/testimonials/:id', adminTestimonialController.updateTestimonial);
router.delete('/testimonials/:id', adminTestimonialController.deleteTestimonial);

/**
 * Partner management routes
 */
router.get('/partners', adminPartnerController.getPartners);
router.get('/partners/:id', adminPartnerController.getPartnerById);
router.post('/partners', adminPartnerController.createPartner);
router.put('/partners/:id', adminPartnerController.updatePartner);
router.delete('/partners/:id', adminPartnerController.deletePartner);

/**
 * News management routes
 */
router.get('/news', adminNewsController.getNewsItems);
router.get('/news/:id', adminNewsController.getNewsById);
router.post('/news', adminNewsController.createNews);
router.put('/news/:id', adminNewsController.updateNews);
router.delete('/news/:id', adminNewsController.deleteNews);

/**
 * Event management routes
 */
router.get('/events', adminEventController.getEvents);
router.get('/events/:id', adminEventController.getEventById);
router.post('/events', adminEventController.createEvent);
router.put('/events/:id', adminEventController.updateEvent);
router.delete('/events/:id', adminEventController.deleteEvent);

/**
 * FAQ management routes
 */
router.get('/faqs', adminFAQController.getFAQs);
router.get('/faqs/:id', adminFAQController.getFAQById);
router.post('/faqs', adminFAQController.createFAQ);
router.put('/faqs/:id', adminFAQController.updateFAQ);
router.delete('/faqs/:id', adminFAQController.deleteFAQ);

/**
 * Team management routes
 */
router.get('/team', adminTeamController.getTeamMembers);
router.get('/team/:id', adminTeamController.getTeamMemberById);
router.post('/team', adminTeamController.createTeamMember);
router.put('/team/:id', adminTeamController.updateTeamMember);
router.delete('/team/:id', adminTeamController.deleteTeamMember);

/**
 * Category management routes
 */
router.get('/categories', adminCategoryController.getCategories);
router.post('/categories', adminCategoryController.createCategory);
router.put('/categories/:id', adminCategoryController.updateCategory);
router.delete('/categories/:id', adminCategoryController.deleteCategory);

module.exports = router;