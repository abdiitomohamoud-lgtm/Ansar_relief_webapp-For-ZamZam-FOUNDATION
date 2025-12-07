import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const raisedAmount = typeof project.raisedAmount === 'number' ? project.raisedAmount : 0;
  const targetAmount = typeof project.targetAmount === 'number' ? project.targetAmount : 0;
  const progress = targetAmount > 0 ? (raisedAmount / targetAmount) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaUsers />
            <span>{project.beneficiaries} Beneficiaries</span>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Raised</span>
              <span className="font-bold">${raisedAmount.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
              Target: ${targetAmount.toLocaleString()}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Link
              to={`/projects/${project.id}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              View Details
            </Link>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;