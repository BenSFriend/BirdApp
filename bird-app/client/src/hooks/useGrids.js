import { useState, useCallback, useRef } from 'react';

const useGrid = () => {
  const [hoveredBird, setHoveredBird] = useState(null);
  const [selectedBird, setSelectedBird] = useState(null);
  const [gridSize] = useState({ cols: 20, rows: 20 }); // 400 positions instead of 150


  // Use useRef to maintain occupied positions across renders
  const occupiedPositions = useRef(new Set());
  // Keep track of position assignment order for systematic filling
  const positionQueue = useRef([]);

  // Initialize position queue in a systematic order (left to right, top to bottom)
  const initializePositionQueue = useCallback(() => {
    if (positionQueue.current.length === 0) {
      console.log('Initializing position queue...');
      for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
          positionQueue.current.push({ col, row });
        }
      }
      // Shuffle the queue to make it look more random while still being systematic
      for (let i = positionQueue.current.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positionQueue.current[i], positionQueue.current[j]] = [positionQueue.current[j], positionQueue.current[i]];
      }
      console.log(`Position queue initialized with ${positionQueue.current.length} positions`);
    }
  }, [gridSize.cols, gridSize.rows]);

  const generateRandomPosition = useCallback((containerWidth, containerHeight) => {
    initializePositionQueue();
    
    console.log('Generating position for container:', containerWidth, 'x', containerHeight);
    console.log('Occupied positions:', occupiedPositions.current.size, '/', gridSize.cols * gridSize.rows);

    // Try to get next available position from queue first
    while (positionQueue.current.length > 0) {
      const position = positionQueue.current.shift();
      const posKey = `${position.col}-${position.row}`;
      
      if (!occupiedPositions.current.has(posKey)) {
        occupiedPositions.current.add(posKey);
        
        // Calculate actual pixel positions with proper spacing
        const padding = 60; // Reduced padding for more space
        const availableWidth = containerWidth - padding * 2;
        const availableHeight = containerHeight - padding * 2;
        
        // Add extra spacing between cards to prevent overlap
        const cardSpacing = 10;
        const effectiveCellWidth = availableWidth / gridSize.cols;
        const effectiveCellHeight = availableHeight / gridSize.rows;
        
        const x = padding + (position.col * effectiveCellWidth) + (effectiveCellWidth / 2);
        const y = padding + (position.row * effectiveCellHeight) + (effectiveCellHeight / 2);

        console.log(`Generated position: col=${position.col}, row=${position.row}, x=${x}, y=${y}`);
        return { col: position.col, row: position.row, x, y };
      }
    }

    // If we get here, all grid positions are occupied
    console.warn('All grid positions occupied! This should not happen with proper grid sizing.');
    
    // Emergency fallback: create a new row at the bottom
    const emergencyRow = gridSize.rows + Math.floor(occupiedPositions.current.size / gridSize.cols);
    const emergencyCol = occupiedPositions.current.size % gridSize.cols;
    
    const padding = 60;
    const availableWidth = containerWidth - padding * 2;
    const effectiveCellWidth = availableWidth / gridSize.cols;
    const baseHeight = containerHeight - padding * 2;
    const effectiveCellHeight = baseHeight / gridSize.rows;
    
    const x = padding + (emergencyCol * effectiveCellWidth) + (effectiveCellWidth / 2);
    const y = padding + (emergencyRow * effectiveCellHeight) + (effectiveCellHeight / 2);
    
    console.log(`Emergency position: col=${emergencyCol}, row=${emergencyRow}, x=${x}, y=${y}`);
    return { col: emergencyCol, row: emergencyRow, x, y };
  }, [gridSize.cols, gridSize.rows, initializePositionQueue]);

  const clearOccupiedPositions = useCallback(() => {
    console.log('Clearing occupied positions and resetting position queue');
    occupiedPositions.current.clear();
    positionQueue.current = []; // Reset the queue so it gets reinitialized
  }, []);

  // Debug function to check grid state
  const getGridState = useCallback(() => {
    return {
      totalPositions: gridSize.cols * gridSize.rows,
      occupiedPositions: occupiedPositions.current.size,
      availablePositions: positionQueue.current.length,
      gridSize
    };
  }, [gridSize]);

  return {
    hoveredBird,
    setHoveredBird,
    selectedBird,
    setSelectedBird,
    gridSize,
    generateRandomPosition,
    clearOccupiedPositions,
    getGridState // Export for debugging
  };
};

export { useGrid };