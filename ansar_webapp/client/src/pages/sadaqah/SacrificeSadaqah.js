import React from 'react';
import { FaKaaba } from 'react-icons/fa';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const SacrificeSadaqah = () => {
  const colorScheme = {
    gradient: 'from-amber-900 to-amber-700',
    bg: 'bg-amber-900',
    text: 'text-amber-900',
    border: 'border-amber-900',
    hover: 'hover:bg-amber-800'
  };

  const projects = [
    {
      title: 'Qurbani Distribution Program',
      description: 'Support the distribution of sacrificial meat to families in need during Eid al-Adha.',
      image: '/images/sadaqah/projects/qurbani-distribution.jpg',
      progress: 90,
      goal: 300000,
      raised: 270000,
      impact: 'Provide meat to 500 families'
    },
    {
      title: 'Community Sacrifice Initiative',
      description: 'Enable collective sacrifice arrangements for the community while helping the needy.',
      image: '/images/sadaqah/projects/community-sacrifice.jpg',
      progress: 80,
      goal: 200000,
      raised: 160000,
      impact: 'Support 200 community members'
    },
    {
      title: 'Global Sacrifice Support',
      description: 'Extend sacrifice benefits to communities in need worldwide.',
      image: '/images/sadaqah/projects/global-sacrifice.jpg',
      progress: 70,
      goal: 250000,
      raised: 175000,
      impact: 'Help 300 families globally'
    }
  ];

  const donationOptions = [
    {
      amount: 1500,
      impact: 'Contribute to one sacrifice'
    },
    {
      amount: 3000,
      impact: 'Fund a complete sacrifice and distribution'
    },
    {
      amount: 5000,
      impact: 'Support multiple families with sacrificial meat'
    },
    {
      amount: 10000,
      impact: 'Sponsor a community sacrifice program'
    }
  ];

  return (
    <SadaqahCategoryPage
      title="Sacrifice Sadaqah"
      description="Participate in the blessed act of sacrifice while helping those in need receive nutritious meat."
      headerImage="/images/sadaqah/banners/sacrifice-banner.jpg"
      colorScheme={colorScheme}
      icon={FaKaaba}
      projects={projects}
      donationOptions={donationOptions}
    />
  );
};

export default SacrificeSadaqah; 