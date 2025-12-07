import React from 'react';
import { FaBaby } from 'react-icons/fa';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const AqiqahSadaqah = () => {
  const colorScheme = {
    gradient: 'from-green-900 to-green-700',
    bg: 'bg-green-900',
    text: 'text-green-900',
    border: 'border-green-900',
    hover: 'hover:bg-green-800'
  };

  const projects = [
    {
      title: 'Complete Aqiqah Package',
      description: 'Full Aqiqah service including sacrifice and distribution to those in need.',
      image: '/images/sadaqah/projects/aqiqah-complete.jpg',
      progress: 85,
      goal: 250000,
      raised: 212500,
      impact: 'Provide Aqiqah services for 25 families'
    },
    {
      title: 'Community Distribution Program',
      description: 'Ensure proper distribution of Aqiqah meat to underprivileged families.',
      image: '/images/sadaqah/projects/aqiqah-distribution.jpg',
      progress: 75,
      goal: 150000,
      raised: 112500,
      impact: 'Benefit 100 families in need'
    },
    {
      title: 'Celebration Support',
      description: 'Help families celebrate this important occasion with dignity.',
      image: '/images/sadaqah/projects/aqiqah-celebration.jpg',
      progress: 65,
      goal: 100000,
      raised: 65000,
      impact: 'Support 20 family celebrations'
    }
  ];

  const donationOptions = [
    {
      amount: 1000,
      impact: 'Contribute to one Aqiqah package'
    },
    {
      amount: 2500,
      impact: 'Fund a complete Aqiqah service'
    },
    {
      amount: 5000,
      impact: 'Sponsor two full Aqiqah celebrations'
    },
    {
      amount: 10000,
      impact: 'Support multiple families with complete packages'
    }
  ];

  return (
    <SadaqahCategoryPage
      title="Aqiqah Sadaqah"
      description="Support families in fulfilling the important Islamic tradition of Aqiqah while helping those in need."
      headerImage="/images/sadaqah/banners/aqiqah-banner.jpg"
      colorScheme={colorScheme}
      icon={FaBaby}
      projects={projects}
      donationOptions={donationOptions}
    />
  );
};

export default AqiqahSadaqah; 