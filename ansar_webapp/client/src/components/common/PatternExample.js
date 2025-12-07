import React from 'react';
import { Pattern, PatternBackground, PatternImage } from './Patterns';

/**
 * An example component showing different ways to use the pattern components
 */
const PatternExample = () => {
  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pattern Components Examples</h2>
      
      {/* SVG Pattern Examples */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">SVG Pattern Component</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Islamic Pattern */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Islamic Pattern</h4>
            <p className="text-gray-600 mb-4 relative z-10">SVG-based pattern with hover effect</p>
            <Pattern 
              type="islamic" 
              opacity={0.1} 
              color="var(--primary-600)" 
              hoverEffect={true}
              className="absolute inset-0 -z-0"
            />
          </div>
          
          {/* Islamic Star Pattern */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Islamic Star</h4>
            <p className="text-gray-600 mb-4 relative z-10">SVG-based star pattern with animation</p>
            <Pattern 
              type="islamic-star" 
              opacity={0.15} 
              color="var(--primary-600)" 
              animate={true}
              className="absolute inset-0 -z-0"
            />
          </div>
          
          {/* Arabesque Pattern */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Arabesque Pattern</h4>
            <p className="text-gray-600 mb-4 relative z-10">SVG-based arabesque pattern</p>
            <Pattern 
              type="arabesque" 
              opacity={0.1} 
              color="var(--primary-600)" 
              className="absolute inset-0 -z-0"
            />
          </div>
        </div>
      </section>
      
      {/* CSS Background Pattern Examples */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">CSS Background Pattern</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Islamic Pattern Background */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Islamic Background</h4>
            <p className="text-gray-600 mb-4 relative z-10">CSS-based pattern background</p>
            <PatternBackground 
              type="islamic" 
              opacity={0.1} 
              color="var(--primary-600)" 
              inset="inset-0" 
              zIndex="z-0"
            />
          </div>
          
          {/* Moroccan Pattern Background */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Moroccan Pattern</h4>
            <p className="text-gray-600 mb-4 relative z-10">CSS-based moroccan pattern</p>
            <PatternBackground 
              type="moroccan" 
              opacity={0.1} 
              color="var(--primary-600)" 
              inset="inset-0" 
              zIndex="z-0"
            />
          </div>
          
          {/* Ottoman Pattern Background */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Ottoman Pattern</h4>
            <p className="text-gray-600 mb-4 relative z-10">CSS-based ottoman pattern</p>
            <PatternBackground 
              type="ottoman" 
              opacity={0.1} 
              color="var(--primary-600)" 
              inset="inset-0" 
              zIndex="z-0"
            />
          </div>
        </div>
      </section>
      
      {/* Pattern Image Examples */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Pattern Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pattern Image Example */}
          <div className="p-6 border border-gray-200 rounded-lg relative overflow-hidden h-64">
            <h4 className="text-lg font-medium text-gray-700 mb-2 relative z-10">Pattern from Image</h4>
            <p className="text-gray-600 mb-4 relative z-10">Image-based pattern with hover effect</p>
            <PatternImage 
              src="/images/patterns/custom-pattern.jpg" 
              alt="Custom pattern"
              opacity={0.08} 
              hoverEffect={true}
              inset="inset-0" 
              zIndex="z-0"
            />
          </div>
        </div>
      </section>
      
      {/* Usage Examples */}
      <section className="mt-12 p-6 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Usage in Components</h3>
        <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
{`// Using the SVG Pattern component
<div className="relative">
  <h2>Your Content</h2>
  <Pattern 
    type="islamic" 
    opacity={0.1} 
    color="var(--primary-600)" 
    className="absolute inset-0 z-0"
  />
</div>

// Using the CSS Background pattern 
<div className="relative">
  <h2>Your Content</h2>
  <PatternBackground 
    type="moroccan" 
    opacity={0.1} 
    color="var(--primary-600)" 
  />
</div>

// Using the Pattern Image
<div className="relative">
  <h2>Your Content</h2>
  <PatternImage 
    src="/images/patterns/custom-pattern.jpg" 
    opacity={0.1} 
    hoverEffect={true}
  />
</div>`}
        </pre>
      </section>
    </div>
  );
};

export default PatternExample; 