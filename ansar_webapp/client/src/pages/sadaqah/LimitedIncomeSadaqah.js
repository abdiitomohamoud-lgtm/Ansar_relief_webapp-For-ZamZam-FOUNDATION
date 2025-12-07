import React from 'react';
import { FaCoins } from 'react-icons/fa';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const LimitedIncomeSadaqah = () => {
  const projects = [
    {
      title: 'Income Support Program',
      description: 'Help families with limited income meet their basic needs and improve their living conditions.',
      image: '/images/sadaqah/projects/income-support.jpg',
      progress: 60,
      goal: 150000,
      raised: 90000,
      impact: 'Support 40 low-income families'
    },
    {
      title: 'Skills Enhancement Initiative',
      description: 'Provide training and resources for income improvement opportunities.',
      image: '/images/sadaqah/projects/skills-enhancement.jpg',
      progress: 70,
      goal: 100000,
      raised: 70000,
      impact: 'Train 25 individuals in new skills'
    },
    {
      title: 'Financial Literacy Program',
      description: 'Educate families on budget management and financial planning.',
      image: '/images/sadaqah/projects/financial-literacy.jpg',
      progress: 80,
      goal: 50000,
      raised: 40000,
      impact: 'Provide financial education to 50 families'
    }
  ];

  const donationOptions = [
    {
      amount: 200,
      impact: 'Support basic needs for one family'
    },
    {
      amount: 500,
      impact: 'Fund skills training for one person'
    },
    {
      amount: 1000,
      impact: 'Provide comprehensive support for a month'
    },
    {
      amount: 5000,
      impact: 'Help multiple families improve their income situation'
    }
  ];

  return (
    <SadaqahCategoryPage
      title="Limited Income Sadaqah"
      description="Support families with limited income to improve their financial situation and achieve better living standards."
      headerImage="/images/sadaqah/banners/limited-income-banner.jpg"
      themeColor="yellow"
      icon={FaCoins}
      projects={projects}
      donationOptions={donationOptions}
    />
  );
};

export default LimitedIncomeSadaqah; 