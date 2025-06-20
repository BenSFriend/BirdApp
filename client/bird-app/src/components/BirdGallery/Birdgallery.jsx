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
  const getScale = (birdId, gridPosition, hoveredBird) => {
    // Return default scale if no bird is hovered
    if (!hoveredBird) return 1;
    
    // Scale up the hovered bird
    if (hoveredBird.id === birdId) return 1.1;
    
    // Scale down other birds slightly when one is hovered
    return 0.95;
  };

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
   console.log('Container size:', containerSize);
   console.log('Filtered birds count:', filteredBirds.length);
   console.log('Bird positions:', filteredBirds.map(bird => ({
     id: bird.id,
     name: bird.name,
     col: bird.gridPosition.col,
     row: bird.gridPosition.row,
     x: bird.gridPosition.x,
     y: bird.gridPosition.y
   })));

    const scale = getScale(bird.id, bird.gridPosition, hoveredBird);
  
      return (
        <BirdCard
        key={bird.id}
        bird={bird}
        scale={scale}
        // Remove the position prop - let BirdCard use bird.gridPosition directly
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