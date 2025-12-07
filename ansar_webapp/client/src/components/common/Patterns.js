import React from 'react';
import './Patterns.css';
import { ReactComponent as IslamicPatternSVG } from '../../assets/patterns/islamic-pattern.svg';
import { ReactComponent as IslamicStarPatternSVG } from '../../assets/patterns/islamic-star.svg';
import { ReactComponent as ArabesquePatternSVG } from '../../assets/patterns/arabesque.svg';
import { ReactComponent as GeometricPatternSVG } from '../../assets/patterns/geometric.svg';
import { ReactComponent as FloralPatternSVG } from '../../assets/patterns/floral.svg';
import { ReactComponent as HexagonPatternSVG } from '../../assets/patterns/hexagon.svg';
import { ReactComponent as DotsPatternSVG } from '../../assets/patterns/dots.svg';
import { ReactComponent as GridPatternSVG } from '../../assets/patterns/grid.svg';
import { ReactComponent as MosaicPatternSVG } from '../../assets/patterns/mosaic.svg';

// Import individual components
import Pattern from './Pattern';
import PatternBackground from './PatternBackground';
import PatternImage from './PatternImage';

// Export individual components
export { Pattern, PatternBackground, PatternImage };

// Export individual pattern SVG components
export const IslamicPatternComponent = () => (
  <div className="pattern-container">
    <IslamicPatternSVG className="pattern-svg" />
  </div>
);

export const IslamicStarPatternComponent = () => (
  <div className="pattern-container">
    <IslamicStarPatternSVG className="pattern-svg" />
  </div>
);

export const ArabesquePatternComponent = () => (
  <div className="pattern-container">
    <ArabesquePatternSVG className="pattern-svg" />
  </div>
);

export const GeometricPatternComponent = () => (
  <div className="pattern-container">
    <GeometricPatternSVG className="pattern-svg" />
  </div>
);

export const FloralPatternComponent = () => (
  <div className="pattern-container">
    <FloralPatternSVG className="pattern-svg" />
  </div>
);

export const HexagonPatternComponent = () => (
  <div className="pattern-container">
    <HexagonPatternSVG className="pattern-svg" />
  </div>
);

export const DotsPatternComponent = () => (
  <div className="pattern-container">
    <DotsPatternSVG className="pattern-svg" />
  </div>
);

export const GridPatternComponent = () => (
  <div className="pattern-container">
    <GridPatternSVG className="pattern-svg" />
  </div>
);

export const MosaicPatternComponent = () => (
  <div className="pattern-container">
    <MosaicPatternSVG className="pattern-svg" />
  </div>
);

// Export a default object with all components
const Patterns = {
  Pattern,
  Background: PatternBackground,
  Image: PatternImage,
  Islamic: IslamicPatternComponent,
  IslamicStar: IslamicStarPatternComponent,
  Arabesque: ArabesquePatternComponent,
  Geometric: GeometricPatternComponent,
  Floral: FloralPatternComponent,
  Hexagon: HexagonPatternComponent,
  Dots: DotsPatternComponent,
  Grid: GridPatternComponent,
  Mosaic: MosaicPatternComponent
};

export default Patterns; 