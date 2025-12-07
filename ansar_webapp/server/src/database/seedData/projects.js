const { v4: uuidv4 } = require('uuid');

// Get category IDs from categories.js
const categories = require('./categories');

// Map category names to their IDs
const categoryMap = categories.reduce((map, category) => {
  map[category.slug] = category.id;
  return map;
}, {});

/**
 * Seed data for projects
 */
module.exports = [
  {
    id: uuidv4(),
    title: 'Water Wells in Somalia',
    slug: 'water-wells-somalia',
    description: 'Construction of 10 deep water wells in drought-affected regions of Somalia',
    shortDescription: 'Providing clean water access to communities suffering from severe drought in Somalia.',
    image: '/images/projects/water-wells.jpg',
    budget: 75000,
    spent: 45000,
    startDate: new Date('2023-10-15'),
    endDate: new Date('2024-08-30'),
    status: 'in-progress',
    isActive: true,
    isFeatured: true,
    categoryId: categoryMap['water'],
    location: 'Puntland Region',
    country: 'Somalia',
    licenseNumber: '2023-P-001',
    content: `
      <h2>Water Wells Project in Somalia</h2>
      <p>Somalia has been experiencing severe drought conditions for several years, leaving communities without reliable access to clean water. This project aims to address this critical need by constructing 10 deep water wells in the most affected regions.</p>
      
      <h3>Project Objectives</h3>
      <ul>
        <li>Construct 10 deep water wells with hand pumps in strategic locations</li>
        <li>Establish community water management committees</li>
        <li>Train local technicians in well maintenance and repair</li>
        <li>Implement water conservation education programs</li>
      </ul>
      
      <h3>Progress Update</h3>
      <p>As of now, we have:</p>
      <ul>
        <li>Completed site assessments and selected all 10 locations</li>
        <li>Constructed and activated 6 wells</li>
        <li>Formed 6 water management committees</li>
        <li>Trained 12 local technicians</li>
        <li>Conducted water quality testing for all completed wells</li>
      </ul>
      
      <h3>Impact</h3>
      <p>Each well provides clean water to approximately 400-500 people, meaning this project will ultimately benefit 4,000-5,000 individuals. Access to clean water has already led to:</p>
      <ul>
        <li>Reduction in waterborne diseases</li>
        <li>Decreased time spent collecting water (especially for women and girls)</li>
        <li>Improved school attendance</li>
        <li>Enhanced agricultural activities</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>In the coming months, we will:</p>
      <ul>
        <li>Complete construction of the remaining 4 wells</li>
        <li>Establish the remaining water management committees</li>
        <li>Conduct comprehensive water conservation training</li>
        <li>Implement a monitoring system for long-term sustainability</li>
      </ul>
    `,
    beneficiaries: 5000
  },
  {
    id: uuidv4(),
    title: 'Medical Center in Yemen',
    slug: 'medical-center-yemen',
    description: 'Establishment of a primary healthcare center in conflict-affected area of Yemen',
    shortDescription: 'Building and equipping a medical center to provide essential healthcare services in Yemen.',
    image: '/images/projects/medical-center.jpg',
    budget: 120000,
    spent: 85000,
    startDate: new Date('2023-08-01'),
    endDate: new Date('2024-07-31'),
    status: 'in-progress',
    isActive: true,
    isFeatured: true,
    categoryId: categoryMap['healthcare'],
    location: 'Taiz Governorate',
    country: 'Yemen',
    licenseNumber: '2023-H-002',
    content: `
      <h2>Medical Center Project in Yemen</h2>
      <p>The ongoing conflict in Yemen has devastated the country's healthcare system, leaving millions without access to basic medical services. This project aims to establish a primary healthcare center in a conflict-affected area to provide essential medical care to vulnerable populations.</p>
      
      <h3>Project Objectives</h3>
      <ul>
        <li>Renovate and equip a building to serve as a primary healthcare center</li>
        <li>Staff the center with qualified medical professionals</li>
        <li>Provide essential medications and medical supplies</li>
        <li>Establish maternal and child health services</li>
        <li>Implement vaccination programs</li>
        <li>Create a referral system for complex cases</li>
      </ul>
      
      <h3>Progress Update</h3>
      <p>As of now, we have:</p>
      <ul>
        <li>Completed renovation of the building</li>
        <li>Installed essential medical equipment</li>
        <li>Recruited key medical staff (2 doctors, 4 nurses, 1 pharmacist)</li>
        <li>Established basic outpatient services</li>
        <li>Created a pharmacy with essential medications</li>
        <li>Implemented initial maternal health services</li>
      </ul>
      
      <h3>Impact</h3>
      <p>The medical center will serve approximately 15,000 people in the surrounding area. Since the partial opening, the center has:</p>
      <ul>
        <li>Treated over 2,500 patients</li>
        <li>Provided prenatal care to 180 expectant mothers</li>
        <li>Vaccinated 350 children</li>
        <li>Distributed essential medications to 1,200 patients</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>In the coming months, we will:</p>
      <ul>
        <li>Recruit additional medical staff</li>
        <li>Expand services to include minor surgical procedures</li>
        <li>Establish a laboratory for basic diagnostic tests</li>
        <li>Implement community health education programs</li>
        <li>Develop a sustainable funding model for long-term operations</li>
      </ul>
    `,
    beneficiaries: 15000
  },
  {
    id: uuidv4(),
    title: 'School Reconstruction in Syria',
    slug: 'school-reconstruction-syria',
    description: 'Rebuilding and equipping schools damaged during the conflict in Syria',
    shortDescription: 'Rebuilding schools to provide education for children affected by the Syrian conflict.',
    image: '/images/projects/school-reconstruction.jpg',
    budget: 200000,
    spent: 120000,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-08-31'),
    status: 'in-progress',
    isActive: true,
    isFeatured: false,
    categoryId: categoryMap['education'],
    location: 'Aleppo Governorate',
    country: 'Syria',
    licenseNumber: '2023-E-003',
    content: `
      <h2>School Reconstruction Project in Syria</h2>
      <p>Years of conflict in Syria have left many schools damaged or destroyed, depriving children of their right to education. This project aims to rebuild and equip three schools in areas affected by the conflict, providing safe learning environments for children.</p>
      
      <h3>Project Objectives</h3>
      <ul>
        <li>Reconstruct three damaged school buildings</li>
        <li>Equip classrooms with furniture, blackboards, and teaching materials</li>
        <li>Establish computer labs and libraries</li>
        <li>Create safe playgrounds and recreational areas</li>
        <li>Train teachers in trauma-informed education approaches</li>
        <li>Implement psychosocial support programs for students</li>
      </ul>
      
      <h3>Progress Update</h3>
      <p>As of now, we have:</p>
      <ul>
        <li>Completed structural repairs on two school buildings</li>
        <li>Furnished 16 classrooms with desks, chairs, and blackboards</li>
        <li>Equipped one computer lab with 20 computers</li>
        <li>Established a library with 2,000 books</li>
        <li>Trained 15 teachers in trauma-informed education</li>
        <li>Started classes for 450 students</li>
      </ul>
      
      <h3>Impact</h3>
      <p>When fully completed, this project will benefit:</p>
      <ul>
        <li>Approximately 1,200 students</li>
        <li>45 teachers and school staff</li>
        <li>The broader community through improved educational infrastructure</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>In the coming months, we will:</p>
      <ul>
        <li>Complete reconstruction of the third school</li>
        <li>Equip remaining classrooms and facilities</li>
        <li>Establish two more computer labs</li>
        <li>Complete playground construction</li>
        <li>Implement comprehensive psychosocial support programs</li>
        <li>Develop sustainability plans for ongoing maintenance and operations</li>
      </ul>
    `,
    beneficiaries: 1200
  },
  {
    id: uuidv4(),
    title: 'Food Security Program in Sudan',
    slug: 'food-security-sudan',
    description: 'Sustainable agriculture and food distribution program for vulnerable communities in Sudan',
    shortDescription: 'Implementing sustainable agriculture solutions and emergency food distribution in Sudan.',
    image: '/images/projects/food-security.jpg',
    budget: 150000,
    spent: 65000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-01-14'),
    status: 'in-progress',
    isActive: true,
    isFeatured: false,
    categoryId: categoryMap['food'],
    location: 'Darfur Region',
    country: 'Sudan',
    licenseNumber: '2024-F-001',
    content: `
      <h2>Food Security Program in Sudan</h2>
      <p>Sudan faces significant food security challenges due to conflict, climate change, and economic instability. This comprehensive program combines emergency food distribution with sustainable agriculture initiatives to address both immediate needs and long-term food security.</p>
      
      <h3>Project Objectives</h3>
      <ul>
        <li>Distribute emergency food packages to 2,000 vulnerable families</li>
        <li>Establish 20 community gardens with drought-resistant crops</li>
        <li>Provide agricultural training and tools to 500 farming households</li>
        <li>Implement water harvesting techniques for irrigation</li>
        <li>Create seed banks for sustainable farming</li>
        <li>Establish farmer cooperatives for improved market access</li>
      </ul>
      
      <h3>Progress Update</h3>
      <p>As of now, we have:</p>
      <ul>
        <li>Distributed emergency food packages to 850 families</li>
        <li>Established 8 community gardens</li>
        <li>Provided agricultural training to 210 farming households</li>
        <li>Implemented water harvesting systems in 5 communities</li>
        <li>Distributed drought-resistant seeds to 300 families</li>
      </ul>
      
      <h3>Impact</h3>
      <p>The program is expected to benefit:</p>
      <ul>
        <li>2,000 families (approximately 12,000 individuals) through emergency food distribution</li>
        <li>500 farming households (approximately 3,000 individuals) through agricultural support</li>
        <li>20 communities through improved food production infrastructure</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>In the coming months, we will:</p>
      <ul>
        <li>Continue emergency food distribution to remaining families</li>
        <li>Establish the remaining community gardens</li>
        <li>Complete agricultural training for all target households</li>
        <li>Implement remaining water harvesting systems</li>
        <li>Establish farmer cooperatives and market linkages</li>
        <li>Develop monitoring systems for crop yields and food security indicators</li>
      </ul>
    `,
    beneficiaries: 15000
  },
  {
    id: uuidv4(),
    title: 'Orphanage Support in Bangladesh',
    slug: 'orphanage-support-bangladesh',
    description: 'Comprehensive support program for orphanages in Bangladesh',
    shortDescription: 'Providing essential support and improvements to orphanages caring for vulnerable children in Bangladesh.',
    image: '/images/projects/orphanage-support.jpg',
    budget: 90000,
    spent: 35000,
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-10-31'),
    status: 'in-progress',
    isActive: true,
    isFeatured: false,
    categoryId: categoryMap['orphans'],
    location: 'Dhaka and Chittagong',
    country: 'Bangladesh',
    licenseNumber: '2023-O-004',
    content: `
      <h2>Orphanage Support Project in Bangladesh</h2>
      <p>Orphanages in Bangladesh often struggle with limited resources, affecting the quality of care they can provide to children. This project aims to improve living conditions, education, healthcare, and overall well-being for children in five orphanages across Dhaka and Chittagong.</p>
      
      <h3>Project Objectives</h3>
      <ul>
        <li>Renovate and improve facilities at five orphanages</li>
        <li>Provide nutritious meals and address malnutrition</li>
        <li>Ensure access to quality education and educational materials</li>
        <li>Implement regular healthcare check-ups and medical support</li>
        <li>Provide psychosocial support and recreational activities</li>
        <li>Train caregivers in child development and protection</li>
      </ul>
      
      <h3>Progress Update</h3>
      <p>As of now, we have:</p>
      <ul>
        <li>Completed renovations at two orphanages</li>
        <li>Implemented improved nutrition programs at three orphanages</li>
        <li>Provided educational materials and tutoring support</li>
        <li>Conducted health check-ups for 180 children</li>
        <li>Trained 15 caregivers in child development</li>
        <li>Established recreational spaces at two orphanages</li>
      </ul>
      
      <h3>Impact</h3>
      <p>This project will benefit:</p>
      <ul>
        <li>Approximately 350 orphaned children</li>
        <li>40 caregivers and staff members</li>
        <li>The broader community through improved child welfare standards</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>In the coming months, we will:</p>
      <ul>
        <li>Complete renovations at the remaining orphanages</li>
        <li>Expand nutrition programs to all five orphanages</li>
        <li>Implement comprehensive healthcare protocols</li>
        <li>Establish educational support programs at all locations</li>
        <li>Complete caregiver training</li>
        <li>Develop sustainability plans for continued support</li>
      </ul>
    `,
    beneficiaries: 350
  }
]; 