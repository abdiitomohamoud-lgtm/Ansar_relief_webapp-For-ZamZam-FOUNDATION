/**
 * Color utility functions for better contrast and readability
 * These functions can be imported and used across components
 */

// Text gradient classes for various color schemes
export const getTextGradient = (color) => {
  switch(color) {
    case 'primary':
      return 'bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-300 dark:to-primary-500';
    case 'secondary':
      return 'bg-gradient-to-r from-secondary-700 to-secondary-500 dark:from-secondary-300 dark:to-secondary-500';
    case 'accent':
      return 'bg-gradient-to-r from-accent-700 to-accent-500 dark:from-accent-300 dark:to-accent-500';
    case 'emerald':
      return 'bg-gradient-to-r from-emerald-700 to-emerald-500 dark:from-emerald-300 dark:to-emerald-500';
    case 'amber':
      return 'bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-300 dark:to-amber-500';
    case 'violet':
      return 'bg-gradient-to-r from-violet-700 to-violet-500 dark:from-violet-300 dark:to-violet-500';
    case 'cyan':
      return 'bg-gradient-to-r from-cyan-700 to-cyan-500 dark:from-cyan-300 dark:to-cyan-500';
    default:
      return 'bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-300 dark:to-primary-500';
  }
};

// Text colors with improved contrast for light/dark modes
export const getTextColor = (color) => {
  switch(color) {
    case 'primary':
      return 'text-primary-700 dark:text-primary-300';
    case 'secondary':
      return 'text-secondary-700 dark:text-secondary-300';
    case 'accent':
      return 'text-accent-700 dark:text-accent-300';
    case 'emerald':
      return 'text-emerald-700 dark:text-emerald-300';
    case 'violet':
      return 'text-violet-700 dark:text-violet-300';
    case 'amber':
      return 'text-amber-700 dark:text-amber-300';
    case 'cyan':
      return 'text-cyan-700 dark:text-cyan-300';
    default:
      return 'text-primary-700 dark:text-primary-300';
  }
};

// Background gradient styles with improved contrast
export const getGradient = (color) => {
  switch(color) {
    case 'primary':
      return 'from-primary-700 via-primary-600 to-primary-800';
    case 'secondary':
      return 'from-secondary-700 via-secondary-600 to-secondary-800';
    case 'accent':
      return 'from-accent-700 via-accent-600 to-accent-800';
    case 'emerald':
      return 'from-emerald-700 via-emerald-600 to-emerald-800';
    case 'violet':
      return 'from-violet-700 via-violet-600 to-violet-800';
    case 'amber':
      return 'from-amber-700 via-amber-600 to-amber-800';
    case 'cyan':
      return 'from-cyan-700 via-cyan-600 to-cyan-800';
    default:
      return 'from-primary-700 via-primary-600 to-primary-800';
  }
};

// Background colors for cards, optimized for light/dark modes
export const getBackgroundColor = (color) => {
  switch(color) {
    case 'primary':
      return 'bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    case 'secondary':
      return 'bg-gradient-to-br from-secondary-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    case 'accent':
      return 'bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    case 'violet':
      return 'bg-gradient-to-br from-violet-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    case 'amber':
      return 'bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    case 'cyan':
      return 'bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-900/95';
    default:
      return 'bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900/95';
  }
};

// Border color styles
export const getBorderColor = (color) => {
  switch(color) {
    case 'primary':
      return 'border-l-4 border-primary-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    case 'secondary':
      return 'border-l-4 border-secondary-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    case 'accent':
      return 'border-l-4 border-accent-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    case 'emerald':
      return 'border-l-4 border-emerald-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    case 'violet':
      return 'border-l-4 border-violet-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    case 'amber':
      return 'border-l-4 border-amber-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    case 'cyan':
      return 'border-l-4 border-cyan-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
    default:
      return 'border-l-4 border-primary-600 border-t border-r border-b border-gray-100 dark:border-t dark:border-r dark:border-b dark:border-gray-700';
  }
};

// Get category badge style for news and campaigns
export const getCategoryBadgeStyle = (category) => {
  const categories = {
    "Water & Sanitation": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    "Education": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    "Food Security": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    "Medical Relief": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    "Emergency Relief": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    "Child Welfare": "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300"
  };
  
  return categories[category] || "bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-300";
};

// Get urgency badge style
export const getUrgencyBadgeStyle = (urgency) => {
  switch(urgency) {
    case 'Critical':
      return 'bg-red-600 text-white';
    case 'High':
      return 'bg-orange-500 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-gray-900';
    default:
      return 'bg-green-500 text-white';
  }
};

// Get card accent color
export const getCardAccent = (color) => {
  switch(color) {
    case 'primary':
      return 'border-primary-500 text-primary-700 dark:text-primary-300';
    case 'secondary':
      return 'border-secondary-500 text-secondary-700 dark:text-secondary-300';
    case 'accent':
      return 'border-accent-500 text-accent-700 dark:text-accent-300';
    case 'emerald':
      return 'border-emerald-500 text-emerald-700 dark:text-emerald-300';
    case 'violet':
      return 'border-violet-500 text-violet-700 dark:text-violet-300';
    case 'amber':
      return 'border-amber-500 text-amber-700 dark:text-amber-300';
    case 'cyan':
      return 'border-cyan-500 text-cyan-700 dark:text-cyan-300';
    default:
      return 'border-primary-500 text-primary-700 dark:text-primary-300';
  }
};

// Get card gradient based on campaign color
export const getCardGradient = (color) => {
  switch(color) {
    case 'primary':
      return 'from-primary-600 to-primary-400';
    case 'secondary':
      return 'from-secondary-600 to-secondary-400';
    case 'accent':
      return 'from-accent-600 to-accent-400';
    case 'emerald':
      return 'from-emerald-600 to-emerald-400';
    case 'violet':
      return 'from-violet-600 to-violet-400';
    case 'amber':
      return 'from-amber-600 to-amber-400';
    case 'cyan':
      return 'from-cyan-600 to-cyan-400';
    default:
      return 'from-primary-600 to-primary-400';
  }
}; 