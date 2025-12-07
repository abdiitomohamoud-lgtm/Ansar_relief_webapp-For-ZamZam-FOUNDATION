import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Import mock data
import projectsPageData from '../data/projectsPageData.json';

const Projects = () => {
  // Using mock data directly
  const projectCategories = projectsPageData.projectCategories || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectCategories.map((category) => (
            <Link 
              key={category.path}
              to={category.path}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-primary-600 mb-2">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
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

export default Projects;