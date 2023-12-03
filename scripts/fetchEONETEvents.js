const axios = require('axios');
require('dotenv').config();
const EONET_API_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events';

/**
 * Fetch events from EONET API based on query parameters.
 * @param {Object} queryParams - Query parameters for filtering events.
 * @returns {Promise<Object>} - The fetched event data.
 */
async function fetchEONETEvents(queryParams = {}) {
    try {
        // Construct the query string from the queryParams object
        const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');

        // Include the query string in the API request
        const response = await axios.get(`${EONET_API_URL}?${queryString}`);

        // Check if response data is empty or not as expected
        if (!response.data || !response.data.events) {
            throw new Error('No data returned from EONET API');
        }

        return response.data.events;  
    } catch (error) {
         // Enhanced error handling
         if (error.response) {
            // The request was made and the server responded with a status code
            console.error(`EONET API responded with status code ${error.response.status}: ${error.response.data}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('EONET API did not respond:', error.request);
        } else {
            // Something else caused the error
            console.error('Error fetching EONET data:', error.message);
        }
        throw error;
    }
}

module.exports = fetchEONETEvents;
