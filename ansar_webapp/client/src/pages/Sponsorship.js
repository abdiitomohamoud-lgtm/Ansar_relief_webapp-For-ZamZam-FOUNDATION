import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Import mock data
import sponsorshipPageData from '../data/sponsorshipPageData.json';

const Sponsorship = () => {
  // Using mock data directly
  const sponsorshipTypes = sponsorshipPageData.sponsorshipTypes || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Sponsorship Programs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorshipTypes.map((type) => (
            <Link 
              key={type.path}
              to={type.path}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-primary-600 mb-2">{type.name}</h2>
              <p className="text-gray-600">{type.description}</p>
            </Link>
          ))}
        </div>
        
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default Sponsorship;