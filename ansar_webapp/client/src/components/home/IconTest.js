import React from 'react';
import { 
  FaWater, 
  FaBreadSlice, 
  FaBook, 
  FaHands, 
  FaHome, 
  FaHeart, 
  FaMosque, 
  FaHandHoldingHeart,
  FaCoffee
} from 'react-icons/fa';

const IconTest = () => {
  return (
    <div className="bg-white py-8 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Icon Test Component</h2>
        <p className="mb-6 text-gray-600">This is a dedicated component to test Font Awesome icons rendering</p>
        
        <div className="grid grid-cols-3 md:grid-cols-9 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <FaWater size={40} color="#3B82F6" />
            <span className="mt-2">Water</span>
          </div>
          <div className="flex flex-col items-center">
            <FaBreadSlice size={40} color="#F59E0B" />
            <span className="mt-2">Food</span>
          </div>
          <div className="flex flex-col items-center">
            <FaBook size={40} color="#10B981" />
            <span className="mt-2">Book</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHands size={40} color="#8B5CF6" />
            <span className="mt-2">Hands</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHome size={40} color="#EC4899" />
            <span className="mt-2">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHeart size={40} color="#EF4444" />
            <span className="mt-2">Heart</span>
          </div>
          <div className="flex flex-col items-center">
            <FaMosque size={40} color="#14B8A6" />
            <span className="mt-2">Mosque</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHandHoldingHeart size={40} color="#6366F1" />
            <span className="mt-2">Charity</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCoffee size={40} color="#D97706" />
            <span className="mt-2">Coffee</span>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-100 p-6 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Debugging Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-bold mb-2">FaWater Type:</p>
              <p className="text-gray-600 text-sm overflow-auto">{typeof FaWater}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-bold mb-2">FaWater Name:</p>
              <p className="text-gray-600 text-sm overflow-auto">{FaWater.name || "No name"}</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <p className="font-bold mb-2">Icon Keys:</p>
              <p className="text-gray-600 text-sm overflow-auto">
                {Object.keys(FaWater).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconTest; 