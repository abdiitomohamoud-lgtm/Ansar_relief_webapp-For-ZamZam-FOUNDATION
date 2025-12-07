const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for news
 */
module.exports = [
  {
    id: uuidv4(),
    title: 'Emergency Response to Earthquake in Turkey and Syria',
    slug: 'emergency-response-earthquake-turkey-syria',
    content: `
      <h2>Our Emergency Response to the Devastating Earthquake</h2>
      
      <p>In the wake of the catastrophic earthquake that struck Turkey and Syria earlier this month, our organization has mobilized an immediate emergency response to provide critical aid to affected communities.</p>
      
      <h3>The Scale of the Disaster</h3>
      
      <p>The 7.8 magnitude earthquake and its aftershocks have caused widespread destruction across southeastern Turkey and northern Syria. Thousands of lives have been lost, countless more injured, and tens of thousands of people have been left homeless in freezing winter conditions.</p>
      
      <h3>Our Response</h3>
      
      <p>Within 48 hours of the disaster, our emergency response team was on the ground, working with local partners to:</p>
      
      <ul>
        <li>Distribute emergency shelter kits to families who lost their homes</li>
        <li>Provide warm blankets, winter clothing, and heating supplies</li>
        <li>Deliver food packages and clean drinking water</li>
        <li>Support search and rescue operations</li>
        <li>Offer first aid and emergency medical assistance</li>
      </ul>
      
      <h3>Ongoing Support</h3>
      
      <p>As the immediate rescue phase transitions to recovery, we are expanding our efforts to include:</p>
      
      <ul>
        <li>Temporary housing solutions for displaced families</li>
        <li>Psychosocial support for trauma survivors, especially children</li>
        <li>Medical care for the injured and those with chronic conditions</li>
        <li>Distribution of hygiene kits to prevent disease outbreaks</li>
      </ul>
      
      <h3>How You Can Help</h3>
      
      <p>The needs in Turkey and Syria are immense and will continue for months to come. Your support is crucial in helping affected communities recover and rebuild. Please consider donating to our Earthquake Emergency Appeal.</p>
      
      <p>Every contribution, no matter the size, makes a difference in providing life-saving assistance to those who have lost everything.</p>
    `,
    excerpt: 'Our organization has launched an emergency response to provide critical aid to communities affected by the devastating earthquake in Turkey and Syria.',
    image: '/images/news/earthquake-relief.jpg',
    publishDate: new Date('2024-02-15'),
    isPublished: true,
    isFeatured: true,
    author: 'Ahmed Khalid',
    tags: ['emergency', 'earthquake', 'turkey', 'syria', 'humanitarian aid']
  },
  {
    id: uuidv4(),
    title: 'New Education Initiative Launches in Rural Communities',
    slug: 'new-education-initiative-rural-communities',
    content: `
      <h2>Launching Our New Education Initiative</h2>
      
      <p>We are excited to announce the launch of our comprehensive education initiative aimed at improving access to quality education in underserved rural communities.</p>
      
      <h3>Addressing Educational Disparities</h3>
      
      <p>Educational opportunities remain significantly limited in many rural areas, with children facing challenges such as long distances to schools, inadequate facilities, and shortage of qualified teachers. This initiative aims to address these disparities and ensure that every child has access to quality education.</p>
      
      <h3>Key Components of the Initiative</h3>
      
      <p>Our education initiative includes several integrated components:</p>
      
      <ul>
        <li><strong>School Infrastructure:</strong> Building and renovating classrooms, libraries, and sanitation facilities in 15 rural schools</li>
        <li><strong>Teacher Training:</strong> Providing professional development for 100 teachers to enhance teaching quality</li>
        <li><strong>Learning Resources:</strong> Supplying textbooks, educational materials, and establishing digital learning centers</li>
        <li><strong>Scholarship Program:</strong> Supporting 500 children from the most vulnerable families to continue their education</li>
        <li><strong>Community Engagement:</strong> Working with parents and community leaders to promote the value of education</li>
      </ul>
      
      <h3>Expected Impact</h3>
      
      <p>Over the next three years, this initiative is expected to benefit:</p>
      
      <ul>
        <li>5,000 students through improved school infrastructure</li>
        <li>100 teachers through enhanced teaching skills</li>
        <li>15 schools through comprehensive support</li>
        <li>Entire communities through increased educational opportunities</li>
      </ul>
      
      <h3>Partnerships</h3>
      
      <p>This initiative is being implemented in partnership with local education authorities, community organizations, and with the generous support of our donors and institutional partners.</p>
      
      <p>We believe that education is the most powerful tool for breaking the cycle of poverty and creating opportunities for a better future. Through this initiative, we are investing in the potential of thousands of children and the future of their communities.</p>
    `,
    excerpt: 'We have launched a comprehensive education initiative to improve access to quality education in underserved rural communities.',
    image: '/images/news/education-initiative.jpg',
    publishDate: new Date('2024-01-20'),
    isPublished: true,
    isFeatured: true,
    author: 'Sarah Johnson',
    tags: ['education', 'rural development', 'schools', 'children']
  },
  {
    id: uuidv4(),
    title: 'Medical Center Opens to Serve Refugee Community',
    slug: 'medical-center-opens-refugee-community',
    content: `
      <h2>New Medical Center Opens Its Doors</h2>
      
      <p>We are pleased to announce the opening of a new medical center dedicated to serving the healthcare needs of refugee communities in the eastern region.</p>
      
      <h3>Addressing Critical Healthcare Needs</h3>
      
      <p>Refugees often face significant barriers to accessing healthcare, including language barriers, lack of documentation, financial constraints, and unfamiliarity with local healthcare systems. Our new medical center aims to address these challenges by providing accessible, culturally sensitive healthcare services.</p>
      
      <h3>Services Offered</h3>
      
      <p>The medical center will provide a comprehensive range of services, including:</p>
      
      <ul>
        <li>Primary healthcare consultations</li>
        <li>Maternal and child health services</li>
        <li>Vaccinations and preventive care</li>
        <li>Treatment for chronic diseases</li>
        <li>Mental health support and counseling</li>
        <li>Health education and awareness programs</li>
        <li>Referrals to specialized care when needed</li>
      </ul>
      
      <h3>Staffing and Approach</h3>
      
      <p>The center is staffed by qualified healthcare professionals, including doctors, nurses, midwives, and counselors, many of whom speak the languages of the refugee communities they serve. The center adopts a holistic approach to healthcare, addressing not only physical health but also mental and social well-being.</p>
      
      <h3>Impact and Reach</h3>
      
      <p>The medical center is expected to serve approximately 10,000 refugees annually, significantly improving their access to essential healthcare services. By providing timely and appropriate care, the center will help prevent serious health complications, reduce emergency hospital visits, and improve overall health outcomes in the refugee community.</p>
      
      <h3>Acknowledgments</h3>
      
      <p>This initiative has been made possible through the generous support of our donors, partners, and the dedication of our healthcare professionals. We also extend our gratitude to the local authorities for their cooperation and support.</p>
      
      <p>We remain committed to ensuring that vulnerable populations, including refugees, have access to the healthcare they need to lead healthy and dignified lives.</p>
    `,
    excerpt: 'We have opened a new medical center to provide accessible healthcare services to refugee communities in the eastern region.',
    image: '/images/news/medical-center.jpg',
    publishDate: new Date('2024-03-05'),
    isPublished: true,
    isFeatured: true,
    author: 'Dr. Mohammed Abbas',
    tags: ['healthcare', 'refugees', 'medical center', 'community health']
  },
  {
    id: uuidv4(),
    title: 'Annual Charity Gala Raises Record Funds for Humanitarian Projects',
    slug: 'annual-charity-gala-record-funds',
    content: `
      <h2>Record-Breaking Fundraising at Annual Charity Gala</h2>
      
      <p>Our Annual Charity Gala, held last weekend, was a tremendous success, raising a record $1.2 million for our humanitarian projects worldwide.</p>
      
      <h3>A Night of Generosity</h3>
      
      <p>The elegant event, attended by over 300 supporters, donors, and partners, featured inspiring speeches, moving testimonials from beneficiaries, and a silent auction that generated significant funds. The highlight of the evening was the live pledge drive, which alone raised over $500,000.</p>
      
      <h3>Impact of Funds Raised</h3>
      
      <p>The funds raised at the gala will support several critical initiatives:</p>
      
      <ul>
        <li>Construction of five water wells in drought-affected communities</li>
        <li>Expansion of our orphan sponsorship program to support an additional 200 children</li>
        <li>Medical equipment for three healthcare facilities in underserved areas</li>
        <li>Emergency food packages for 1,000 families facing acute food insecurity</li>
        <li>Vocational training programs for youth and women in refugee camps</li>
      </ul>
      
      <h3>Recognition of Supporters</h3>
      
      <p>We extend our heartfelt gratitude to all attendees, sponsors, volunteers, and donors who made this event a success. Special recognition goes to our platinum sponsors, whose generous contributions were instrumental in achieving this fundraising milestone.</p>
      
      <h3>Looking Forward</h3>
      
      <p>The overwhelming support demonstrated at the gala reinforces our commitment to expanding our humanitarian efforts and reaching even more vulnerable communities. We look forward to sharing updates on the projects funded through this event and the impact they create in the lives of those we serve.</p>
      
      <p>For those who couldn't attend but wish to contribute, donations can still be made through our website. Every contribution helps us extend our reach and deepen our impact in communities facing humanitarian challenges.</p>
    `,
    excerpt: 'Our Annual Charity Gala raised a record $1.2 million to support water, education, healthcare, and food security projects for vulnerable communities.',
    image: '/images/news/charity-gala.jpg',
    publishDate: new Date('2024-02-28'),
    isPublished: true,
    isFeatured: false,
    author: 'Layla Ahmed',
    tags: ['fundraising', 'charity event', 'donations', 'humanitarian aid']
  }
]; 