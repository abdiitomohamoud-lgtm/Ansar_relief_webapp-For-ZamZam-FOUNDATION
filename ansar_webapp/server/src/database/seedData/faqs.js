const { v4: uuidv4 } = require('uuid');

/**
 * Seed data for FAQs
 */
module.exports = [
  {
    id: uuidv4(),
    question: 'How is my donation used?',
    answer: 'Your donation is used to fund our humanitarian projects and programs in areas such as emergency relief, water, education, healthcare, food security, and orphan support. We ensure that at least 90% of donations go directly to our programs, with the remaining funds used for essential administrative costs and fundraising efforts to expand our reach.',
    category: 'Donations',
    isActive: true,
    order: 1
  },
  {
    id: uuidv4(),
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, we are a registered 501(c)(3) nonprofit organization, and donations made by US taxpayers are tax-deductible to the extent allowed by law. You will receive a tax receipt for your donation that can be used for tax purposes.',
    category: 'Donations',
    isActive: true,
    order: 2
  },
  {
    id: uuidv4(),
    question: 'Can I specify which project my donation goes to?',
    answer: 'Yes, you can designate your donation for a specific project, campaign, or program. During the donation process, you will have the option to select where you would like your funds to be directed. If you choose "Where Most Needed," we will allocate your donation to the areas of greatest need at that time.',
    category: 'Donations',
    isActive: true,
    order: 3
  },
  {
    id: uuidv4(),
    question: 'How do I know my donation is making an impact?',
    answer: 'We are committed to transparency and accountability. We provide regular updates on our projects through our website, social media, and email newsletters. Our annual reports detail how funds are used and the impact achieved. Additionally, for specific programs like orphan sponsorship, you will receive updates about the child or project you are supporting.',
    category: 'Donations',
    isActive: true,
    order: 4
  },
  {
    id: uuidv4(),
    question: 'What is Zakat and who is eligible to receive it?',
    answer: 'Zakat is one of the five pillars of Islam, requiring Muslims to give 2.5% of their qualifying wealth to those in need. Eligible recipients include the poor, needy, those in debt, travelers in need, and those working to collect and distribute Zakat. We ensure that 100% of Zakat donations are distributed to eligible recipients according to Islamic guidelines.',
    category: 'Zakat',
    isActive: true,
    order: 1
  },
  {
    id: uuidv4(),
    question: 'How do you calculate Zakat?',
    answer: 'Zakat is calculated as 2.5% of your net savings and assets that have been in your possession for one lunar year. This includes cash, savings, gold, silver, investments, business inventory, and rental property income. Our website offers a Zakat calculator to help you determine the amount you should pay.',
    category: 'Zakat',
    isActive: true,
    order: 2
  },
  {
    id: uuidv4(),
    question: 'What is the difference between Zakat and Sadaqah?',
    answer: 'Zakat is obligatory for eligible Muslims and must be given to specific categories of recipients. It is calculated at 2.5% of qualifying wealth. Sadaqah, on the other hand, is voluntary charity that can be given at any time, in any amount, and to anyone in need. Both are forms of charity in Islam, but Zakat has specific rules governing its payment and distribution.',
    category: 'Zakat',
    isActive: true,
    order: 3
  },
  {
    id: uuidv4(),
    question: 'How does orphan sponsorship work?',
    answer: 'Our orphan sponsorship program connects donors with orphaned children in need. For a monthly contribution (typically $50-60), you provide essential support for a child\'s basic needs, education, and healthcare. You\'ll receive information about the child you\'re sponsoring and regular updates on their well-being and progress. Your sponsorship helps provide stability and opportunities for a vulnerable child.',
    category: 'Sponsorship',
    isActive: true,
    order: 1
  },
  {
    id: uuidv4(),
    question: 'Can I communicate with the orphan I sponsor?',
    answer: 'While direct communication is generally not possible due to child protection policies and practical constraints, we provide regular updates about the child\'s progress, including photos and information about their education and well-being. In some cases, you may be able to send letters or cards through our organization, which will be delivered to the child.',
    category: 'Sponsorship',
    isActive: true,
    order: 2
  },
  {
    id: uuidv4(),
    question: 'How can I volunteer with your organization?',
    answer: 'We offer various volunteering opportunities both locally and internationally. Local volunteering may include helping at events, administrative support, fundraising, and community outreach. International volunteering opportunities are available for qualified professionals in areas such as healthcare, education, and engineering. Visit our Volunteer page to learn about current opportunities and to submit an application.',
    category: 'Get Involved',
    isActive: true,
    order: 1
  },
  {
    id: uuidv4(),
    question: 'Does your organization accept in-kind donations?',
    answer: 'Yes, we accept specific in-kind donations based on current needs and logistical capabilities. Commonly accepted items include new clothing, blankets, medical supplies, and educational materials. Before making an in-kind donation, please contact us to confirm that we can accept and effectively utilize your donation. We may not be able to accept all items due to shipping constraints or specific needs in the field.',
    category: 'Get Involved',
    isActive: true,
    order: 2
  },
  {
    id: uuidv4(),
    question: 'How is your organization governed?',
    answer: 'We are governed by a Board of Directors comprised of experienced professionals from various fields who provide strategic guidance and oversight. Our operations adhere to international humanitarian standards and best practices. We are registered as a 501(c)(3) nonprofit organization and comply with all relevant regulations. Our financial statements are audited annually by an independent accounting firm.',
    category: 'About Us',
    isActive: true,
    order: 1
  },
  {
    id: uuidv4(),
    question: 'Where does your organization work?',
    answer: 'We work in over 30 countries across Africa, Asia, the Middle East, and Eastern Europe, focusing on areas with significant humanitarian needs due to poverty, conflict, or natural disasters. Our programs are implemented either directly or through trusted local partners who understand the local context and have established relationships with the communities we serve.',
    category: 'About Us',
    isActive: true,
    order: 2
  }
]; 