import React, { useCallback } from 'react';
import { FaRegClock, FaRegCalendar } from 'react-icons/fa';
import { donationCategories, subcategoryIcons, donationTypeOptions, frequencyOptions } from '../donationData';

const DonationCategoryStep = ({
  donationType,
  setDonationType,
  periodicType,
  setPeriodicType,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  errors
}) => {
  const handleCategorySelect = useCallback((categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubcategory(null); // Reset subcategory when changing category
  }, [setSelectedCategory, setSelectedSubcategory]);

  const handlePeriodicTypeSelect = useCallback((periodType) => {
    const formattedId = periodType.toLowerCase().replace(/\s+/g, '-');
    setPeriodicType(formattedId);
  }, [setPeriodicType]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {donationTypeOptions.map((type) => (
          <button
            key={type.id}
            onClick={() => setDonationType(type.id)}
            aria-pressed={donationType === type.id}
            className={`p-3 rounded border transition-all ${
              donationType === type.id
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                donationType === type.id
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {type.id === 'one-time' ? <FaRegClock className="text-sm" /> : <FaRegCalendar className="text-sm" />}
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-gray-900 block">{type.name}</span>
                <span className="text-xs text-gray-500 block">{type.description}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {donationType === 'periodic' && (
        <div className="p-3 bg-gray-50 rounded border border-gray-200">
          <h5 className="text-sm font-semibold text-gray-800 mb-2">Select Frequency</h5>
          <div className="grid grid-cols-3 gap-2">
            {frequencyOptions.map((period) => {
              const formattedId = period.toLowerCase().replace(/\s+/g, '-');
              return (
                <button
                  key={period}
                  onClick={() => handlePeriodicTypeSelect(period)}
                  aria-pressed={periodicType === formattedId}
                  className={`p-2 rounded border transition-all text-xs ${
                    periodicType === formattedId
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                      : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                  }`}
                >
                  {period}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold text-gray-900">Select Category</h4>
          {errors.category && (
            <span className="text-xs text-red-500">{errors.category}</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(donationCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => handleCategorySelect(key)}
              aria-pressed={selectedCategory === key}
              className={`p-3 rounded border transition-all ${
                selectedCategory === key
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                  selectedCategory === key 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-900 text-left leading-tight">{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <h5 className="text-sm font-semibold text-gray-800 mb-2">Select Subcategory</h5>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-1">
              {donationCategories[selectedCategory].subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  aria-pressed={selectedSubcategory === sub}
                  className={`p-2.5 rounded transition-all ${
                    selectedSubcategory === sub
                      ? 'bg-primary-50 border border-primary-300 shadow-sm'
                      : 'border border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                      selectedSubcategory === sub
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {subcategoryIcons[sub] || donationCategories[selectedCategory].icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCategoryStep; 