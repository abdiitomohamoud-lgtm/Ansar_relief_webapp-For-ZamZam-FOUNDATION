import React from 'react';

const Mission = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Mission</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Bringing Hope and Dignity to Communities in Need
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-lg mx-auto text-gray-500">
            <p className="text-xl font-semibold text-center">
              Our mission is to alleviate suffering, poverty, and injustice by providing humanitarian aid and
              sustainable development solutions that empower communities to achieve self-sufficiency and dignity.
            </p>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-primary-600 mb-4">Emergency Relief</h3>
                <p>
                  Providing immediate assistance to communities affected by natural disasters, conflicts, and 
                  humanitarian crises, including food, shelter, clean water, and medical care.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-primary-600 mb-4">Sustainable Development</h3>
                <p>
                  Implementing long-term programs that address the root causes of poverty and vulnerability, 
                  including education, healthcare, livelihood support, and infrastructure development.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-primary-600 mb-4">Advocacy & Awareness</h3>
                <p>
                  Raising awareness about humanitarian issues and advocating for policies that promote human 
                  dignity, social justice, and the well-being of marginalized communities.
                </p>
              </div>
            </div>
            
            <p className="mt-10">
              Through our mission-driven approach, we aim to create lasting change in communities around the world, 
              helping them become more resilient, self-sufficient, and prosperous. We believe that every person 
              deserves to live with dignity, security, and opportunity, regardless of their circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission; 