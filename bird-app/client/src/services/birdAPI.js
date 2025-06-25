import axios from 'axios';

// Base URL for the bird API - pointing to Spring Boot backend on port 9000
const API_BASE = 'http://localhost:9000';
const BASE_URL = `${API_BASE}/birds`;

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Mock data - fallback for development
const mockBirds = [
    { id: 1, name: 'Blue Jay', species: 'Cyanocitta cristata', image: 'https://as2.ftcdn.net/v2/jpg/06/79/26/25/1000_F_679262593_ay1fXp7QMwI6pq0ZMEuPYDAJDMLSmwIN.webp', habitat: 'Forests', diet: 'Omnivore' },
    { id: 2, name: 'American Robin', species: 'Turdus migratorius', image: 'https://as1.ftcdn.net/v2/jpg/06/27/16/58/1000_F_627165882_fjRbSSdBbTnjzQNN2YbvfsUzW63rYzMX.webp', habitat: 'Gardens', diet: 'Omnivore' },
    { id: 3, name: 'Northern Cardinal', species: 'Cardinalis cardinalis', image: 'https://as2.ftcdn.net/v2/jpg/06/00/23/67/1000_F_600236751_i6v8l9dbPYHODm4PcABQsaB114XLN86J.webp', habitat: 'Woodlands', diet: 'Granivore' },
    { id: 4, name: 'House Sparrow', species: 'Passer domesticus', image: 'https://as2.ftcdn.net/v2/jpg/12/38/56/49/1000_F_1238564900_tvLf3ywXkqI2dDE2MrEa1HGSseiiBp4t.webp', habitat: 'Urban areas', diet: 'Omnivore' },
    { id: 5, name: 'Peregrine Falcon', species: 'Falco peregrinus', image: 'https://as1.ftcdn.net/v2/jpg/13/26/26/60/1000_F_1326266041_ZtgYIdZR1g1XeSsUxLTwfkasMwQND7lw.webp', habitat: 'Cliffs and tall buildings', diet: 'Carnivore' },
    { id: 6, name: 'Bald Eagle', species: 'Haliaeetus leucocephalus', image: 'https://as2.ftcdn.net/v2/jpg/10/93/63/21/1000_F_1093632177_e2xZWbocy0FYl8vtqK7S9Tw82VKD5HDj.webp', habitat: 'Near large bodies of open water', diet: 'Carnivore' },
    // ... rest of bird data
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

// Legacy function for backward compatibility - now uses real API with fallback
export const loadBirdsFromApi = async () => {
    try {
        console.log(`Attempting to fetch from: ${BASE_URL}/all`);
        
        // Try to use real API first
        const response = await axios.get(`${BASE_URL}/all`);
        
        // Check if we got HTML instead of JSON (wrong endpoint)
        if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
            throw new Error('Backend API returned HTML - check if endpoint exists');
        }
        
        console.log('API Response received:', response.data);
        
        let birds;
        
        // Handle different response formats
        if (Array.isArray(response.data)) {
            birds = response.data;
        } else if (response.data.birds && Array.isArray(response.data.birds)) {
            birds = response.data.birds;
        } else if (response.data.data && Array.isArray(response.data.data)) {
            birds = response.data.data;
        } else if (response.data.content && Array.isArray(response.data.content)) {
            // Spring Boot PageImpl format
            birds = response.data.content;
        } else {
            console.warn('API returned unexpected format:', response.data);
            throw new Error('Invalid response format: expected an array of birds');
        }
        
        console.log(`Successfully loaded ${birds.length} birds from API`);
        return birds;
        
    } catch (error) {
        console.error('API call failed:', error.message);
        console.log('Falling back to mock data...');
        
        // Fallback to mock data if API fails
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Using ${mockBirds.length} mock birds`);
                resolve(mockBirds);
            }, 500);
        });
    }
};

// Main API service object
const BirdService = {

    /**
     * Get all birds - updated for port 9000
     * @returns {Promise} Promise resolving to array of birds
     */
    getAllBirds() {
        console.log(`Fetching all birds from: ${BASE_URL}/all`);
        return axios.get(`${BASE_URL}/all`)
            .then(response => {
                console.log('getAllBirds response:', response.data);
                return response.data;
            })
            .catch(handleError);
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
            .then(response => response.data)
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
            .then(response => response.data)
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
            .then(response => response.data)
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
            .then(response => response.data)
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
     * Get birds by diet ID
     * @param {number} dietId - Diet ID to filter by
     * @returns {Promise} Promise resolving to array of birds
     */
    getBirdsByDiet(dietId) {
        if (!dietId || dietId <= 0) {
            return Promise.reject(new Error('Valid diet ID is required'));
        }

        return axios.get(`${BASE_URL}/diet/${dietId}`)
            .then(response => response.data)
            .catch(handleError);
    },

    /**
     * Get birds by range ID
     * @param {number} rangeId - Range ID to filter by
     * @returns {Promise} Promise resolving to array of birds
     */
    getBirdsByRange(rangeId) {
        if (!rangeId || rangeId <= 0) {
            return Promise.reject(new Error('Valid range ID is required'));
        }

        return axios.get(`${BASE_URL}/range/${rangeId}`)
            .then(response => response.data)
            .catch(handleError);
    },

    /**
     * Search birds by name (partial match)
     * @param {string} name - Name to search for
     * @returns {Promise} Promise resolving to array of birds
     */
    searchBirdsByName(name) {
        if (!name || name.trim() === '') {
            return Promise.reject(new Error('Search name is required'));
        }

        return axios.get(`${BASE_URL}/search`, {
            params: { name: name.trim() }
        })
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

        if (!bird.diet_id || bird.diet_id <= 0) {
            errors.push('Valid diet ID is required');
        }

        if (!bird.wingspan || bird.wingspan <= 0) {
            errors.push('Valid wingspan is required');
        }

        if (!bird.img_url || bird.img_url.trim() === '') {
            errors.push('Image URL is required');
        }

        if (!bird.range_id || bird.range_id <= 0) {
            errors.push('Valid range ID is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

// Export both the legacy function and the new API object
export default BirdService;