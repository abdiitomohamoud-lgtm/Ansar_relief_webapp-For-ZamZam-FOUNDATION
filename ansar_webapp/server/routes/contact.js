const express = require('express');
const router = express.Router();

// Example: Replace with actual DB query
const contactPageData = {
  details: {
    email: 'info@ansar.org',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    hours: 'Mon-Fri 9am-5pm',
  },
  location: { lat: 40.7128, lng: -74.0060 },
  faqs: [],
  branches: [],
  social: [],
  testimonials: [],
};

router.get('/contact-us-data', async (req, res) => {
  // TODO: Fetch from MongoDB (ansar_db_2025, collection: contact_us_data)
  res.json(contactPageData);
});

module.exports = router;
