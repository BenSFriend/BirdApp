import axios from 'axios';

// Base URL for the bird API
const BASE_URL = '/birds';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

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

const BirdService = {

    /**
     * Get all birds
     * @returns {Promise} Promise resolving to array of birds
     */
    getAllBirds() {
        return axios.get(`${BASE_URL}/all`)
            .then(response => response.data)
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

export default BirdService;