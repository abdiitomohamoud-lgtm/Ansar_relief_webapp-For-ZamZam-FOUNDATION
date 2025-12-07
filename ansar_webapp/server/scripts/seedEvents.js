// events.seed.js
// Node.js script to seed the events collection in ansar_db_2025

const mongoose = require('mongoose');
const Event = require('../src/models/event.model');

function makeSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function makeStartDate(date, time) {
  // date: '2023-11-15', time: '18:00 - 22:00' => '2023-11-15T18:00:00Z'
  const hour = time.split(' - ')[0];
  return new Date(`${date}T${hour}:00Z`);
}

const events = [
  {
    id: 1,
    title: 'Annual Charity Gala',
    slug: makeSlug('Annual Charity Gala'),
    startDate: makeStartDate('2023-11-15', '18:00 - 22:00'),
    date: '2023-11-15',
    time: '18:00 - 22:00',
    location: 'Grand Ballroom, Qatar Convention Center',
    category: 'gala',
    description: 'Join us for an elegant evening of dinner, entertainment, and fundraising to support our humanitarian projects worldwide.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    capacity: 300,
    registered: 187,
    featured: true
  },
  {
    id: 2,
    title: 'Volunteer Training Workshop',
    slug: makeSlug('Volunteer Training Workshop'),
    startDate: makeStartDate('2023-11-20', '10:00 - 14:00'),
    date: '2023-11-20',
    time: '10:00 - 14:00',
    location: 'Ansar Community Center, Doha',
    category: 'workshop',
    description: 'A comprehensive training session for new volunteers covering our mission, projects, and ways to contribute effectively.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    capacity: 50,
    registered: 32,
    featured: false
  },
  {
    id: 3,
    title: 'Humanitarian Aid Conference',
    slug: makeSlug('Humanitarian Aid Conference'),
    startDate: makeStartDate('2023-12-05', '09:00 - 17:00'),
    date: '2023-12-05',
    time: '09:00 - 17:00',
    location: 'Qatar National Convention Centre',
    category: 'conference',
    description: 'An international conference discussing current challenges and innovative solutions in humanitarian aid delivery.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    capacity: 500,
    registered: 312,
    featured: true
  },
  {
    id: 4,
    title: 'Charity Run for Children',
    slug: makeSlug('Charity Run for Children'),
    startDate: makeStartDate('2023-12-10', '07:00 - 10:00'),
    date: '2023-12-10',
    time: '07:00 - 10:00',
    location: 'Aspire Park, Doha',
    category: 'fundraiser',
    description: 'A family-friendly 5K run/walk to raise funds for children\'s education programs in underserved communities.',
    image: 'https://images.unsplash.com/photo-1533560904424-a0c61c4aae5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    capacity: 1000,
    registered: 684,
    featured: true
  },
  {
    id: 5,
    title: 'Community Iftar',
    slug: makeSlug('Community Iftar'),
    startDate: makeStartDate('2024-03-15', '18:30 - 20:30'),
    date: '2024-03-15',
    time: '18:30 - 20:30',
    location: 'Various Locations in Qatar',
    category: 'community',
    description: 'Join us for a community iftar during Ramadan as we bring together people from all walks of life to break fast together.',
    image: 'https://images.unsplash.com/photo-1616077167239-4252e2c0cf99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    capacity: 200,
    registered: 120,
    featured: false
  },
  {
    id: 6,
    title: 'Water Project Fundraiser',
    slug: makeSlug('Water Project Fundraiser'),
    startDate: makeStartDate('2024-01-20', '19:00 - 21:00'),
    date: '2024-01-20',
    time: '19:00 - 21:00',
    location: 'Online Event',
    category: 'fundraiser',
    description: 'A virtual fundraising event to support our clean water initiatives in drought-affected regions.',
    image: 'https://images.unsplash.com/photo-1616832880446-63a8541b2571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    capacity: null,
    registered: 342,
    featured: false
  }
];

// Calculate dynamic stats counts for seeding
const totalEventsCount = events.length;
const featuredEventsCount = events.filter(e => e.featured).length;

const pageContent = {
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    badge: 'Join us in creating positive change',
    heading: 'Make an Impact at Our Events',
    description: "Join our community events to connect, contribute, and create meaningful change together. From fundraisers to workshops, there's a way for everyone to get involved.",
    buttons: [
      { label: 'Explore Upcoming Events', action: 'upcoming' },
      { label: 'Become a Volunteer', action: '/volunteer' }
    ],
    stats: [
      { label: 'Total Events', icon: 'FaCalendarAlt', count: totalEventsCount },
      { label: 'Featured Events', icon: 'FaRegStar', count: featuredEventsCount },
      { label: 'Volunteering Opportunities', icon: 'FaHandsHelping', count: '40+' }
    ]
  },
  filter: {
    heading: 'Find Your Perfect Event',
    description: 'Explore our diverse range of events designed to create positive impact and foster community engagement.',
    filters: [
      { id: 'all', label: 'All', icon: 'FaCalendarAlt' },
      { id: 'upcoming', label: 'Upcoming', icon: 'FaCalendarAlt' },
      { id: 'gala', label: 'Galas', icon: 'FaGlassMartiniAlt' },
      { id: 'workshop', label: 'Workshops', icon: 'FaUsers' },
      { id: 'fundraiser', label: 'Fundraisers', icon: 'FaHandHoldingHeart' },
      { id: 'conference', label: 'Conferences', icon: 'FaMicrophone' },
      { id: 'community', label: 'Community', icon: 'FaHandsHelping' }
    ],
    notice: {
      title: 'Upcoming Events Notice',
      description: 'Due to COVID-19 guidelines, some events may have limited capacity or additional safety measures in place. Virtual participation options are available for select events.'
    }
  },
  featuredSection: {
    heading: 'Featured Events',
    description: "Special events that you don't want to miss",
    badge: 'Featured',
    registerButton: 'Register Now'
  },
  allEvents: {
    heading: 'All Events',
    description: 'Browse all our upcoming events and activities',
    soonRibbon: 'Soon',
    registeredLabel: 'registered',
    spotsLeftLabel: 'spots left'
  },
  newsletter: {
    badge: 'Stay Connected',
    heading: 'Stay Updated on Upcoming Events',
    description: 'Subscribe to our newsletter to receive notifications about new events, volunteer opportunities, and ways to make an impact.',
    inputPlaceholder: 'Your email address',
    subscribeButton: 'Subscribe',
    privacyNote: 'We respect your privacy. Unsubscribe at any time.'
  },
  gallery: {
    heading: 'Event Gallery',
    description: 'Moments captured from our previous events',
    images: [
      'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563863242679-325da3a7bc27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    captions: [
      'From our Gala event',
      'From our Workshop event',
      'From our Fundraiser event',
      'From our Conference event',
      'From our Community Iftar event',
      'From our Charity Run event',
      'From our Medical Camp event',
      'From our Education Program event'
    ]
  }
};

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/ansar_db_2025');
  await Event.deleteMany({});
  await Event.insertMany(events);
  // Insert page-level content as a single document with type: 'pageContent'
  await Event.create({ type: 'pageContent', ...pageContent });
  console.log('Seeded events collection successfully.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
