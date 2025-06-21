import React from 'react';
import './BirdCard.css';

const BirdCard = ({ 
  bird, 
  scale = 1, 
  position, // Keep position prop for backward compatibility
  isHovered, 
  onMouseEnter, 
  onMouseLeave, 
  onClick 
}) => {
  // Use position prop if provided, otherwise fall back to bird.gridPosition
  const { x, y } = position ? 
    { x: position.left, y: position.top } : 
    (bird.gridPosition || { x: 0, y: 0 });
  
  return (
    <div
      className="bird-card-container"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: isHovered ? 15 : scale > 1 ? 10 : 5,
        position: 'absolute', // Ensure absolute positioning
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="bird-card">
        <div className="bird-image">
          <img
            src={bird.image}
            alt={bird.name}
          />
        </div>
        
        {isHovered && (
          <div className="bird-tooltip">
            <div className="bird-name">{bird.name}</div>
            <div className="bird-species">{bird.species}</div>
            <div className="tooltip-arrow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirdCard;