require('dotenv').config();
const axios = require('axios');
const GeomagneticStorm = require('../models/GeomagneticStorm');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const fetchData = async () => {
    try {
        const response = await axios.get(` https://api.nasa.gov/DONKI/GST?startDate=2010-01-01&api_key=${process.env.NASA_API_KEY}`);
        // console.log("API Response:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error fetching GST data: ", error);
        return [];
    }
};

   
   const populateDatabase = async () => {
    const gstData = await fetchData();
//  console.log("Data to be inserted:", gstData); 
    for (let data of gstData) {
        // Check if a storm with the same gstID already exists
        const existingStorm = await GeomagneticStorm.findOne({ gstID: data.gstID });

        if (!existingStorm) {
            const newStorm = new GeomagneticStorm({
                gstID: data.gstID,
                startTime: new Date(data.startTime),
                allKpIndex: data.allKpIndex, 
                linkedEvents: data.linkedEvents, 
                link: data.link
            });

            await newStorm.save();
        }
    }

    console.log("Database populated with GST data");
};

populateDatabase();