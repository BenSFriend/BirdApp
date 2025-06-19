import { useState } from 'react';

const useGrid = () => {
  const [hoveredBird, setHoveredBird] = useState(null);
  const [selectedBird, setSelectedBird] = useState(null);
  const [occupiedPositions, setOccupiedPositions] = useState(new Set());
  const [gridSize] = useState({ cols: 12, rows: 8 });

  const generateRandomPosition = (containerWidth, containerHeight) => {
    let attempts = 0;
    while (attempts < 100) {
      const col = Math.floor(Math.random() * gridSize.cols);
      const row = Math.floor(Math.random() * gridSize.rows);
      const posKey = `${col}-${row}`;
      
      if (!occupiedPositions.has(posKey)) {
        setOccupiedPositions(prev => new Set([...prev, posKey]));
        
        const x = (col / (gridSize.cols - 1)) * (containerWidth - 100);
        const y = (row / (gridSize.rows - 1)) * (containerHeight - 100);
        
        return { col, row, x, y };
      }
      attempts++;
    }
    
    return { col: 0, row: 0, x: 0, y: 0 };
  };

  return {
    hoveredBird,
    setHoveredBird,
    selectedBird,
    setSelectedBird,
    gridSize,
    occupiedPositions,
    setOccupiedPositions,
    generateRandomPosition
  };
};

export { useGrid };