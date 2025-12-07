const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for sponsorships
 */
module.exports = [
  {
    id: uuidv4(),
    name: 'Ahmed Hassan',
    type: 'orphan',
    description: 'Ahmed is a 7-year-old boy who lost both parents in a conflict. He is currently living with his elderly grandmother who struggles to provide for his needs.',
    image: '/images/sponsorships/orphan.jpg',
    location: 'Syria',
    age: 7,
    gender: 'male',
    monthlyAmount: 50,
    yearlyAmount: 600,
    isActive: true,
    isSponsored: false,
    story: `
      Ahmed is a bright and resilient 7-year-old boy who lost both his parents during the conflict in Syria. 
      Despite the trauma he has experienced, Ahmed maintains a positive attitude and dreams of becoming a doctor one day.
      
      He currently lives with his elderly grandmother who does her best to care for him but struggles with limited resources.
      Ahmed enjoys school and is particularly good at mathematics. He also loves playing soccer with his friends.
      
      By sponsoring Ahmed, you will help provide:
      - Nutritious food and clean water
      - School fees, books, and supplies
      - Healthcare and regular check-ups
      - Clothing and other basic necessities
      - Emotional support and counseling
      
      Your sponsorship will make a significant difference in Ahmed's life, giving him hope for a brighter future.
    `
  },
  {
    id: uuidv4(),
    name: 'Fatima Ali',
    type: 'orphan',
    description: 'Fatima is a 9-year-old girl who lost her parents in a natural disaster. She lives with her aunt who has three children of her own and limited resources.',
    image: '/images/sponsorships/orphan.jpg',
    location: 'Pakistan',
    age: 9,
    gender: 'female',
    monthlyAmount: 50,
    yearlyAmount: 600,
    isActive: true,
    isSponsored: false,
    story: `
      Fatima is a sweet and intelligent 9-year-old girl who lost her parents in a devastating flood that swept through her village in Pakistan.
      She now lives with her aunt who is already struggling to provide for her own three children.
      
      Despite the challenges she faces, Fatima is determined to continue her education. She is a diligent student who loves reading and writing stories.
      Her teachers describe her as helpful and kind to her classmates.
      
      By sponsoring Fatima, you will help provide:
      - Nutritious food and clean water
      - School fees, books, and supplies
      - Healthcare and regular check-ups
      - Clothing and other basic necessities
      - Emotional support and counseling
      
      Your sponsorship will ensure that Fatima can continue her education and work toward a better future.
    `
  },
  {
    id: uuidv4(),
    name: 'Ibrahim Family',
    type: 'family',
    description: 'The Ibrahim family consists of a widowed mother and her four children. They are struggling to make ends meet after the father passed away from illness.',
    image: '/images/sponsorships/family.jpg',
    location: 'Lebanon',
    monthlyAmount: 100,
    yearlyAmount: 1200,
    isActive: true,
    isSponsored: false,
    story: `
      The Ibrahim family faces significant challenges after the sudden loss of their father to illness last year.
      Amina, the mother, is doing her best to care for her four children: Yusuf (12), Layla (10), Omar (7), and baby Noor (2).
      
      Without their primary breadwinner, the family has fallen into financial hardship. Amina has been taking odd jobs as a seamstress,
      but the income is barely enough to cover their basic needs. The older children are at risk of dropping out of school to help support the family.
      
      By sponsoring the Ibrahim family, you will help provide:
      - Monthly food packages and essential supplies
      - Educational support for the children
      - Healthcare access for the entire family
      - Vocational training for Amina to increase her earning potential
      - Rent assistance to ensure stable housing
      
      Your sponsorship will help keep this family together and give them hope for a self-sufficient future.
    `
  },
  {
    id: uuidv4(),
    name: 'Aisha Rahman',
    type: 'student',
    description: 'Aisha is a bright 16-year-old student who dreams of becoming a doctor. Her family cannot afford to continue her education beyond primary school.',
    image: '/images/sponsorships/student.jpg',
    location: 'Bangladesh',
    age: 16,
    gender: 'female',
    monthlyAmount: 75,
    yearlyAmount: 900,
    isActive: true,
    isSponsored: false,
    story: `
      Aisha is an exceptionally bright student who has consistently ranked at the top of her class despite the challenges she faces.
      She has a passion for science and dreams of becoming a doctor to serve her community, where healthcare access is limited.
      
      Aisha's father is a day laborer with an unstable income, and her mother works as a domestic helper. Despite their hard work,
      they cannot afford the costs associated with secondary education. Without support, Aisha will be forced to abandon her education
      and her dreams.
      
      By sponsoring Aisha, you will help provide:
      - School fees and registration costs
      - Books, uniforms, and school supplies
      - Transportation to and from school
      - Additional tutoring in science subjects
      - Career guidance and university preparation
      
      Your sponsorship will not only change Aisha's life but potentially impact her entire community through her future service as a healthcare professional.
    `
  },
  {
    id: uuidv4(),
    name: 'Al-Noor Mosque',
    type: 'mosque',
    description: 'Al-Noor Mosque serves a community of 500 people but is in need of repairs and expansion to accommodate the growing congregation.',
    image: '/images/sponsorships/mosque.jpg',
    location: 'Indonesia',
    monthlyAmount: 200,
    yearlyAmount: 2400,
    isActive: true,
    isSponsored: false,
    story: `
      Al-Noor Mosque has been a spiritual and community center for over 30 years, serving approximately 500 people in a rural area of Indonesia.
      The mosque not only provides a place for worship but also hosts educational programs, community gatherings, and charity distributions.
      
      Over the years, the building has deteriorated significantly. The roof leaks during the rainy season, the electrical system is outdated and unsafe,
      and the space is no longer adequate for the growing congregation. Additionally, the mosque lacks proper facilities for women and children.
      
      By sponsoring Al-Noor Mosque, you will help fund:
      - Essential structural repairs to ensure safety
      - Expansion of the prayer hall to accommodate more worshippers
      - Creation of dedicated spaces for women and children
      - Improved bathroom and wudu facilities
      - Upgraded electrical system and lighting
      - Educational materials for Islamic studies classes
      
      Your sponsorship will help preserve this important community institution and enhance its service to the local population.
    `
  }
]; 