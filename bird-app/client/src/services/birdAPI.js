import axios from 'axios';

// Base URL for the bird API - pointing to Spring Boot backend on port 9000
const API_BASE = 'http://localhost:9000';
const BASE_URL = `${API_BASE}/birds`;

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Mock data - fallback for development
const mockBirds = [
    { id: 1, bird_name: 'Blue Jay', bird_species: 'Cyanocitta cristata', img_url: 'https://as2.ftcdn.net/v2/jpg/06/79/26/25/1000_F_679262593_ay1fXp7QMwI6pq0ZMEuPYDAJDMLSmwIN.webp', bird_range: 'Forests', bird_diet: 'Omnivore' },
    { id: 2, bird_name: 'American Robin', bird_species: 'Turdus migratorius', img_url: 'https://as1.ftcdn.net/v2/jpg/06/27/16/58/1000_F_627165882_fjRbSSdBbTnjzQNN2YbvfsUzW63rYzMX.webp', bird_range: 'Gardens', bird_diet: 'Omnivore' },
    { id: 3, bird_name: 'Northern Cardinal', bird_species: 'Cardinalis cardinalis', img_url: 'https://as2.ftcdn.net/v2/jpg/06/00/23/67/1000_F_600236751_i6v8l9dbPYHODm4PcABQsaB114XLN86J.webp', bird_range: 'Woodlands', bird_diet: 'Granivore' },
    { id: 4, bird_name: 'House Sparrow', bird_species: 'Passer domesticus', img_url: 'https://as2.ftcdn.net/v2/jpg/12/38/56/49/1000_F_1238564900_tvLf3ywXkqI2dDE2MrEa1HGSseiiBp4t.webp', bird_range: 'Urban areas', bird_diet: 'Omnivore' },
    { id: 5, bird_name: 'Peregrine Falcon', bird_species: 'Falco peregrinus', img_url: 'https://as1.ftcdn.net/v2/jpg/13/26/26/60/1000_F_1326266041_ZtgYIdZR1g1XeSsUxLTwfkasMwQND7lw.webp', bird_range: 'Cliffs and tall buildings', bird_diet: 'Carnivore' },
    { id: 6, bird_name: 'Bald Eagle', bird_species: 'Haliaeetus leucocephalus', img_url: 'https://as2.ftcdn.net/v2/jpg/10/93/63/21/1000_F_1093632177_e2xZWbocy0FYl8vtqK7S9Tw82VKD5HDj.webp', bird_range: 'Near large bodies of open water', bird_diet: 'Carnivore' },
    { id: 7, bird_name: 'Red-tailed Hawk', bird_species: 'Buteo jamaicensis', img_url: 'https://tse2.mm.bing.net/th/id/OIP.yMxDlc93tJP_OLr7jHxkGQHaF7?rs=1&pid=ImgDetMain&o=7&rm=3', bird_range: 'Open fields', bird_diet: 'Carnivore' },
    { id: 8, bird_name: 'Great Blue Heron', bird_species: 'Ardea herodias', img_url: 'https://as2.ftcdn.net/v2/jpg/02/92/35/55/1000_F_292355555_5Q9Q0Q9Q0Q9Q0Q9Q0Q9Q0Q9Q0Q9Q0Q9Q.webp', bird_range: 'Wetlands', bird_diet: 'Carnivore' }
];

// Error handler utility
const handleError = (error) => {
    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        throw new Error(data.message || `HTTP ${status}: ${error.response.statusText}`);
    } else if (error.request) {
        // Request made but no response received
        throw new Error('Network error: Unable to reach the server');
    } else {
        // Something else happened
        throw new Error(error.message || 'An unexpected error occurred');
    }
};

// Normalize bird data to ensure consistent field names
const normalizeBirdData = (bird, index) => {
    // Create a normalized bird object
    const normalizedBird = {
        id: bird.id || bird.birdId || `bird-${Date.now()}-${index}`,
        bird_name: bird.bird_name || bird.name || bird.birdName || `Unknown Bird ${index + 1}`,
        bird_species: bird.bird_species || bird.species || bird.birdSpecies || 'Unknown Species',
        img_url: bird.img_url || bird.imageUrl || bird.image || bird.imgUrl || '',
        bird_range: bird.bird_range || bird.range || bird.habitat || 'Unknown Range',
        bird_diet: bird.bird_diet || bird.diet || 'Unknown Diet',
        wingspan: bird.wingspan || 0,
        diet_id: bird.diet_id || bird.dietId || 1,
        range_id: bird.range_id || bird.rangeId || 1
    };

    console.log(`Normalized bird ${index}:`, normalizedBird);
    return normalizedBird;
};

