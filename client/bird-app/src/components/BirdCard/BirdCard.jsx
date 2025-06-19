import React from 'react';
import './BirdCard.css';

const BirdCard = ({
  bird,
  scale,
  position,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  return (
    <div
      className="bird-card-container"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: isHovered ? 15 : scale > 1 ? 10 : 5,
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