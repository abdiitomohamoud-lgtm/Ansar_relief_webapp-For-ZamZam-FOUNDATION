import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const PeriodicSadaqah = () => {
  const colorScheme = {
    gradient: 'from-purple-900 to-purple-700',
    bg: 'bg-purple-900',
    text: 'text-purple-900',
    border: 'border-purple-900',
    hover: 'hover:bg-purple-800'
  };

  const projects = [
    {
      title: 'Monthly Food Distribution',
      description: 'Provide regular food supplies to families in need through monthly distributions.',
      image: '/images/sadaqah/projects/monthly-food.jpg',
      progress: 80,
      goal: 150000,
      raised: 120000,
      impact: 'Support 100 families monthly'
    },
    {
      title: 'Quarterly Education Support',
      description: 'Fund educational expenses for underprivileged students on a quarterly basis.',
      image: '/images/sadaqah/projects/quarterly-education.jpg',
      progress: 70,
      goal: 100000,
      raised: 70000,
      impact: 'Support 50 students quarterly'
    },
    {
      title: 'Weekly Community Kitchen',
      description: 'Operate a community kitchen providing weekly meals to those in need.',
      image: '/images/sadaqah/projects/weekly-kitchen.jpg',
      progress: 90,
      goal: 80000,
      raised: 72000,
      impact: 'Serve 200 meals weekly'
    }
  ];

  const donationOptions = [
    {
      amount: 100,
      impact: 'Provide weekly meals for one family'
    },
    {
      amount: 300,
      impact: 'Support monthly food distribution for one family'
    },
    {
      amount: 1000,
      impact: 'Fund quarterly education support for one student'
    },
    {
      amount: 3000,
      impact: 'Sponsor a family for three months'
    }
  ];

  return (
    <SadaqahCategoryPage
      title="Periodic Sadaqah"
      description="Make a lasting impact through regular charitable giving that provides consistent support to those in need."
      headerImage="/images/sadaqah/banners/periodic-banner.jpg"
      colorScheme={colorScheme}
      icon={FaCalendarAlt}
      projects={projects}
      donationOptions={donationOptions}
    />
  );
};

export default PeriodicSadaqah; 