const express = require('express');
const router = express.Router();
const GeomagneticStorm = require('../models/GeomagneticStorm');
const SolarFlare = require('../models/SolarFlare');
const fetchSatelliteData = require('../scripts/fetchSatellites');
const fetchEONETEvents = require('../scripts/fetchEONETEvents');
const fetchElectronFluxAlert = require('../scripts/fetchAlertData'); 
const fetchNOAA3DayForecast = require('../scripts/fetchForecastedData');

// Route to fetch NOAA 3-day forecast
router.get('/forecast', async (req, res) => {
    try {
        const forecastText = await fetchNOAA3DayForecast();
        if (!forecastText) {
            throw new Error('Invalid response format from the SWPC API');
        }
        res.send(forecastText);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching NOAA 3-day forecast:', error);
    // Send a user-friendly error message
        res.status(500).send('Unable to retrieve forecast data at this time');
    }
});

// Route to fetch Electron Flux Alerts
router.get('/electron-flux-alerts', async (req, res) => {
    try {
        const alerts = await fetchElectronFluxAlert();
        if (!Array.isArray(alerts)) {
            throw new Error('Invalid response format from the SWPC API');
        }
        res.json(alerts);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching Electron Flux Alert data:', error);

        // Send a user-friendly error message
        res.status(500).json({ message: 'Unable to retrieve electron flux alerts at this time' });
    }
});



// GET route for fetching solar flare data
router.get('/solar-flares', async (req, res) => {
    try {
        let query = {};

        // Check if beginTime query parameter is provided
        if (req.query.beginTime) {
            query.beginTime = { $gte: new Date(req.query.beginTime) };
        }

        // Check if endTime query parameter is provided
        if (req.query.endTime) {
            if (!query.beginTime) {
                query.beginTime = {};
            }
            query.beginTime.$lte = new Date(req.query.endTime);
        }

        const solarFlares = await SolarFlare.find(query);
        res.json(solarFlares);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// GET all geomagnetic storm data
router.get('/', async (req, res) => {
    try {
        let query = {};

        // Check if start date query parameter is provided
        if (req.query.startDate) {
            query.startTime = { $gte: new Date(req.query.startDate) };
        }

        // Check if end date query parameter is provided
        if (req.query.endDate) {
            if (!query.startTime) {
                query.startTime = {};
            }
            query.startTime.$lte = new Date(req.query.endDate);
        }

        // Check if KP index query parameter is provided
        if (req.query.kpIndex) {
            query['allKpIndex'] = { $elemMatch: { kpIndex: parseFloat(req.query.kpIndex) } };
        }

        const stormData = await GeomagneticStorm.find(query);
        res.json(stormData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route for fetching satellite data
router.get('/satellites', async (req, res) => {
    try {
        const searchQuery = req.query.search || '*'; // Default search query
        const data = await fetchSatelliteData(searchQuery);

        // Check if data was successfully fetched
        if (data.length === 0) {
            return res.status(404).json({ message: "No satellite data found for the given query." });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching satellite data: ${error.message}` });
    }
});

router.get('/eonet-events', async (req, res) => {
    try {
        const events = await fetchEONETEvents(req.query); // Pass query parameters from the request
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: `Error fetching EONET events: ${error.message}` });
    }
});

// GET one geomagnetic storm by ID
router.get('/:id', getGeomagneticStorm, (req, res) => {
    res.json(res.storm);
});

// POST a new geomagnetic storm
router.post('/', async (req, res) => {
    const storm = new GeomagneticStorm({
        gstID: req.body.gstID,
        startTime: req.body.startTime,
        allKpIndex: req.body.allKpIndex,
        linkedEvents: req.body.linkedEvents,
        link: req.body.link
    });

    try {
        const newStorm = await storm.save();
        res.status(201).json(newStorm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH an existing geomagnetic storm
router.patch('/:id', getGeomagneticStorm, async (req, res) => {
    if (req.body.gstID != null) {
        res.storm.gstID = req.body.gstID;
    }
    if (req.body.startTime != null) {
        res.storm.startTime = req.body.startTime;
    }
    if (req.body.allKpIndex != null) {
        res.storm.allKpIndex = req.body.allKpIndex;
    }
    if (req.body.linkedEvents != null) {
        res.storm.linkedEvents = req.body.linkedEvents;
    }
    if (req.body.link != null) {
        res.storm.link = req.body.link;
    }
    try {
        const updatedStorm = await res.storm.save();
        res.json(updatedStorm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an existing geomagnetic storm
router.delete('/:id', getGeomagneticStorm, async (req, res) => {
    try {
        await res.storm.remove();
        res.json({ message: 'Deleted geomagnetic storm' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a specific geomagnetic storm by ID
async function getGeomagneticStorm(req, res, next) {
    let storm;
    try {
        storm = await GeomagneticStorm.findById(req.params.id);
        if (storm == null) {
            return res.status(404).json({ message: 'Cannot find geomagnetic storm' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.storm = storm;
    next();
}

// Export router
module.exports = router;
