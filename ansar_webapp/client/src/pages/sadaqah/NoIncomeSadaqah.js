import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const NoIncomeSadaqah = () => {
  const projects = [
    {
      title: 'Emergency Relief Fund',
      description: 'Provide immediate financial assistance to families with no source of income.',
      image: '/images/sadaqah/projects/emergency-relief.jpg',
      progress: 70,
      goal: 200000,
      raised: 140000,
      impact: 'Support 50 families in crisis'
    },
    {
      title: 'Job Training Program',
      description: 'Help individuals develop skills for employment opportunities.',
      image: '/images/sadaqah/projects/job-training.jpg',
      progress: 55,
      goal: 120000,
      raised: 66000,
      impact: 'Train 30 individuals for employment'
    },
    {
      title: 'Basic Necessities Support',
      description: 'Ensure families have access to food, utilities, and essential items.',
      image: '/images/sadaqah/projects/basic-needs.jpg',
      progress: 85,
      goal: 80000,
      raised: 68000,
      impact: 'Provide essentials for 40 families'
    }
  ];

  const donationOptions = [
    {
      amount: 200,
      impact: 'Provide basic necessities for one family'
    },
    {
      amount: 500,
      impact: 'Support a family for one month'
    },
    {
      amount: 1000,
      impact: 'Fund job training for one person'
    },
    {
      amount: 5000,
      impact: 'Provide comprehensive support for a family'
    }
  ];

  return (
    <SadaqahCategoryPage
      title="No Income Sadaqah"
      description="Support families without income sources and help them achieve financial stability through emergency relief and sustainable solutions."
      headerImage="/images/sadaqah/banners/no-income-banner.jpg"
      themeColor="orange"
      icon={FaUserFriends}
      projects={projects}
      donationOptions={donationOptions}
    />
  );
};

export default NoIncomeSadaqah; 