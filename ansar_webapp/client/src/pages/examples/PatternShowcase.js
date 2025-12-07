import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../components/common/SectionHeading';
import PatternBackground from '../../components/common/PatternBackground';

const PatternShowcase = () => {
  const [selectedPattern, setSelectedPattern] = useState('islamic');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [opacity, setOpacity] = useState(0.05);
  const [animate, setAnimate] = useState(true);
  
  const patterns = [
    'islamic', 'arabesque', 'geometric', 'floral',
    'mosaic', 'stars', 'hexagon', 'dots', 'grid'
  ];
  
  const colors = [
    'primary', 'blue', 'indigo', 'purple', 'cyan',
    'green', 'emerald', 'red', 'pink', 'orange',
    'amber', 'yellow', 'gray'
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <SectionHeading 
          title="Pattern Showcase" 
          subtitle="Explore our collection of Islamic and geometric patterns" 
          tag="Components"
          tagColor="blue"
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pattern Controls
            </h3>
            
            {/* Pattern Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Pattern
              </label>
              <div className="grid grid-cols-3 gap-2">
                {patterns.map(pattern => (
                  <button
                    key={pattern}
                    onClick={() => setSelectedPattern(pattern)}
                    className={`px-3 py-2 text-xs rounded transition-all ${
                      selectedPattern === pattern
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Color
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full h-8 rounded-md border-2 transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-primary-500'
                        : ''
                    }`}
                    style={{ backgroundColor: `var(--color-${color}-500)` }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
            
            {/* Opacity Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opacity: {opacity}
              </label>
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            
            {/* Animation Toggle */}
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer mr-3">
                <input
                  type="checkbox"
                  checked={animate}
                  onChange={() => setAnimate(!animate)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Animation
              </span>
            </div>
          </div>
          
          {/* Pattern Preview */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-96 relative overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative z-10">
                Pattern Preview: {selectedPattern}
              </h3>
              
              <PatternBackground
                pattern={selectedPattern}
                color={selectedColor}
                opacity={opacity}
                animate={animate}
                className="pattern-showcase"
              />
              
              <div className="relative z-10 mt-4">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Current Configuration:
                  </h4>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto">
{`<PatternBackground
  pattern="${selectedPattern}"
  color="${selectedColor}"
  opacity={${opacity}}
  animate={${animate}}
/>`}
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Pattern Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {patterns.slice(0, 6).map((pattern, index) => (
                <motion.div
                  key={pattern}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-32 relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <PatternBackground
                    pattern={pattern}
                    color={selectedColor}
                    opacity={opacity}
                    animate={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full">
                      {pattern}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternShowcase; 