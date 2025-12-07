import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const tabs = [
    { name: 'Overview', href: '/about', current: path === '/about' },
    { name: 'Mission', href: '/about/mission', current: path === '/about/mission' },
    { name: 'Vision', href: '/about/vision', current: path === '/about/vision' },
    { name: 'Values', href: '/about/values', current: path === '/about/values' },
    { name: 'Team', href: '/about/team', current: path === '/about/team' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <div className="relative bg-primary-700 py-16">
        <div className="absolute inset-0 pattern2 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
            Learn more about Ansar Charity's mission, vision, values, and the team making a difference.
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${tab.current
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>

      {/* Call to action */}
      <section className="bg-primary-700 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to make a difference?</span>
              <span className="block text-primary-200">Join us in our mission today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                >
                  Donate Now
                </Link>
              </div>
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/volunteer"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-800 hover:bg-primary-900"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 