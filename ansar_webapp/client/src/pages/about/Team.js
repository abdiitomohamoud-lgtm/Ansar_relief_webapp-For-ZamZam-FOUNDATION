import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Ahmed Hassan',
      role: 'CEO & Founder',
      bio: 'With over 20 years of experience in humanitarian work, Ahmed founded Ansar Charity with a vision to create sustainable solutions for vulnerable communities.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Sara Khan',
      role: 'Chief Operations Officer',
      bio: 'Sara brings 15 years of nonprofit management experience, focusing on operational excellence and impact measurement in humanitarian programs.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Ibrahim Farooq',
      role: 'Director of Programs',
      bio: 'Ibrahim oversees all international programs, with a background in international development and expertise in emergency response coordination.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Chief Financial Officer',
      bio: 'Fatima manages the financial health of the organization, ensuring transparency, compliance, and effective resource allocation.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Yusuf Rahman',
      role: 'Director of Fundraising',
      bio: 'Yusuf leads all fundraising initiatives, building partnerships with donors and developing innovative fundraising strategies.',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Aisha Omar',
      role: 'Communications Director',
      bio: 'Aisha oversees all communications and marketing efforts, telling the stories of our impact and advocacy work around the world.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      social: {
        twitter: '#',
        linkedin: '#'
      }
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Team</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet the People Behind Our Mission
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our dedicated team brings diverse expertise and a shared commitment to making a difference.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((person, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex-shrink-0">
                  <img className="h-48 w-48 rounded-full object-cover" src={person.image} alt={person.name} />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                  <p className="text-sm font-medium text-primary-600">{person.role}</p>
                  <p className="mt-3 text-base text-gray-500">{person.bio}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a href={person.social.twitter} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href={person.social.linkedin} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Team</h3>
          <p className="text-gray-500">
            We're always looking for dedicated individuals who share our values and passion for humanitarian work.
            Check our careers page for current openings or send your resume to careers@ansarcharity.org.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team; 