// Seed script for hero section
const mongoose = require('mongoose');
const Hero = require('../models/Hero');

const hero = {
  title: 'Our Initiatives & Programs',
  subtitle: 'Join us in making a lasting impact through sustainable development and community empowerment projects across the globe.',
  image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1500&q=80'
};

async function seedHero() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ansar_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await Hero.deleteMany({});
    await Hero.create(hero);
    console.log('Hero section seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedHero();
