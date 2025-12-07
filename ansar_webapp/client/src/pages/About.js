import React from 'react';
import { FaUsers, FaGlobe, FaHandHoldingHeart, FaHistory, FaCheck } from 'react-icons/fa';

// Import mock data
import aboutPageData from '../data/aboutPageData.json';

const About = () => {
  // Using mock data for all content
  const storyParagraphs = aboutPageData.story.paragraphs || [
    "Ansar Relief was founded in 2010 with a simple mission: to provide immediate humanitarian assistance to communities affected by crises and to implement sustainable development projects that create lasting change.",
    "What began as a small group of dedicated volunteers has grown into an international organization with operations in over 30 countries, touching the lives of millions of people in need.",
    "Our name 'Ansar' is derived from the Arabic word meaning 'helpers' or 'supporters' - reflecting our commitment to stand by those in need regardless of race, religion, or nationality.",
    "Today, we work tirelessly to respond to humanitarian emergencies, fight poverty, improve access to education and healthcare, and create sustainable solutions for communities worldwide."
  ];
  
  const values = aboutPageData.values || [
    {
      icon: 'FaHandHoldingHeart',
      title: 'Compassion',
      description: 'We act with empathy and care, recognizing the dignity and humanity of those we serve.'
    },
    {
      icon: 'FaCheck',
      title: 'Integrity',
      description: 'We maintain high ethical standards, transparency, and accountability in all our operations.'
    },
    {
      icon: 'FaGlobe',
      title: 'Inclusivity',
      description: 'We serve all people regardless of race, religion, nationality, or background.'
    }
  ];
  
  const teamMembers = aboutPageData.team.members || [
    {
      name: 'Ahmed Al-Mansour',
      title: 'Executive Director',
      image: '/images/team/ahmed.jpg',
      bio: '15+ years in humanitarian work with extensive experience in emergency response.',
    },
    {
      name: 'Sarah Johnson',
      title: 'Operations Director',
      image: '/images/team/sarah.jpg',
      bio: 'Former UNHCR leader with expertise in logistics and field operations.',
    },
    {
      name: 'Dr. Fatima Khalid',
      title: 'Programs Director',
      image: '/images/team/fatima.jpg',
      bio: 'Public health expert with a focus on sustainable development programs.',
    },
    {
      name: 'Michael Chen',
      title: 'Partnerships Director',
      image: '/images/team/michael.jpg',
      bio: 'Specialist in building cross-sector partnerships for humanitarian impact.',
    },
  ];
  
  const impactStats = aboutPageData.impactStats || [
    { label: "Countries", value: "35+" },
    { label: "Lives Impacted", value: "3M+" },
    { label: "Projects Completed", value: "550+" },
    { label: "Volunteers", value: "10K+" }
  ];
  
  const ctaActions = aboutPageData.cta.actions || [
    { label: 'Donate Now', link: '/donate' },
    { label: 'Become a Volunteer', link: '/volunteer' }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary-700 py-16 md:py-24">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {aboutPageData.hero?.title || 'About Ansar Relief'}
          </h1>
          <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
            {aboutPageData.hero?.subtitle || 'A humanitarian organization dedicated to providing aid and sustainable development to communities in need.'}
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutPageData.story?.title || 'Our Story'}</h2>
              <div className="text-lg text-gray-700 space-y-4">
                {storyParagraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8">
                <a href="/mission" className="text-primary-600 hover:text-primary-800 font-medium">
                  Read our full mission statement →
                </a>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <img 
                src="/images/about/our-story.jpg" 
                alt="Ansar Relief volunteers in the field" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              These principles guide everything we do and every decision we make.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              // Dynamically render icons based on the icon name
              const IconComponent = {
                'FaHandHoldingHeart': FaHandHoldingHeart,
                'FaCheck': FaCheck,
                'FaGlobe': FaGlobe
              }[value.icon] || FaHandHoldingHeart;
              
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-primary-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-700">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Dedicated professionals committed to making a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-56 object-cover object-center"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Team+Member';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 mb-2">{member.role || member.title}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="/team" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
              Meet Our Full Team
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-4 text-lg text-primary-100 max-w-3xl mx-auto">
              Together with our donors and partners, we've made a significant difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Whether you donate, volunteer, or spread the word, you can help us create a more just and compassionate world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {ctaActions.map((action, index) => (
              <a 
                key={index}
                href={action.link} 
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${action.type === 'secondary' ? 'text-primary-600 bg-white border-primary-600 hover:bg-gray-50' : 'text-white bg-primary-600 hover:bg-primary-700'}`}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 