// Pattern variations
export const patterns = {
  dots: {
    light: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'0.2\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
    dark: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000\' fill-opacity=\'0.2\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
  },
  grid: {
    light: `
      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
    `,
    dark: `
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
    `
  },
  diagonal: {
    light: `repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.1),
      rgba(255,255,255,0.1) 1px,
      transparent 1px,
      transparent 4px
    )`,
    dark: `repeating-linear-gradient(
      45deg,
      rgba(0,0,0,0.1),
      rgba(0,0,0,0.1) 1px,
      transparent 1px,
      transparent 4px
    )`
  },
  hexagons: {
    light: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23fff\' fill-opacity=\'0.2\' d=\'M12 0l10.392 6v12L12 24 1.608 18V6z\'/%3E%3C/svg%3E")',
    dark: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23000\' fill-opacity=\'0.2\' d=\'M12 0l10.392 6v12L12 24 1.608 18V6z\'/%3E%3C/svg%3E")'
  },
  waves: {
    light: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23fff\' fill-opacity=\'0.2\' d=\'M0 10c30 0 30-10 60-10s30 10 60 10 30-10 60-10v10H0z\'/%3E%3C/svg%3E")',
    dark: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23000\' fill-opacity=\'0.2\' d=\'M0 10c30 0 30-10 60-10s30 10 60 10 30-10 60-10v10H0z\'/%3E%3C/svg%3E")'
  }
};

// Animation presets
export const animations = {
  gentle: {
    type: "spring",
    stiffness: 300,
    damping: 15
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 8
  },
  smooth: {
    type: "tween",
    duration: 0.3,
    ease: "easeOut"
  },
  elastic: {
    type: "spring",
    stiffness: 200,
    damping: 12,
    mass: 0.5
  }
};

// Color theme combinations
export const colorThemes = {
  primary: {
    bg: 'bg-blue-600',
    text: 'text-white',
    hover: 'hover:bg-blue-700',
    focus: 'focus:ring-blue-500'
  },
  secondary: {
    bg: 'bg-gray-600',
    text: 'text-white',
    hover: 'hover:bg-gray-700',
    focus: 'focus:ring-gray-500'
  },
  success: {
    bg: 'bg-green-600',
    text: 'text-white',
    hover: 'hover:bg-green-700',
    focus: 'focus:ring-green-500'
  },
  warning: {
    bg: 'bg-yellow-500',
    text: 'text-gray-900',
    hover: 'hover:bg-yellow-600',
    focus: 'focus:ring-yellow-500'
  },
  danger: {
    bg: 'bg-red-600',
    text: 'text-white',
    hover: 'hover:bg-red-700',
    focus: 'focus:ring-red-500'
  },
  info: {
    bg: 'bg-cyan-600',
    text: 'text-white',
    hover: 'hover:bg-cyan-700',
    focus: 'focus:ring-cyan-500'
  },
  light: {
    bg: 'bg-gray-100',
    text: 'text-gray-900',
    hover: 'hover:bg-gray-200',
    focus: 'focus:ring-gray-400'
  },
  dark: {
    bg: 'bg-gray-800',
    text: 'text-white',
    hover: 'hover:bg-gray-900',
    focus: 'focus:ring-gray-700'
  },
  purple: {
    bg: 'bg-purple-600',
    text: 'text-white',
    hover: 'hover:bg-purple-700',
    focus: 'focus:ring-purple-500'
  },
  emerald: {
    bg: 'bg-emerald-600',
    text: 'text-white',
    hover: 'hover:bg-emerald-700',
    focus: 'focus:ring-emerald-500'
  }
}; 