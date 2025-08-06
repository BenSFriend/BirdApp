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
  const { generateRandomPosition, clearOccupiedPositions, adjustGridSize } = useGrid();

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
      console.log('Starting bird load process...');
      const newBirds = await loadBirdsFromApi();
      
      // Enhanced validation
      if (!Array.isArray(newBirds)) {
        console.error('Invalid response format:', typeof newBirds, newBirds);
        throw new Error('Invalid response format: expected an array of birds');
      }

      if (newBirds.length === 0) {
        console.warn('No birds received from API');
        throw new Error('No birds data received from API');
      }

      console.log(`Processing ${newBirds.length} birds for grid positioning`);
      
      // Adjust grid size based on bird count (if using dynamic grid)
      if (adjustGridSize) {
        adjustGridSize(newBirds.length);
      }

      // Process birds with enhanced error handling
      const birdsWithPositions = [];
      let successCount = 0;
      let errorCount = 0;

      for (let index = 0; index < newBirds.length; index++) {
        const bird = newBirds[index];
        
        try {
          // Enhanced bird data validation
          if (!bird || typeof bird !== 'object') {
            throw new Error(`Invalid bird data at index ${index}: not an object`);
          }

          // Check for required fields
          const requiredFields = ['bird_name', 'id'];
          const missingFields = requiredFields.filter(field => !bird[field]);
          
          if (missingFields.length > 0) {
            console.warn(`Bird at index ${index} missing required fields:`, missingFields, bird);
          }

          // Generate grid position
          console.log(`Generating position for bird ${index}: ${bird.bird_name}`);
          const gridPosition = generateRandomPosition(containerWidth, containerHeight, newBirds.length);
          
          if (!gridPosition || typeof gridPosition.x !== 'number' || typeof gridPosition.y !== 'number') {
            throw new Error(`Invalid grid position generated for bird ${index}`);
          }
          
          const processedBird = {
            ...bird,
            id: bird.id || `bird-${Date.now()}-${index}`, // Ensure unique ID
            gridPosition,
            // Ensure required fields have fallback values
            bird_name: bird.bird_name || `Unknown Bird ${index + 1}`,
            bird_species: bird.bird_species || 'Unknown Species',
            img_url: bird.img_url || '',
            bird_range: bird.bird_range || 'Unknown Range',
            bird_diet: bird.bird_diet || 'Unknown Diet'
          };

          birdsWithPositions.push(processedBird);
          successCount++;
          
          console.log(`✓ Bird ${index} (${processedBird.bird_name}) positioned at:`, gridPosition);
          
        } catch (positionError) {
          console.error(`✗ Error processing bird at index ${index}:`, positionError);
          errorCount++;
          
          // Create fallback bird with safe default position
          const fallbackBird = {
            ...bird,
            id: bird.id || `bird-${Date.now()}-${index}`,
            gridPosition: { 
              col: index % 10, 
              row: Math.floor(index / 10), 
              x: 100 + ((index % 10) * 120), 
              y: 100 + (Math.floor(index / 10) * 120) 
            },
            bird_name: bird.bird_name || `Unknown Bird ${index + 1}`,
            bird_species: bird.bird_species || 'Unknown Species',
            img_url: bird.img_url || '',
            bird_range: bird.bird_range || 'Unknown Range',
            bird_diet: bird.bird_diet || 'Unknown Diet'
          };
          
          birdsWithPositions.push(fallbackBird);
          console.log(`Created fallback position for bird ${index}`);
        }
      }
      
      console.log(`Bird processing complete: ${successCount} successful, ${errorCount} errors`);
      console.log('Final birds with positions:', birdsWithPositions.length);
      
      // Validate final results
      if (birdsWithPositions.length === 0) {
        throw new Error('No birds could be processed successfully');
      }
      
      // Update state - replace birds instead of appending to prevent duplicates
      setBirds(birdsWithPositions);
      setFilteredBirds(birdsWithPositions);
      
      // Reset retry count on success
      setRetryCount(0);
      console.log('✓ Birds loaded successfully into state');
      
    } catch (error) {
      console.error('Error in loadBirds:', error);
      
      const errorMessage = error.message || 'Failed to load birds';
      
      // Determine if this is a retryable error
      const isRetryable = 
        error.name === 'TypeError' || // Network errors
        error.name === 'NetworkError' ||
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.message.includes('timeout') ||
        (error.response && error.response.status >= 500); // Server errors

      if (isRetryable && retryCount < MAX_RETRIES) {
        const newRetryCount = retryCount + 1;
        setRetryCount(newRetryCount);
        
        console.log(`Retrying... Attempt ${newRetryCount}/${MAX_RETRIES}`);
        
        // Retry after delay with exponential backoff
        setTimeout(() => {
          loadBirds(true);
        }, RETRY_DELAY * newRetryCount);
        
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
  }, [retryCount, generateRandomPosition, containerWidth, containerHeight, clearOccupiedPositions, adjustGridSize]);

  // Enhanced search functionality with better error handling
  useEffect(() => {
    try {
      if (!Array.isArray(birds)) {
        console.error('Birds data is not an array:', birds);
        setFilteredBirds([]);
        return;
      }

      console.log(`Filtering ${birds.length} birds with search term: "${searchTerm}"`);

      if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase().trim();
        
        const filtered = birds.filter(bird => {
          try {
            if (!bird || typeof bird !== 'object') {
              return false;
            }

            const name = (bird.bird_name || '').toLowerCase();
            const species = (bird.bird_species || '').toLowerCase();
            const range = (bird.bird_range || '').toLowerCase();
            const diet = (bird.bird_diet || '').toLowerCase();
            
            return name.includes(searchLower) ||
                   species.includes(searchLower) ||
                   range.includes(searchLower) ||
                   diet.includes(searchLower);
          } catch (filterError) {
            console.warn('Error filtering bird:', bird, filterError);
            return false;
          }
        });
        
        console.log(`Search resulted in ${filtered.length} birds`);
        setFilteredBirds(filtered);
      } else {
        console.log('No search term, showing all birds');
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

  // Debug function to log current state
  const debugState = () => {
    console.log('=== Birds Hook Debug Info ===');
    console.log('Total birds:', birds.length);
    console.log('Filtered birds:', filteredBirds.length);
    console.log('Loading:', loading);
    console.log('Search term:', searchTerm);
    console.log('Error:', error);
    console.log('Container size:', { containerWidth, containerHeight });
    console.log('Birds sample:', birds.slice(0, 3));
    console.log('===========================');
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
    maxRetries: MAX_RETRIES,
    debugState // Export debug function
  };
};

export default { useBirds };