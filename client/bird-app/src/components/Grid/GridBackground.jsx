import React from 'react';
import { CELL_SIZE } from '../../utils/constants';
import './GridBackground.css';

const GridBackground = () => {
  return (
    <div 
      className="grid-background"
      style={{
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
      }}
    />
  );
};

export default GridBackground;