// Enhanced function for loading birds with better error handling and data normalization
export const loadBirdsFromApi = async () => {
    try {
        console.log(`Attempting to fetch from: ${BASE_URL}/all`);
        
        // Try to use real API first with timeout
        const response = await axios.get(`${BASE_URL}/all`, {
            timeout: 10000, // 10 second timeout
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Raw API Response:', response);
        console.log('Response data:', response.data);
        console.log('Response status:', response.status);
        
        // Check if we got HTML instead of JSON (wrong endpoint)
        if (typeof response.data === 'string') {
            if (response.data.includes('<!doctype html>') || response.data.includes('<html')) {
                throw new Error('Backend API returned HTML - check if endpoint exists');
            }
            // Try to parse if it's a JSON string
            try {
                response.data = JSON.parse(response.data);
            } catch (parseError) {
                throw new Error('Backend returned invalid JSON string');
            }
        }
        
        let birds = [];
        
        // Handle different response formats more robustly
        if (Array.isArray(response.data)) {
            birds = response.data;
        } else if (response.data && typeof response.data === 'object') {
            // Try various nested data structures
            const possibleArrays = [
                response.data.birds,
                response.data.data,
                response.data.content,
                response.data.items,
                response.data.results,
                response.data.birdList
            ];
            
            for (const possibleArray of possibleArrays) {
                if (Array.isArray(possibleArray)) {
                    birds = possibleArray;
                    break;
                }
            }
            
            // If still no array found, check if response.data itself might be a single bird
            if (birds.length === 0 && response.data.bird_name) {
                birds = [response.data];
            }
        }
        
        // Final validation
        if (!Array.isArray(birds)) {
            console.warn('Could not extract bird array from response:', response.data);
            throw new Error('Invalid response format: could not find bird array');
        }
        
        if (birds.length === 0) {
            console.warn('API returned empty bird array');
            throw new Error('No birds data received from API');
        }
        
        // Normalize all bird data to ensure consistent field names
        const normalizedBirds = birds.map((bird, index) => normalizeBirdData(bird, index));
        
        console.log(`Successfully loaded and normalized ${normalizedBirds.length} birds from API`);
        console.log('First bird sample:', normalizedBirds[0]);
        
        return normalizedBirds;
        
    } catch (error) {
        console.error('API call failed:', error);
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        console.log('Falling back to mock data...');
        
        // Fallback to mock data if API fails
        return new Promise((resolve) => {
            setTimeout(() => {
                const normalizedMockBirds = mockBirds.map((bird, index) => normalizeBirdData(bird, index));
                console.log(`Using ${normalizedMockBirds.length} normalized mock birds`);
                resolve(normalizedMockBirds);
            }, 500);
        });
    }
};

// Main API service object
const BirdService = {
    /**
     * Get all birds - updated for port 9000 with better error handling
     * @returns {Promise} Promise resolving to array of birds
     */
    getAllBirds() {
        return loadBirdsFromApi();
    },

    /**
     * Get birds filtered by wingspan range
     * @param {number} lowerLimit - Minimum wingspan
     * @param {number} upperLimit - Maximum wingspan
     * @returns {Promise} Promise resolving to array of birds
     */
    getBirdsByWingspan(lowerLimit, upperLimit) {
        if (lowerLimit < 0 || upperLimit < 0 || lowerLimit > upperLimit) {
            return Promise.reject(new Error('Invalid wingspan range: lower limit must be less than or equal to upper limit'));
        }

        return axios.get(`${BASE_URL}/wingspanLookup`, {
            params: { lowerLimit, upperLimit }
        })
            .then(response => {
                const birds = Array.isArray(response.data) ? response.data : [];
                return birds.map((bird, index) => normalizeBirdData(bird, index));
            })
            .catch(handleError);
    },

    /**
     * Create a new bird (matches your Java controller)
     * @param {Object} bird - Bird object to create
     * @returns {Promise} Promise resolving to created bird
     */
    createBird(bird) {
        // Validate required fields before sending
        if (!bird.bird_name || bird.bird_name.trim() === '') {
            return Promise.reject(new Error('Bird name is required'));
        }

        return axios.post(`${BASE_URL}/add`, bird)
            .then(response => normalizeBirdData(response.data, 0))
            .catch(handleError);
    },

    /**
     * Get a single bird by ID
     * @param {number} id - Bird ID
     * @returns {Promise} Promise resolving to bird object
     */
    getBirdById(id) {
        if (!id || id <= 0) {
            return Promise.reject(new Error('Valid bird ID is required'));
        }

        return axios.get(`${BASE_URL}/${id}`)
            .then(response => normalizeBirdData(response.data, 0))
            .catch(handleError);
    },

    /**
     * Update an existing bird
     * @param {number} id - Bird ID to update
     * @param {Object} bird - Updated bird data
     * @returns {Promise} Promise resolving to updated bird
     */
    updateBird(id, bird) {
        if (!id || id <= 0) {
            return Promise.reject(new Error('Valid bird ID is required'));
        }

        return axios.put(`${BASE_URL}/${id}`, bird)
            .then(response => normalizeBirdData(response.data, 0))
            .catch(handleError);
    },

    /**
     * Delete a bird
     * @param {number} id - Bird ID to delete
     * @returns {Promise} Promise resolving when deletion is complete
     */
    deleteBird(id) {
        if (!id || id <= 0) {
            return Promise.reject(new Error('Valid bird ID is required'));
        }

        return axios.delete(`${BASE_URL}/${id}`)
            .then(response => response.data)
            .catch(handleError);
    },

    /**
     * Validate bird data before submission
     * @param {Object} bird - Bird object to validate
     * @returns {Object} Validation result with isValid and errors
     */
    validateBird(bird) {
        const errors = [];

        if (!bird.bird_name || bird.bird_name.trim() === '') {
            errors.push('Bird name is required');
        }

        if (!bird.img_url || bird.img_url.trim() === '') {
            errors.push('Image URL is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

// Export both the legacy function and the new API object
export default BirdService;