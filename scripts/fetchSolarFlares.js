require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const SolarFlare = require('../models/SolarFlare');

mongoose.connect(process.env.MONGODB_URI);


const fetchData = async () => {
    try {
        const response = await axios.get(` https://api.nasa.gov/DONKI/FLR?startDate=2010-01-01&endDate=2024-01-30&api_key=${process.env.NASA_API_KEY}`);
        // console.log("API Response:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching solar flare data: ", error);
        return [];
    }
};

const populateDatabase = async () => {
    const solarFlareData = await fetchData();
   // console.log("Data to be inserted:", solarFlareData); 
    for (let data of solarFlareData) {
        const existingFlare = await SolarFlare.findOne({ flrID: data.flrID });
        if (!existingFlare) {
            const newFlare = new SolarFlare(data);
            await newFlare.save();
        }
    }

    console.log("Database populated with solar flare data");
};

populateDatabase();