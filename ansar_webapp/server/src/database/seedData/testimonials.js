const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for testimonials
 */
module.exports = [
  {
    id: uuidv4(),
    name: 'Abdi Mohamed',
    title: 'Community Leader',
    content: 'The water well project has transformed our village. Before, women and children had to walk for hours to collect water. Now, we have clean water right in our community. This has improved our health and allowed children to attend school regularly instead of collecting water. We are deeply grateful for this life-changing support.',
    image: '/images/testimonials/abdi-thumb.jpg',
    rating: 5,
    location: 'Somalia',
    isActive: true,
    isFeatured: true
  },
  {
    id: uuidv4(),
    name: 'Fatima Hassan',
    title: 'Mother of Four',
    content: 'I received food packages during a very difficult time when I was struggling to feed my children after being displaced by conflict. The regular food assistance helped us survive and gave us hope. Now, I have also received support to start a small business selling handcrafts, which has allowed me to become self-sufficient. Thank you for not just providing temporary relief but also a sustainable solution.',
    image: '/images/testimonials/fatima-thumb.jpg',
    rating: 5,
    location: 'Yemen',
    isActive: true,
    isFeatured: true
  },
  {
    id: uuidv4(),
    name: 'Ibrahim Khalil',
    title: 'Former Orphan, Now University Student',
    content: 'I was sponsored through the orphan program for ten years after losing my parents. The monthly support covered my basic needs, education, and healthcare. The organization didn\'t just provide financial assistance but also mentorship and emotional support. Today, I am studying medicine at university, which would have been impossible without this support. I hope to give back to my community as a doctor.',
    image: '/images/testimonials/ibrahim-thumb.jpg',
    rating: 5,
    location: 'Pakistan',
    isActive: true,
    isFeatured: true
  },
  {
    id: uuidv4(),
    name: 'Aisha Rahman',
    title: 'School Teacher',
    content: 'The school reconstruction project has made an incredible difference in our community. Before, we were teaching in a damaged building that was unsafe and inadequate. Now, we have proper classrooms, teaching materials, and even a small library. The children are so excited to come to school every day. Their academic performance has improved significantly, and we can now provide quality education.',
    image: '/images/testimonials/aisha-thumb.jpg',
    rating: 5,
    location: 'Syria',
    isActive: true,
    isFeatured: false
  },
  {
    id: uuidv4(),
    name: 'Mohammed Ali',
    title: 'Small Business Owner',
    content: 'After years of struggling to support my family as a refugee, I received a microfinance grant to start a small grocery store. The business training and ongoing support were just as valuable as the financial assistance. My business is now thriving, and I can provide for my family with dignity. This opportunity has restored my hope and self-respect.',
    image: '/images/testimonials/mohammed-thumb.jpg',
    rating: 5,
    location: 'Jordan',
    isActive: true,
    isFeatured: false
  },
  {
    id: uuidv4(),
    name: 'Zahra Abdullahi',
    title: 'Healthcare Worker',
    content: 'The medical center established in our area has been a blessing for the entire community. Before, people had to travel long distances for even basic healthcare, which was impossible for many. Now, we can provide essential services locally, including maternal care, which has reduced complications during childbirth. The training I received as a healthcare worker has also allowed me to serve my community better.',
    image: '/images/testimonials/zahra-thumb.jpg',
    rating: 5,
    location: 'Sudan',
    isActive: true,
    isFeatured: false
  }
]; 