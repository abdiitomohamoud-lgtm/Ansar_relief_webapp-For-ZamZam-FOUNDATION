// server/src/scripts/seedSadaqahPageData.js
// Script to seed the Sadaqah page data in the database with the original mock data

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const Sadaqah = require('../models/sadaqah.model');

const sadaqahData = {
  hero: {
    heading: 'Give <span class="text-primary-300 relative">Sadaqah</span> & Change Lives',
    intro: 'Every act of charity, no matter how small, has the power to transform lives and communities around the world. Your generosity creates lasting impact.',
    hadith: '"The Prophet ﷺ said: \'Sadaqah extinguishes sin as water extinguishes fire.\'"',
    hadithSource: '— Tirmidhi',
    buttons: [
      { text: 'Explore Sadaqah Options', anchor: '#sadaqah-options' },
      { text: 'Donate Now', anchor: '#donation-form' }
    ]
  },
  sectionHeadings: {
    chooseType: 'Choose Your Sadaqah Type',
    chooseTypeDesc: 'Select how you would like to contribute and make a difference in the lives of those in need.',
    immediate: 'Immediate Needs',
    immediateDesc: 'These individuals and families need your immediate support. Your Sadaqah can help relieve their suffering and provide essential assistance.',
    periodic: 'Periodic Sadaqah',
    periodicDesc: 'Set up regular donations to provide consistent support and maximize your rewards. Choose the schedule that works best for you.',
    kafarat: 'Kafarat & Fidyah',
    kafaratDesc: 'Fulfill your religious obligations through Kafarat (atonement) and Fidyah (redemption) for missed fasts due to valid reasons.',
    aqiqah: 'Aqiqah & Sacrifice',
    aqiqahDesc: 'Commemorate special occasions in accordance with Islamic traditions while helping those in need through the distribution of meat.',
    specific: 'Specific Projects',
    specificDesc: 'Support long-term development projects that create lasting positive change in communities around the world.',
    makeContribution: 'Make Your Contribution',
    makeContributionDesc: 'Choose your donation type and amount to make a meaningful impact today.',
    whyGive: 'Why Give Sadaqah?',
    benefits: 'Benefits of Sadaqah',
  },
  tabs: [
    { id: 'general', label: 'General Sadaqah' },
    { id: 'immediate', label: 'Immediate Needs' },
    { id: 'periodic', label: 'Periodic Donation' },
    { id: 'kafarat', label: 'Kafarat & Fidyah' },
    { id: 'aqiqah', label: 'Aqiqah & Sacrifice' },
    { id: 'specific', label: 'Specific Projects' }
  ],
  options: {
    general: [
      {
        id: 'general-1',
        title: 'Daily Sadaqah',
        description: 'A special donation program that allows enrolled donors to automatically donate an agreed amount every day.',
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaCalendarAlt',
        cta: 'Subscribe Now',
        isPeriodic: true
      },
      {
        id: 'general-2',
        title: 'Sadaqah Jariyah',
        description: 'Continuous charity that keeps giving even after you\'re gone, such as water wells, mosques, and schools.',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHandHoldingHeart',
        cta: 'Donate Now'
      },
      {
        id: 'general-3',
        title: 'Feed the Poor',
        description: 'Provide nutritious meals to those in need in communities around the world.',
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128a16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaUsers',
        cta: 'Help Today'
      }
    ],
    immediate: [
      {
        id: 'immediate-1',
        title: 'Support for Widows',
        description: 'Provide financial aid and support for widows and their families.',
        image: 'https://images.unsplash.com/photo-1594751684241-638928887de7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHeart',
        goal: 50000,
        raised: 32400,
        cta: 'Support Now',
        location: 'Syria & Yemen',
        donors: 230,
        daysLeft: 18
      },
      {
        id: 'immediate-2',
        title: 'Medical Treatment',
        description: 'Help fund critical medical care for those who cannot afford it.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHeart',
        goal: 75000,
        raised: 41200,
        cta: 'Donate Now',
        location: 'Gaza',
        donors: 186,
        daysLeft: 25
      },
      {
        id: 'immediate-3',
        title: 'Debt Relief',
        description: 'Help free those burdened by debt due to unforeseen circumstances.',
        image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHeart',
        goal: 60000,
        raised: 28900,
        cta: 'Contribute',
        location: 'Worldwide',
        donors: 145,
        daysLeft: 30
      },
      {
        id: 'immediate-4',
        title: 'Support for Students',
        description: 'Help fund education for students from underprivileged backgrounds.',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHeart',
        goal: 45000,
        raised: 21800,
        cta: 'Support Now',
        location: 'Africa',
        donors: 119,
        daysLeft: 40
      }
    ],
    periodic: [
      {
        id: 'periodic-1',
        title: 'Friday Sadaqah',
        description: 'Donate every Friday to maximize rewards on this blessed day.',
        image: 'https://images.unsplash.com/photo-1591197172062-c718f82aba20?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaRegCalendarCheck',
        interval: 'weekly',
        day: 'Friday',
        cta: 'Set Up Weekly'
      },
      {
        id: 'periodic-2',
        title: 'Monday & Thursday',
        description: 'Follow the Sunnah by giving Sadaqah on the days the Prophet ﷺ recommended fasting.',
        image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaRegCalendarCheck',
        interval: 'weekly',
        days: ['Monday', 'Thursday'],
        cta: 'Set Up Bi-Weekly'
      },
      {
        id: 'periodic-3',
        title: 'Monthly Sadaqah',
        description: 'Set up a regular monthly donation to provide consistent support.',
        image: 'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaCalendarAlt',
        interval: 'monthly',
        cta: 'Set Up Monthly'
      }
    ],
    kafarat: [
      {
        id: 'kafarat-1',
        title: 'Oath Atonement',
        description: 'Expiation for breaking an oath in the name of Allah. Feed or clothe ten poor people or free a slave.',
        image: 'https://images.unsplash.com/photo-1528213049955-adbe6fe1dcbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHandHoldingHeart',
        amount: 70,
        cta: 'Pay Now'
      },
      {
        id: 'kafarat-2',
        title: 'Fasting Kafara',
        description: 'Compensation for missed fasting days (for those unable to make them up) by feeding the poor.',
        image: 'https://images.unsplash.com/photo-1594745561149-2211ca8c5d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaUtensils',
        amount: 10,
        perDay: true,
        cta: 'Pay Kafara'
      },
      {
        id: 'kafarat-3',
        title: 'Fidyah',
        description: 'Payment for those physically unable to fast due to illness, old age, or chronic condition.',
        image: 'https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHeart',
        amount: 10,
        perDay: true,
        cta: 'Pay Fidyah'
      }
    ],
    aqiqah: [
      {
        id: 'aqiqah-1',
        title: 'Aqiqah',
        description: 'Sacrifice offered on behalf of a newborn as a form of gratitude to Allah.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaPaw',
        amount: 200,
        cta: 'Donate Aqiqah'
      },
      {
        id: 'aqiqah-2',
        title: 'Sacrifice (Qurbani)',
        description: 'Commemorate the devotion of Prophet Ibrahim (AS) and help feed the poor during Eid al-Adha.',
        image: 'https://images.unsplash.com/photo-1539786774582-0707555f1f72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHorse',
        amount: 250,
        cta: 'Donate Sacrifice'
      },
      {
        id: 'aqiqah-3',
        title: 'Vow Fulfillment',
        description: 'Fulfill your vow (nadhr) made to Allah through charitable action.',
        image: 'https://images.unsplash.com/photo-1569384179898-a5be36ca8f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaHandshake',
        customAmount: true,
        cta: 'Fulfill Vow'
      }
    ],
    specific: [
      {
        id: 'specific-1',
        title: 'Water Wells',
        description: 'Provide access to clean water for communities suffering from water scarcity.',
        image: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaWater',
        goal: 15000,
        raised: 8500,
        cta: 'Fund a Well',
        location: 'East Africa',
        donors: 98,
        daysLeft: 45
      },
      {
        id: 'specific-2',
        title: 'Mosque Construction',
        description: 'Help build a place of worship, learning, and community for Muslims.',
        image: 'https://images.unsplash.com/photo-1564769625644-c0483afb2fd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaMosque',
        goal: 50000,
        raised: 22500,
        cta: 'Build a Mosque',
        location: 'South Asia',
        donors: 175,
        daysLeft: 60
      },
      {
        id: 'specific-3',
        title: 'Educational Support',
        description: 'Fund educational initiatives for underprivileged children and communities.',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        iconName: 'FaGraduationCap',
        goal: 20000,
        raised: 12200,
        cta: 'Support Education',
        location: 'Middle East',
        donors: 120,
        daysLeft: 35
      }
    ]
  },
  benefits: [
    {
      title: 'Purifies Wealth',
      description: 'Giving Sadaqah purifies your wealth and increases its blessings, allowing for growth both spiritually and materially. It cleanses your wealth from impurities and makes what remains more blessed.'
    },
    {
      title: 'Protects from Harm',
      description: 'Sadaqah serves as a shield against calamities and hardships, offering protection for you and your loved ones. The Prophet ﷺ taught us that charity averts afflictions and trials.'
    },
    {
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

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Sadaqah.deleteMany({});
    await Sadaqah.create(sadaqahData);
    console.log('Sadaqah page data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Sadaqah page data:', err);
    process.exit(1);
  }
}

seed();
