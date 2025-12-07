// Sadaqah Page Full Seed Data for Backend
// Save as server/scripts/seedSadaqahPage.js or similar

module.exports = {
  tabs: [
    { id: 'general', label: 'General Sadaqah' },
    { id: 'immediate', label: 'Immediate Needs' },
    { id: 'periodic', label: 'Periodic Donation' },
    { id: 'kafarat', label: 'Kafarat & Fidyah' },
    { id: 'aqiqah', label: 'Aqiqah & Sacrifice' },
    { id: 'specific', label: 'Specific Projects' }
  ],
  hero: {
    tagline: 'Multiply Your Spiritual Rewards',
    heading: 'Give <span class="text-primary-300 relative">Sadaqah</span> & Change Lives',
    subheading: 'Every act of charity, no matter how small, has the power to transform lives and communities around the world. Your generosity creates lasting impact.',
    hadith: "The Prophet ﷺ said: 'Sadaqah extinguishes sin as water extinguishes fire.'",
    hadithSource: '— Tirmidhi',
    buttons: [
      { anchor: '#sadaqah-options', text: 'Explore Sadaqah Options' },
      { anchor: '#donation-form', text: 'Donate Now' }
    ],
    popularTitle: 'Popular Sadaqah Options',
    popularSubtitle: 'Choose from our most impactful options',
    popularOptions: [
      { id: 'popular-1', iconName: 'FaUsers', title: 'Feed the Poor', subtitle: 'From $10' },
      { id: 'popular-2', iconName: 'FaHeart', title: 'Daily Sadaqah', subtitle: 'Recurring charity' },
      { id: 'popular-3', iconName: 'FaWater', title: 'Water Wells', subtitle: 'Lasting benefit' },
      { id: 'popular-4', iconName: 'FaArrowRight', title: 'Explore More', subtitle: 'See all options' }
    ]
  },
  sectionHeadings: {
    chooseTypeTitle: 'Choose Your Sadaqah Type',
    chooseTypeSubtitle: 'Select how you would like to contribute and make a difference in the lives of those in need.',
    immediateTitle: 'Immediate Needs',
    immediateSubtitle: 'These individuals and families need your immediate support. Your Sadaqah can help relieve their suffering and provide essential assistance.',
    periodicTitle: 'Periodic Sadaqah',
    periodicSubtitle: 'Set up regular donations to provide consistent support and maximize your rewards. Choose the schedule that works best for you.',
    kafaratTitle: 'Kafarat & Fidyah',
    kafaratSubtitle: 'Fulfill your religious obligations through Kafarat (atonement) and Fidyah (redemption) for missed fasts due to valid reasons.',
    aqiqahTitle: 'Aqiqah & Sacrifice',
    aqiqahSubtitle: 'Commemorate special occasions in accordance with Islamic traditions while helping those in need through the distribution of meat.',
    specificTitle: 'Specific Projects',
    specificSubtitle: 'Support long-term development projects that create lasting positive change in communities around the world.',
    donationFormTitle: 'Make Your Contribution',
    donationFormSubtitle: 'Choose your donation type and amount to make a meaningful impact today.',
    benefitsTagline: 'Why Give Sadaqah?',
    benefitsTitle: 'Benefits of Sadaqah',
    benefitsSubtitle: 'The Prophet Muhammad ﷺ said: "Sadaqah extinguishes sin as water extinguishes fire." (Tirmidhi)',
    faqTagline: 'Common Questions',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about Sadaqah and our donation process.'
  },
  options: require('./fullSadaqahOptions.json'), // Place your full options JSON here
  benefits: [
    {
      iconName: 'FaInfinity',
      title: 'Purifies Wealth',
      description: 'Giving Sadaqah purifies your wealth and increases its blessings, allowing for growth both spiritually and materially. It cleanses your wealth from impurities and makes what remains more blessed.'
    },
    {
      iconName: 'FaShieldAlt',
      title: 'Protects from Harm',
      description: 'Sadaqah serves as a shield against calamities and hardships, offering protection for you and your loved ones. The Prophet ﷺ taught us that charity averts afflictions and trials.'
    },
    {
      iconName: 'FaHandHoldingHeart',
      title: 'Continuous Rewards',
      description: 'By giving Sadaqah Jariyah (continuous charity), you can receive ongoing rewards even after your lifetime. These are deeds that keep benefiting others and rewarding you eternally.'
    }
  ],
  faq: [
    {
      question: 'What is Sadaqah?',
      answer: 'Sadaqah is a voluntary act of giving from the heart. It can be given at any time and in any amount, with the intention of pleasing Allah (SWT) and helping those in need. It is considered one of the most virtuous acts in Islam.'
    },
    {
      question: 'What is the difference between Sadaqah and Zakat?',
      answer: 'Zakat is a mandatory charity that is one of the five pillars of Islam, required from those who meet the criteria of having wealth above a certain threshold (nisab) for a lunar year. Sadaqah is voluntary charity that can be given by anyone, at any time, in any amount.'
    },
    {
      question: 'How is my Sadaqah donation used?',
      answer: 'Your Sadaqah donations are used to fund various humanitarian projects, from emergency relief to sustainable development initiatives, based on where the need is greatest or according to your designation. We ensure maximum impact with every dollar donated.'
    },
    {
      question: 'Can I give Sadaqah on behalf of someone else?',
      answer: 'Yes, you can give Sadaqah on behalf of a loved one, whether living or deceased. The rewards of your charitable act will reach them by the will of Allah (SWT). This is a beautiful way to honor someone\'s memory or to gift the reward of charity to a loved one.'
    },
    {
      question: 'Is my donation tax-deductible?',
      answer: 'Yes, Ansar is a registered 501(c)(3) non-profit organization. Your donations are tax-deductible to the extent allowed by law. You will receive a receipt for your donation that can be used for tax purposes.'
    }
  ],
  cta: {
    tagline: 'Words of Wisdom',
    hadith: 'The believer\'s shade on the Day of Resurrection will be his Sadaqah.',
    source: 'Prophet Muhammad ﷺ (Tirmidhi)',
    text: 'Every act of charity brings relief to those in need and rewards from Allah. Don\'t delay what you can give today — for even a small amount can make a big difference.',
    button: 'Give Sadaqah Today'
  }
};
