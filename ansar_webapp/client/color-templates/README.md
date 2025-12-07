# Color Utilities for ANSAR Webapp

This directory contains utility functions for consistent color handling across the ANSAR webapp components.

## Purpose

The color utilities provide consistent colors and contrasts for both light and dark themes, ensuring:

- Text is always readable against backgrounds
- Components maintain visual hierarchy
- Colors follow accessibility standards for contrast
- Dark/light mode transitions are smooth and consistent

## How to Use

Import the functions you need in your component:

```jsx
import {
  getTextColor,
  getTextGradient,
  getBackgroundColor,
  getCardAccent,
  getCategoryBadgeStyle,
} from "../../color-templates/color-utils";
```

Then use them in your component:

```jsx
// For text colors
<p className={getTextColor('primary')}>This text will have proper contrast</p>

// For gradient text
<h2 className={`${getTextGradient('accent')} bg-clip-text text-transparent`}>
  Gradient Heading
</h2>

// For backgrounds
<div className={getBackgroundColor('emerald')}>
  Card content
</div>

// For card accents
<span className={getCardAccent('secondary')}>
  Accent element
</span>

// For category badges
<span className={getCategoryBadgeStyle('Medical Relief')}>
  Medical Relief
</span>
```

## Available Functions

- `getTextGradient(color)` - Returns gradient text classes
- `getTextColor(color)` - Returns optimized text colors for light/dark modes
- `getGradient(color)` - Returns background gradient styles
- `getBackgroundColor(color)` - Returns background colors optimized for light/dark modes
- `getBorderColor(color)` - Returns border color styles
- `getCategoryBadgeStyle(category)` - Returns badge styles for campaign categories
- `getUrgencyBadgeStyle(urgency)` - Returns badge styles for urgency levels
- `getCardAccent(color)` - Returns accent colors for cards
- `getCardGradient(color)` - Returns gradient styles for cards

## Supported Colors

- primary
- secondary
- accent
- emerald
- violet
- amber
- cyan

## Supported Categories

- Water & Sanitation
- Education
- Food Security
- Medical Relief
- Emergency Relief
- Child Welfare

## Supported Urgency Levels

- Critical
- High
- Medium
- Low
