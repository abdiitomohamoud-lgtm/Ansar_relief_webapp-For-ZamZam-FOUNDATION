// Seed script for testimonials
require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');
const Testimonial = require('../models/testimonial.model');
const data = require('../database/seedData/testimonials.json');

async function seedTestimonials() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(data);
    console.log('Testimonials seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedTestimonials();
