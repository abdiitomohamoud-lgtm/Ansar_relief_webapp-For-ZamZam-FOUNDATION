import React from 'react';

const Overview = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Overview</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            About Ansar Charity
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Providing humanitarian aid and sustainable development solutions to communities in need since 2010.
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-lg mx-auto text-gray-500">
            <p>
              Ansar Charity is a humanitarian organization dedicated to providing relief and sustainable development 
              solutions to communities facing poverty, conflict, and natural disasters around the world. Founded in 2010, 
              our organization has grown to serve thousands of beneficiaries across multiple countries.
            </p>
            
            <p className="mt-4">
              We work closely with local partners and communities to ensure that our programs are culturally appropriate, 
              effective, and sustainable. Our approach combines immediate relief with long-term development, helping 
              communities not only survive crises but build resilience for the future.
            </p>
            
            <p className="mt-4">
              Ansar Charity's work spans across multiple sectors including emergency relief, water and sanitation, 
              education, healthcare, orphan care, and economic empowerment. We believe in a holistic approach that 
              addresses the interconnected challenges faced by vulnerable communities.
            </p>
            
            <p className="mt-4">
              Transparency, accountability, and integrity are at the core of our operations. We ensure that donations 
              are used effectively and efficiently to create the greatest possible impact for those we serve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 