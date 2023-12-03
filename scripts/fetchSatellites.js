require('dotenv').config();
const axios = require('axios');

async function fetchSatelliteData(searchQuery) {
    try {
        // Construct the API URL with the search query
        const url = `http://tle.ivanstanojevic.me/api/tle?search=${encodeURIComponent(searchQuery)}`;

        // Make a request to the TLE API
        const response = await axios.get(url);

        // Return the fetched data
        return response.data.member; 
    } catch (error) {
        console.error('Error fetching satellite data:', error);
        return [];
    }
}

module.exports = fetchSatelliteData;
