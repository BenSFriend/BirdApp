import React, { useState, useEffect } from 'react';
import BirdCard from '../BirdCard/BirdCard';
import BirdDetail from '../BirdDetail/BirdDetail.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import GridBackground from '../Grid/GridBackground';
import { useBirds } from '../../hooks/useBirds';
import { useGrid } from '../../hooks/useGrids.js';
import './BirdGallery.css';

const BirdGallery = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });

  // Get container dimensions for proper positioning
  useEffect(() => {
    const updateSize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Use birds hook with container dimensions
  const {
    filteredBirds,
    loading,
    searchTerm,
    setSearchTerm,
    loadBirds
  } = useBirds(containerSize.width, containerSize.height);

  // Use grid hook for grid-related state and functions
  const {
    hoveredBird,
    setHoveredBird,
    selectedBird,
    setSelectedBird,
  } = useGrid();

  useEffect(() => {
    loadBirds();
  }, [loadBirds]);

  const handleBirdClick = (bird) => {
    setSelectedBird(bird);
  };

  const closeBirdDetail = () => {
    setSelectedBird(null);
  };

  if (selectedBird) {
    return (
      <BirdDetail 
        bird={selectedBird} 
        onClose={closeBirdDetail} 
      />
    );
  }

  return (
    <div className="bird-gallery">
      <SearchBar
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <GridBackground />

      <div className="birds-container">
        {filteredBirds.map((bird) => {
          const scale = getScale(bird.id, bird.gridPosition, hoveredBird);
          
          // Use the calculated x, y positions from the grid hook
          const left = bird.gridPosition.x;
          const top = bird.gridPosition.y;
          
          return (
            <BirdCard
              key={bird.id}
              bird={bird}
              scale={scale}
              position={{ left, top }}
              isHovered={hoveredBird?.id === bird.id}
              onMouseEnter={() => setHoveredBird({ id: bird.id, position: bird.gridPosition })}
              onMouseLeave={() => setHoveredBird(null)}
              onClick={() => handleBirdClick(bird)}
            />
          );
        })}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
        </div>
      )}

      {searchMode && filteredBirds.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-message">
            <p>No birds found matching your search.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdGallery;