import React from 'react';

const patternStyle = {
  width: '100%',
  height: '100%',
  opacity: 0.1
};

export const Arabesque = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `radial-gradient(circle at 8px 8px, currentColor 1px, transparent 1px)`,
    backgroundSize: '30px 30px'
  }} />
);

export const Geometric = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px),
                     linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
    backgroundSize: '20px 20px'
  }} />
);

export const Dots = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `radial-gradient(circle at 5px 5px, currentColor 1px, transparent 1px)`,
    backgroundSize: '20px 20px'
  }} />
);

export const Grid = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
                     linear-gradient(90deg, currentColor 1px, transparent 1px)`,
    backgroundSize: '20px 20px'
  }} />
);

export const Islamic = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px),
                     linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
    backgroundSize: '20px 20px'
  }} />
);

export const Mosaic = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `radial-gradient(circle at 0px 0px, transparent 8px, currentColor 9px, currentColor 10px, transparent 11px)`,
    backgroundSize: '30px 30px'
  }} />
);

export const Hexagon = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `radial-gradient(circle at 10px 15px, currentColor 2px, transparent 2px)`,
    backgroundSize: '20px 30px'
  }} />
);

export const Floral = () => (
  <div style={{
    ...patternStyle,
    backgroundImage: `radial-gradient(circle at 5px 5px, currentColor 1px, transparent 1px),
                     radial-gradient(circle at 10px 10px, currentColor 1px, transparent 2px)`,
    backgroundSize: '20px 20px'
  }} />
); 