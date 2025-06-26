import React, { useRef, useEffect } from 'react';
import './BirdCard.css';

const useRadialMagnification = (cardRef) => {
  const getCardCenter = (card) => {
    const rect = card.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  const getDistance = (pos1, pos2) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleHover = (hoveredCard) => {
    // Find all cards in the same container
    const container = hoveredCard.closest('.bird-grid') || hoveredCard.parentElement;
    const allCards = container.querySelectorAll('.bird-card-container');
    const hoveredCenter = getCardCenter(hoveredCard);

    // Calculate distances and sort by proximity
    const cardDistances = Array.from(allCards).map(card => ({
      card,
      distance: card === hoveredCard ? 0 : getDistance(hoveredCenter, getCardCenter(card))
    })).sort((a, b) => a.distance - b.distance);

    cardDistances.forEach(({ card, distance }) => {
      const tooltip = card.querySelector('.bird-tooltip');

      if (card === hoveredCard) {
        // Hovered card grows MUCH larger
        card.style.transform = `translate(-50%, -50%) scale(2.5)`;
        card.style.opacity = '1';
        card.style.zIndex = '20';

        // Show tooltip for hovered card
        if (tooltip) {
          tooltip.style.opacity = '1';
        }
      } else {
        // Hide tooltip for non-hovered cards
        if (tooltip) {
          tooltip.style.opacity = '0';
        }

        // Create much more dramatic exponential decay
        const maxDistance = 400; // Reduced for tighter effect range
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const falloff = Math.pow(normalizedDistance, 0.6); // Gentler power for smoother falloff

        // Much more dramatic scaling - like macOS dock
        const scale = 1 + (1 - falloff) * 1.5; // Can grow up to 2.5x for closest neighbors
        const opacity = 1 - (falloff * 0.7); // 70% max opacity reduction
        const translateY = falloff * 20; // More pronounced vertical offset

        // Ensure minimum values but allow for dramatic scaling
        const finalScale = Math.max(scale, 0.3); // Can shrink to 30% for distant cards
        const finalOpacity = Math.max(opacity, 0.2);

        card.style.transform = `translate(-50%, -50%) scale(${finalScale}) translateY(${translateY}px)`;
        card.style.opacity = finalOpacity;
        card.style.zIndex = Math.round(10 - falloff * 8); // Closer cards have higher z-index
      }
    });
  };

  const resetCards = () => {
    const card = cardRef.current;
    if (!card) return;

    const container = card.closest('.bird-grid') || card.parentElement;
    const allCards = container.querySelectorAll('.bird-card-container');

    allCards.forEach(card => {
      // Reset to clean transform
      card.style.transform = 'translate(-50%, -50%) scale(1)';
      card.style.opacity = '1';
      card.style.zIndex = 'auto';

      // Hide all tooltips
      const tooltip = card.querySelector('.bird-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
      }
    });
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set up base styles for smooth macOS dock-like animation
    card.style.transition = 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1)'; // Smoother easing
    card.style.transformOrigin = 'center bottom'; // Anchor to bottom like dock

    const handleMouseEnter = () => handleHover(card);
    const handleMouseLeave = resetCards;

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

const BirdCard = ({
  bird,
  scale = 1,
  position, // Keep position prop for backward compatibility
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const cardRef = useRef(null);

  // Use the radial magnification effect
  useRadialMagnification(cardRef);

  // Use position prop if provided, otherwise fall back to bird.gridPosition
  const { x, y } = position ?
    { x: position.left, y: position.top } :
    (bird.gridPosition || { x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="bird-card-container"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 5, // Let radial magnification handle z-index
        position: 'absolute',
      }}
      onClick={onClick}
    >
      <div className="bird-card">
        <div className="bird-image">
          <img
            src={bird.img_url}
            alt={bird.bird_name}
          />
        </div>

        {/* Show tooltip on magnification hover instead of isHovered prop */}
        <div className="bird-tooltip" style={{
          opacity: 0,
          transition: 'opacity 1.1s ease',
          pointerEvents: 'none'
        }}>
          <div className="bird-name">{bird.bird_name}</div>
          <div className="bird-range">Range- {bird.bird_range}</div>
          <div className="bird-diet">Diet- {bird.bird_diet}</div>
          <div className="tooltip-arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default BirdCard;