import React from 'react';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';

const TeacherSponsorship = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-r from-green-600 to-green-400 py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <FaChalkboardTeacher className="text-white text-6xl" />
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Teacher Sponsorship Program
          </h1>
          <p className="text-green-100 text-lg text-center max-w-3xl mx-auto">
            Support dedicated educators in underprivileged communities to provide quality education to those who need it most.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
            <p className="mt-4 text-lg text-gray-600">
              We're currently working on bringing you more information about our Teacher Sponsorship program.
              Please check back later or visit our main Sponsorships page to explore other ways to help.
            </p>
            <Link
              to="/sponsorships"
              className="inline-flex items-center px-6 py-3 mt-8 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Back to Sponsorships <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherSponsorship; 