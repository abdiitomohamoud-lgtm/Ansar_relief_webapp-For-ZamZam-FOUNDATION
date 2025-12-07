// Color utility functions for consistent styling across components

export const getTextGradient = (color) => {
  switch (color) {
    case 'primary':
      return 'bg-gradient-to-r from-primary-600 to-primary-500';
    case 'secondary':
      return 'bg-gradient-to-r from-secondary-600 to-secondary-500';
    case 'accent':
      return 'bg-gradient-to-r from-accent-600 to-accent-500';
    case 'red':
      return 'bg-gradient-to-r from-red-600 to-red-500';
    case 'blue':
      return 'bg-gradient-to-r from-blue-600 to-blue-500';
    case 'green':
      return 'bg-gradient-to-r from-green-600 to-green-500';
    case 'orange':
      return 'bg-gradient-to-r from-orange-600 to-orange-500';
    case 'purple':
      return 'bg-gradient-to-r from-purple-600 to-purple-500';
    case 'pink':
      return 'bg-gradient-to-r from-pink-600 to-pink-500';
    default:
      return 'bg-gradient-to-r from-gray-600 to-gray-500';
  }
};

export const getCardGradient = (color) => {
  switch (color) {
    case 'primary':
      return 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600';
    case 'red':
      return 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600';
    case 'blue':
      return 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600';
    case 'green':
      return 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600';
    case 'orange':
      return 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600';
    case 'purple':
      return 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600';
    case 'pink':
      return 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600';
    default:
      return 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600';
  }
};

export const getCategoryBadgeStyle = (category) => {
  switch (category) {
    case 'Emergency':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Water':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Education':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Food':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Healthcare':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Children':
      return 'bg-pink-100 text-pink-800 border-pink-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getCategoryColor = (category) => {
  const colorMap = {
    'Emergency': 'red',
    'Water': 'blue',
    'Education': 'green',
    'Food': 'orange',
    'Healthcare': 'purple',
    'Children': 'pink',
    'Orphans': 'indigo',
    'Family': 'teal',
    'Ramadan': 'cyan',
    'Zakat': 'emerald',
    'Sadaqah': 'amber',
    'Waqf': 'violet',
    'Microfinance': 'rose',
    'Skills Training': 'lime',
    'Medical': 'fuchsia',
    'Nursing': 'sky',
    'Administration': 'slate',
    'Security': 'stone',
    'Verification': 'zinc',
    'Monitoring': 'neutral',
    'Coordination': 'gray',
    'Recruitment': 'cool',
    'Reduction': 'warm',
    'Restriction': 'light',
    'Intelligence': 'dark',
    'Special Operations': 'primary',
    'Space Operations': 'secondary',
    'Alien Operations': 'accent',
    'Robotic Operations': 'info'
  };
  
  return colorMap[category] || 'gray';
}; 