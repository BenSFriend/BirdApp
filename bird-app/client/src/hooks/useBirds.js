import { useState, useEffect, useCallback } from 'react';
import { loadBirdsFromApi } from '../services/birdAPI';
import { useGrid } from './useGrids';

export const useBirds = (containerWidth = 1200, containerHeight = 800) => {
  const [birds, setBirds] = useState([]);
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Use the grid hook for all grid-related functionality
  const { generateRandomPosition, clearOccupiedPositions } = useGrid();

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

  const clearError = () => {
    setError(null);
  };

  const loadBirds = useCallback(async (isRetry = false) => {
    // Clear previous error when starting a new load
    if (!isRetry) {
      setError(null);
      setRetryCount(0);
      // Clear occupied positions when loading new birds
      clearOccupiedPositions();
    }

    setLoading(true);
    
    try {
      const newBirds = await loadBirdsFromApi();
      
      // Validate the response
      if (!Array.isArray(newBirds)) {
        throw new Error('Invalid response format: expected an array of birds');
      }

      if (newBirds.length === 0) {
        throw new Error('No birds data received from API');
      }

      // Process birds with error handling for position generation
      const birdsWithPositions = newBirds.map((bird, index) => {
        try {
          // Validate bird data structure
          if (!bird || typeof bird !== 'object') {
            throw new Error(`Invalid bird data at index ${index}`);
          }

          if (!bird.name || !bird.species) {
            console.warn(`Bird at index ${index} missing required fields:`, bird);
          }

          // Use the grid hook's position generation
          const gridPosition = generateRandomPosition(containerWidth, containerHeight);
          
          console.log(`Bird ${index} (${bird.name}) positioned at:`, gridPosition); // Debug log
          
          return {
            ...bird,
            id: bird.id || `bird-${Date.now()}-${index}`, // Ensure unique ID
            gridPosition,
            // Ensure required fields have fallback values
            name: bird.name || `Unknown Bird ${index + 1}`,
            species: bird.species || 'Unknown Species'
          };
        } catch (positionError) {
          console.error(`Error processing bird at index ${index}:`, positionError);
          // Return bird with default position if position generation fails
          return {
            ...bird,
            id: bird.id || `bird-${Date.now()}-${index}`,
            gridPosition: { col: 0, row: 0, x: 0, y: 0 }, // Default position with all required fields
            name: bird.name || `Unknown Bird ${index + 1}`,
            species: bird.species || 'Unknown Species'
          };
        }
      });
      
      // Replace birds instead of appending (this was causing duplicates)
      setBirds(birdsWithPositions);
      setFilteredBirds(birdsWithPositions);
      
      // Reset retry count on success
      setRetryCount(0);
      
    } catch (error) {
      console.error('Error loading birds:', error);
      
      const errorMessage = error.message || 'Failed to load birds';
      
      // Determine if this is a retryable error
      const isRetryable = 
        error.name === 'TypeError' || // Network errors
        error.name === 'NetworkError' ||
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.status >= 500; // Server errors

      if (isRetryable && retryCount < MAX_RETRIES) {
        const newRetryCount = retryCount + 1;
        setRetryCount(newRetryCount);
        
        console.log(`Retrying... Attempt ${newRetryCount}/${MAX_RETRIES}`);
        
        // Retry after delay
        setTimeout(() => {
          loadBirds(true);
        }, RETRY_DELAY * newRetryCount); // Exponential backoff
        
        setError({
          message: `${errorMessage}. Retrying... (${newRetryCount}/${MAX_RETRIES})`,
          type: 'retrying',
          originalError: error
        });
      } else {
        // Set final error state
        setError({
          message: retryCount >= MAX_RETRIES 
            ? `Failed to load birds after ${MAX_RETRIES} attempts: ${errorMessage}`
            : errorMessage,
          type: retryCount >= MAX_RETRIES ? 'max_retries_exceeded' : 'fatal',
          originalError: error,
          retryCount
        });
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount, generateRandomPosition, containerWidth, containerHeight, clearOccupiedPositions]);

  // Search functionality with error handling
  useEffect(() => {
    try {
      if (!Array.isArray(birds)) {
        console.error('Birds data is not an array:', birds);
        setFilteredBirds([]);
        return;
      }

      if (searchTerm && typeof searchTerm === 'string') {
        const filtered = birds.filter(bird => {
          try {
            if (!bird || typeof bird !== 'object') {
              return false;
            }

            const name = bird.name || '';
            const species = bird.species || '';
            const searchLower = searchTerm.toLowerCase();
            
            return name.toLowerCase().includes(searchLower) ||
                   species.toLowerCase().includes(searchLower);
          } catch (filterError) {
            console.warn('Error filtering bird:', bird, filterError);
            return false;
          }
        });
        setFilteredBirds(filtered);
      } else {
        setFilteredBirds(birds);
      }
    } catch (error) {
      console.error('Error in search effect:', error);
      setFilteredBirds(birds); // Fallback to showing all birds
    }
  }, [searchTerm, birds]);

  // Retry function for manual retries
  const retryLoad = () => {
    setRetryCount(0);
    loadBirds();
  };

  return {
    birds,
    filteredBirds,
    loading,
    searchTerm,
    setSearchTerm,
    loadBirds,
    error,
    clearError,
    retryLoad,
    retryCount,
    maxRetries: MAX_RETRIES
  };
};

export default { useBirds };