import { useState, useCallback, useRef } from 'react';

const useGrid = () => {
  const [hoveredBird, setHoveredBird] = useState(null);
  const [selectedBird, setSelectedBird] = useState(null);
  const [gridSize] = useState({ cols: 12, rows: 8 });

  // Use useRef to maintain occupied positions across renders
  const occupiedPositions = useRef(new Set());

  const generateRandomPosition = useCallback((containerWidth, containerHeight) => {
    console.log('Generating position for container:', containerWidth, 'x', containerHeight);
    console.log('Current occupied positions:', Array.from(occupiedPositions.current));

    let attempts = 0;
    while (attempts < 100) {
      const col = Math.floor(Math.random() * gridSize.cols);
      const row = Math.floor(Math.random() * gridSize.rows);
      const posKey = `${col}-${row}`;

      if (!occupiedPositions.current.has(posKey)) {
        occupiedPositions.current.add(posKey);

        // Calculate positions to spread across the full container
        const padding = 100;
        const cellWidth = (containerWidth - padding * 2) / gridSize.cols;
        const cellHeight = (containerHeight - padding * 2) / gridSize.rows;

        const x = padding + (col * cellWidth) + (cellWidth / 2);
        const y = padding + (row * cellHeight) + (cellHeight / 2);

        console.log(`Generated position: col=${col}, row=${row}, x=${x}, y=${y}`);

        return { col, row, x, y };
      }
      attempts++;
    }

    // Fallback: find first available position
    console.log('Max attempts reached, finding first available position');
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        const posKey = `${col}-${row}`;
        if (!occupiedPositions.current.has(posKey)) {
          occupiedPositions.current.add(posKey);

          const padding = 100;
          const cellWidth = (containerWidth - padding * 2) / gridSize.cols;
          const cellHeight = (containerHeight - padding * 2) / gridSize.rows;

          const x = padding + (col * cellWidth) + (cellWidth / 2);
          const y = padding + (row * cellHeight) + (cellHeight / 2);

          console.log(`Fallback position: col=${col}, row=${row}, x=${x}, y=${y}`);
          return { col, row, x, y };
        }
      }
    }

    console.log('All positions occupied, using default');
    return { col: 0, row: 0, x: 150, y: 150 };
  }, [gridSize.cols, gridSize.rows]);

  const clearOccupiedPositions = useCallback(() => {
    console.log('Clearing occupied positions');
    occupiedPositions.current.clear();
  }, []);

  return {
    hoveredBird,
    setHoveredBird,
    selectedBird,
    setSelectedBird,
    gridSize,
    generateRandomPosition,
    clearOccupiedPositions
  };
};

export { useGrid };