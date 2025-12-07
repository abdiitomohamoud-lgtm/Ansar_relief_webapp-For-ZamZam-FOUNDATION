import React from 'react';
import { FaHospital } from 'react-icons/fa';
import SadaqahCategoryPage from '../../components/sadaqah/SadaqahCategoryPage';

const SickSadaqah = () => {
  const projects = [
    {
      title: 'Medical Treatment Support',
      description: 'Help patients access essential medical treatments and procedures.',
      image: '/images/sadaqah/projects/medical-treatment.jpg',
      progress: 75,
      goal: 150000,
      raised: 112500,
      impact: 'Support medical treatment for 30 patients'
    },
    {
      title: 'Chronic Care Program',
      description: 'Support individuals with chronic illnesses in managing their ongoing care needs.',
      image: '/images/sadaqah/projects/chronic-care.jpg',
      progress: 60,
      goal: 100000,
      raised: 60000,
      impact: 'Help 20 patients with chronic conditions'
    },
    {
      title: 'Medical Equipment Fund',
      description: 'Provide essential medical equipment to those who cannot afford them.',
      image: '/images/sadaqah/projects/medical-equipment.jpg',
      progress: 80,
      goal: 75000,
      raised: 60000,
      impact: 'Supply medical equipment to 15 patients'
    }
  ];

  const donationOptions = [
    {
      amount: 250,
      impact: 'Provide basic medical supplies for one patient'
    },
    {
      amount: 500,
      impact: 'Support one week of medication for a chronic patient'
    },
    {
      amount: 1000,
      impact: 'Fund essential medical procedures'
    },
    {
      amount: 5000,
      impact: 'Provide comprehensive medical care for one patient'
    }
  ];

  return (
    <SadaqahCategoryPage
      title="Sick Sadaqah"
      description="Support those facing health challenges by contributing to their medical care and treatment needs."
      headerImage="/images/sadaqah/banners/sick-banner.jpg"
      themeColor="red"
      icon={FaHospital}
      projects={projects}
      donationOptions={donationOptions}
    />
  );
};

export default SickSadaqah; 