import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaWater, FaUtensils, FaMosque, FaGraduationCap, FaHome, FaUserFriends, FaHandshake } from 'react-icons/fa';

const SadaqahCategories = () => {
  const categories = [
    {
      id: 'general',
      title: 'General Sadaqah',
      description: 'Make a general donation to support our various humanitarian projects.',
      icon: <FaHandHoldingHeart className="text-4xl" />,
      color: 'bg-blue-500'
    },
    {
      id: 'water',
      title: 'Water Sadaqah',
      description: 'Help provide clean water to communities in need.',
      icon: <FaWater className="text-4xl" />,
      color: 'bg-cyan-500'
    },
    {
      id: 'food',
      title: 'Food Sadaqah',
      description: 'Support food security programs and provide meals to those in need.',
      icon: <FaUtensils className="text-4xl" />,
      color: 'bg-orange-500'
    },
    {
      id: 'mosque',
      title: 'Mosque Sadaqah',
      description: 'Contribute to the construction and maintenance of mosques.',
      icon: <FaMosque className="text-4xl" />,
      color: 'bg-green-500'
    },
    {
      id: 'education',
      title: 'Education Sadaqah',
      description: 'Support educational initiatives and help students in need.',
      icon: <FaGraduationCap className="text-4xl" />,
      color: 'bg-purple-500'
    },
    {
      id: 'housing',
      title: 'Housing Sadaqah',
      description: 'Help provide shelter to families in need.',
      icon: <FaHome className="text-4xl" />,
      color: 'bg-red-500'
    },
    {
      id: 'orphans',
      title: 'Orphan Support',
      description: 'Support orphan care programs and education.',
      icon: <FaUserFriends className="text-4xl" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'community',
      title: 'Community Development',
      description: 'Support community development and social welfare programs.',
      icon: <FaHandshake className="text-4xl" />,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sadaqah Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/sadaqah/${category.id}`}
            className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`${category.color} p-6 text-white`}>
              <div className="flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h2 className="text-xl font-semibold text-center">{category.title}</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SadaqahCategories; 