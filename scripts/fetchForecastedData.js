const axios = require('axios');
require('dotenv').config();

async function fetchNOAA3DayForecast() {
  const url = 'https://services.swpc.noaa.gov/text/3-day-forecast.txt';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching NOAA 3-day forecast: ${error}`);
    return null; // or handle the error as you see fit
  }
}

// To use the function
fetchNOAA3DayForecast().then(forecastText => {
  if (forecastText) {
    console.log(forecastText);
  } else {
    console.log("Failed to fetch the forecast.");
  }
});

module.exports = fetchNOAA3DayForecast;
